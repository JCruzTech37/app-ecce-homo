import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import {
  type ArquivoBruto,
  type BancoOracoes,
  criacaoRecusada,
  executarImportacao,
  formatarRelatorio,
  ImportacaoInvalida,
  importarOracoes,
  lerArquivosDeOracao,
  montarDocumentoNovo,
} from "./importar-oracoes";

const agora = "2026-10-17T12:00:00.000Z";

function arquivo(
  nome: string,
  campos: Record<string, unknown> = {},
): ArquivoBruto {
  return {
    arquivo: nome,
    conteudo: JSON.stringify({
      id: "ave-maria",
      slug: "ave-maria",
      titulo: "Ave Maria",
      texto: "TEXTO_SECRETO",
      jaculatoria: "Rogai por nós.",
      tags: ["oracoes-marianas"],
      publicado: true,
      ...campos,
    }),
  };
}

function bancoControlado(
  opcoes: {
    ids?: string[];
    slugs?: [string, string][];
    falhaCriacao?: unknown;
  } = {},
) {
  const ids = new Set(opcoes.ids ?? []);
  const slugs = new Map(opcoes.slugs ?? []);
  const operacoes: string[] = [];
  const criados: { id: string; dados: Record<string, unknown> }[] = [];
  const banco: BancoOracoes = {
    async idsExistentes() {
      operacoes.push("ids");
      return ids;
    },
    async slugsExistentes() {
      operacoes.push("slugs");
      return slugs;
    },
    async criar(id, dados) {
      operacoes.push("criar");
      if (opcoes.falhaCriacao) {
        throw opcoes.falhaCriacao;
      }
      criados.push({ id, dados });
    },
  };

  return { banco, operacoes, criados };
}

test("pasta vazia não inicializa o Firestore", async () => {
  let abriu = false;
  const linhas: string[] = [];
  const resultado = await executarImportacao({
    lerArquivos: async () => [],
    abrirBanco: () => {
      abriu = true;
      throw new Error("Firestore não deveria ser aberto");
    },
    registrar: (linha) => {
      linhas.push(linha);
    },
  });

  assert.equal(abriu, false);
  assert.equal("vazio" in resultado, true);
  assert.match(linhas.join("\n"), /Nenhum arquivo JSON/);
});

test("diretório ausente ou vazio não acessa o Firestore", async () => {
  const ausente = await lerArquivosDeOracao(
    path.join(tmpdir(), `ecce-ausente-${Date.now()}`),
  );
  assert.deepEqual(ausente.arquivos, []);
  assert.match(ausente.avisoVazio ?? "", /não existe/);

  const vazio = await mkdtemp(path.join(tmpdir(), "ecce-vazio-"));

  try {
    const leitura = await lerArquivosDeOracao(vazio);
    assert.deepEqual(leitura.arquivos, []);
    assert.match(leitura.avisoVazio ?? "", /Nenhum arquivo JSON/);
  } finally {
    await rm(vazio, { recursive: true, force: true });
  }
});

test("validação acontece antes do Firestore", async () => {
  const { banco, operacoes } = bancoControlado();

  await assert.rejects(
    () =>
      importarOracoes({
        arquivos: [{ arquivo: "ruim.json", conteudo: "{" }],
        banco,
        agora,
      }),
    (erro: unknown) => {
      assert.ok(erro instanceof ImportacaoInvalida);
      assert.match(erro.message, /JSON inválido/);
      assert.doesNotMatch(erro.message, /TEXTO_SECRETO/);
      return true;
    },
  );
  await assert.rejects(
    () =>
      importarOracoes({
        arquivos: [arquivo("sem-texto.json", { texto: "" })],
        banco,
        agora,
      }),
    /texto é obrigatório/,
  );
  assert.deepEqual(operacoes, []);
});

test("ids duplicados interrompem antes de escrever", async () => {
  const { banco, operacoes } = bancoControlado();

  await assert.rejects(
    () =>
      importarOracoes({
        arquivos: [
          arquivo("a.json", { id: "ave-maria", slug: "ave-maria" }),
          arquivo("b.json", { id: "ave-maria", slug: "outro" }),
        ],
        banco,
        agora,
      }),
    (erro: unknown) => {
      assert.ok(erro instanceof ImportacaoInvalida);
      assert.match(erro.message, /ids duplicados/);
      assert.match(erro.message, /a\.json/);
      assert.match(erro.message, /b\.json/);
      return true;
    },
  );
  assert.deepEqual(operacoes, []);
});

test("insere documento novo e preserva id existente", async () => {
  const { banco, operacoes, criados } = bancoControlado({
    ids: ["pai-nosso"],
  });
  const relatorio = await importarOracoes({
    arquivos: [
      arquivo("ave-maria.json", { id: "ave-maria", slug: "ave-maria" }),
      arquivo("pai-nosso.json", { id: "pai-nosso", slug: "pai-nosso" }),
    ],
    banco,
    agora,
  });

  assert.deepEqual(
    criados.map((item) => item.id),
    ["ave-maria"],
  );
  assert.equal(criados[0]?.dados.createdAt, agora);
  assert.equal(criados[0]?.dados.updatedAt, agora);
  assert.equal(criados[0]?.dados.texto, "TEXTO_SECRETO");
  assert.equal(operacoes.includes("criar"), true);
  assert.equal(operacoes.filter((operacao) => operacao === "criar").length, 1);
  assert.equal(relatorio.inseridos.length, 1);
  assert.equal(relatorio.ignoradosPorId.length, 1);
  assert.equal(relatorio.ignoradosPorId[0]?.id, "pai-nosso");
  assert.match(relatorio.ignoradosPorId[0]?.motivo ?? "", /preservado/);
  assert.equal(
    formatarRelatorio(relatorio).join("\n").includes("TEXTO_SECRETO"),
    false,
  );
});

test("slug existente em outro documento não é inserido", async () => {
  const { banco, criados } = bancoControlado({
    slugs: [["ave-maria", "documento-antigo"]],
  });
  const relatorio = await importarOracoes({
    arquivos: [arquivo("ave-maria.json")],
    banco,
    agora,
  });

  assert.deepEqual(criados, []);
  assert.equal(relatorio.conflitosSlug.length, 1);
  assert.match(relatorio.conflitosSlug[0]?.motivo ?? "", /documento-antigo/);
  assert.equal(relatorio.inseridos.length, 0);
});

test("slug repetido entre arquivos não é inserido", async () => {
  const { banco, operacoes } = bancoControlado();
  const relatorio = await importarOracoes({
    arquivos: [
      arquivo("a.json", { id: "ave-a", slug: "ave-maria" }),
      arquivo("b.json", { id: "ave-b", slug: "ave-maria" }),
      arquivo("credo.json", { id: "credo", slug: "credo" }),
    ],
    banco,
    agora,
  });

  assert.equal(relatorio.conflitosSlug.length, 2);
  assert.deepEqual(
    relatorio.inseridos.map((item) => item.id),
    ["credo"],
  );
  assert.equal(operacoes.includes("ids"), true);
  assert.equal(
    relatorio.conflitosSlug.every((item) => item.id !== "credo"),
    true,
  );
});

test("falha de criação não sobrescreve o documento", async () => {
  const { banco, operacoes, criados } = bancoControlado({
    falhaCriacao: Object.assign(new Error("6 ALREADY_EXISTS"), { code: 6 }),
  });
  const relatorio = await importarOracoes({
    arquivos: [arquivo("ave-maria.json")],
    banco,
    agora,
  });

  assert.equal(
    criacaoRecusada(Object.assign(new Error("já existe"), { code: 6 })),
    true,
  );
  assert.deepEqual(criados, []);
  assert.deepEqual(operacoes, ["ids", "slugs", "criar"]);
  assert.equal(operacoes.includes("set"), false);
  assert.equal(relatorio.inseridos.length, 0);
  assert.equal(relatorio.ignoradosPorId.length, 1);
  assert.match(relatorio.ignoradosPorId[0]?.motivo ?? "", /sem alteração/);
  const linhas = formatarRelatorio(relatorio);
  assert.match(linhas[0] ?? "", /^inseridos 0$/);
  assert.match(linhas[1] ?? "", /^ignorados_por_id 1$/);
  assert.match(linhas[2] ?? "", /^conflitos_slug 0$/);
  assert.match(linhas[3] ?? "", /^erros 0$/);
  assert.equal(linhas.join("\n").includes("TEXTO_SECRETO"), false);
});

test("documento novo recebe datas do script e preserva campo legado", () => {
  const documento = montarDocumentoNovo(
    {
      id: "ave-maria",
      slug: "ave-maria",
      titulo: "Ave Maria",
      texto: "TEXTO_SECRETO",
      jaculatoria: "Rogai por nós.",
      tags: ["oracoes-marianas"],
      publicado: true,
      imagemVertical: "/images/oracoes/ave-maria.webp",
      createdAt: "1999-01-01",
      updatedAt: "1999-01-01",
    },
    agora,
  );

  assert.equal(documento.createdAt, agora);
  assert.equal(documento.updatedAt, agora);
  assert.equal(documento.imagemVertical, "/images/oracoes/ave-maria.webp");
});
