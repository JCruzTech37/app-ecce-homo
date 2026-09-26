import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { obterFirestore } from "../lib/firebase/admin";

const diretorio = path.join(process.cwd(), "data", "prayers");

async function lerOracoes(): Promise<Record<string, unknown>[]> {
  const arquivos = (await readdir(diretorio))
    .filter((nome) => nome.endsWith(".json"))
    .sort();

  const oracoes: Record<string, unknown>[] = [];

  for (const arquivo of arquivos) {
    const conteudo = await readFile(path.join(diretorio, arquivo), "utf8");
    const dados: unknown = JSON.parse(conteudo);

    if (
      typeof dados !== "object" ||
      dados === null ||
      Array.isArray(dados) ||
      typeof (dados as { id?: unknown }).id !== "string" ||
      (dados as { id: string }).id.length === 0
    ) {
      throw new Error(`${arquivo} não possui o id definido no modelo.`);
    }

    oracoes.push(dados as Record<string, unknown>);
  }

  const ids = oracoes.map((oracao) => oracao.id);
  if (new Set(ids).size !== ids.length) {
    throw new Error("Há ids duplicados nos JSONs.");
  }

  return oracoes;
}

function normalizar(valor: unknown): unknown {
  if (Array.isArray(valor)) {
    return valor.map(normalizar);
  }

  if (typeof valor === "object" && valor !== null) {
    return Object.fromEntries(
      Object.keys(valor)
        .sort()
        .map((chave) => [chave, normalizar((valor as Record<string, unknown>)[chave])]),
    );
  }

  return valor;
}

function conteudoEditorial(oracao: Record<string, unknown>): Record<string, unknown> {
  const conteudo = { ...oracao };
  delete conteudo.createdAt;
  delete conteudo.updatedAt;
  return conteudo;
}

function createdAtPreservado(existente: unknown, agora: string): unknown {
  if (typeof existente === "string" && existente.length > 0) {
    return existente;
  }

  if (
    typeof existente === "object" &&
    existente !== null &&
    "toDate" in existente &&
    typeof existente.toDate === "function"
  ) {
    return existente;
  }

  return agora;
}

function mesmoConteudo(
  esperado: Record<string, unknown>,
  recebido: Record<string, unknown> | undefined,
): boolean {
  if (!recebido) {
    return false;
  }

  return (
    JSON.stringify(normalizar(conteudoEditorial(esperado))) ===
    JSON.stringify(normalizar(conteudoEditorial(recebido)))
  );
}

async function main(): Promise<void> {
  const oracoes = await lerOracoes();
  const db = obterFirestore();
  const colecao = db.collection("prayers");
  const antes = await colecao.get();
  const existentes = new Map(antes.docs.map((doc) => [doc.id, doc.data()]));
  const agora = new Date().toISOString();

  console.log("antes", antes.size);

  const gravados: string[] = [];
  const criados: string[] = [];
  const atualizados: string[] = [];

  try {
    for (const oracao of oracoes) {
      const id = oracao.id as string;
      const atual = existentes.get(id);
      const createdAt = atual
        ? createdAtPreservado(atual.createdAt, agora)
        : agora;

      await colecao.doc(id).set({
        ...conteudoEditorial(oracao),
        createdAt,
        updatedAt: agora,
      });

      gravados.push(id);

      if (atual) {
        atualizados.push(id);
      } else {
        criados.push(id);
      }
    }
  } catch (erro) {
    console.log("gravados_antes_da_falha", gravados.join(","));
    throw erro;
  }

  const depois = await colecao.get();
  const porId = new Map(depois.docs.map((doc) => [doc.id, doc.data()]));
  const divergencias = oracoes.filter(
    (oracao) => !mesmoConteudo(oracao, porId.get(oracao.id as string)),
  );

  console.log("importados", gravados.length);
  console.log("criados", criados.length);
  console.log("atualizados", atualizados.length);
  console.log("depois", depois.size);
  console.log("ids", gravados.join(","));
  console.log("divergencias", divergencias.length);
}

main().catch((erro: unknown) => {
  const mensagem = erro instanceof Error ? erro.message : String(erro);
  console.error(mensagem);
  process.exitCode = 1;
});
