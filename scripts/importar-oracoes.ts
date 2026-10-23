import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { obterFirestore } from "../lib/firebase/admin";
import { validarReferencia } from "../lib/referenciaOracao";
import { conteudoEditorial } from "./conteudoOracao";

const diretorioPadrao = path.join(process.cwd(), "data", "prayers");
const slugValido = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const camposTextoOpcionais = [
  "descricao",
  "fraseSanto",
  "fraseSantoAutor",
  "seoTitle",
  "seoDescription",
] as const;
const tamanhoConsultaSlug = 30;
const tamanhoConsultaId = 100;

export class ImportacaoInvalida extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = "ImportacaoInvalida";
  }
}

export type ArquivoBruto = {
  arquivo: string;
  conteudo: string;
};

export type OracaoPronta = {
  arquivo: string;
  id: string;
  slug: string;
  dados: Record<string, unknown>;
};

export type ItemRelatorio = {
  arquivo: string;
  id: string;
  motivo?: string;
};

export type RelatorioImportacao = {
  inseridos: ItemRelatorio[];
  ignoradosPorId: ItemRelatorio[];
  conflitosSlug: ItemRelatorio[];
  erros: ItemRelatorio[];
};

export type BancoOracoes = {
  idsExistentes(ids: string[]): Promise<ReadonlySet<string>>;
  slugsExistentes(slugs: string[]): Promise<ReadonlyMap<string, string>>;
  criar(id: string, dados: Record<string, unknown>): Promise<void>;
};

type LeituraDeArquivos = {
  avisoVazio: string | null;
  arquivos: ArquivoBruto[];
};

function ehRegistro(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === "object" && valor !== null && !Array.isArray(valor);
}

function textoPreenchido(valor: unknown): valor is string {
  return typeof valor === "string" && valor.trim().length > 0;
}

export function validarOracaoImportada(valor: unknown): string[] {
  if (!ehRegistro(valor)) {
    return ["o arquivo deve conter um objeto JSON"];
  }

  const erros: string[] = [];

  if (!textoPreenchido(valor.id)) {
    erros.push("id é obrigatório");
  } else if (valor.id.includes("/") || valor.id === "." || valor.id === "..") {
    erros.push("id não pode ser usado como identificador de documento");
  }

  if (!textoPreenchido(valor.slug) || !slugValido.test(valor.slug)) {
    erros.push("slug deve conter apenas letras minúsculas, números e hífens");
  }

  if (!textoPreenchido(valor.titulo)) {
    erros.push("titulo é obrigatório");
  }

  if (!textoPreenchido(valor.texto)) {
    erros.push("texto é obrigatório");
  }

  if (!textoPreenchido(valor.jaculatoria)) {
    erros.push("jaculatoria é obrigatória");
  }

  if (typeof valor.publicado !== "boolean") {
    erros.push("publicado deve ser booleano");
  }

  if (
    !Array.isArray(valor.tags) ||
    !valor.tags.every((tag) => textoPreenchido(tag))
  ) {
    erros.push("tags deve ser uma lista de identificadores");
  }

  for (const campo of camposTextoOpcionais) {
    if (valor[campo] !== undefined && typeof valor[campo] !== "string") {
      erros.push(`${campo} deve ser texto`);
    }
  }

  erros.push(...validarReferencia(valor.referencia));

  if (
    valor.fraseSanto === undefined &&
    valor.fraseSantoAutor !== undefined &&
    valor.fraseSantoAutor !== ""
  ) {
    erros.push("fraseSantoAutor exige fraseSanto");
  }

  if (
    valor.is_destaque !== undefined &&
    typeof valor.is_destaque !== "boolean"
  ) {
    erros.push("is_destaque deve ser booleano");
  }

  return erros;
}

export function interpretarArquivo(
  arquivo: string,
  conteudo: string,
): OracaoPronta {
  let bruto: unknown;

  try {
    bruto = JSON.parse(conteudo);
  } catch {
    throw new ImportacaoInvalida(`${arquivo}: JSON inválido`);
  }

  const erros = validarOracaoImportada(bruto);

  if (erros.length > 0 || !ehRegistro(bruto)) {
    throw new ImportacaoInvalida(`${arquivo}: ${erros.join("; ")}`);
  }

  return {
    arquivo,
    id: bruto.id as string,
    slug: bruto.slug as string,
    dados: bruto,
  };
}

function prepararArquivos(arquivos: ArquivoBruto[]): {
  candidatos: OracaoPronta[];
  conflitosSlug: ItemRelatorio[];
} {
  const erros: string[] = [];
  const prontas: OracaoPronta[] = [];

  for (const arquivo of arquivos) {
    try {
      prontas.push(interpretarArquivo(arquivo.arquivo, arquivo.conteudo));
    } catch (erro) {
      erros.push(erro instanceof Error ? erro.message : String(erro));
    }
  }

  if (erros.length > 0) {
    throw new ImportacaoInvalida(
      `Os arquivos não passaram na validação. Nada foi importado.\n${erros.join("\n")}`,
    );
  }

  const idsRepetidos = agruparRepetidos(prontas, "id");

  if (idsRepetidos.size > 0) {
    const linhas = [...idsRepetidos].map(
      ([id, grupo]) =>
        `${id} em ${grupo.map((item) => item.arquivo).join(", ")}`,
    );
    throw new ImportacaoInvalida(
      `Há ids duplicados nos JSON. Nada foi importado.\n${linhas.join("\n")}`,
    );
  }

  const conflitosSlug: ItemRelatorio[] = [];
  const bloqueados = new Set<string>();

  for (const [slug, grupo] of agruparRepetidos(prontas, "slug")) {
    const nomes = grupo.map((item) => item.arquivo).join(", ");

    for (const item of grupo) {
      bloqueados.add(item.arquivo);
      conflitosSlug.push({
        arquivo: item.arquivo,
        id: item.id,
        motivo: `slug ${slug} repetido entre ${nomes}`,
      });
    }
  }

  return {
    candidatos: prontas.filter((item) => !bloqueados.has(item.arquivo)),
    conflitosSlug,
  };
}

function agruparRepetidos(
  oracoes: OracaoPronta[],
  campo: "id" | "slug",
): Map<string, OracaoPronta[]> {
  const grupos = new Map<string, OracaoPronta[]>();

  for (const oracao of oracoes) {
    const chave = oracao[campo];
    const grupo = grupos.get(chave) ?? [];
    grupo.push(oracao);
    grupos.set(chave, grupo);
  }

  return new Map([...grupos].filter(([, grupo]) => grupo.length > 1));
}

export function montarDocumentoNovo(
  dados: Record<string, unknown>,
  agora: string,
): Record<string, unknown> {
  return {
    ...conteudoEditorial(dados),
    createdAt: agora,
    updatedAt: agora,
  };
}

export function criacaoRecusada(erro: unknown): boolean {
  if (!ehRegistro(erro)) {
    return false;
  }

  return (
    erro.code === 6 ||
    erro.code === "already-exists" ||
    erro.code === "ALREADY_EXISTS"
  );
}

export function formatarRelatorio(relatorio: RelatorioImportacao): string[] {
  const linhas = [
    `inseridos ${relatorio.inseridos.length}`,
    `ignorados_por_id ${relatorio.ignoradosPorId.length}`,
    `conflitos_slug ${relatorio.conflitosSlug.length}`,
    `erros ${relatorio.erros.length}`,
  ];

  for (const item of relatorio.inseridos) {
    linhas.push(`inserido ${item.id} (${item.arquivo})`);
  }

  for (const item of relatorio.ignoradosPorId) {
    linhas.push(`ignorado ${item.id} (${item.arquivo}): ${item.motivo}`);
  }

  for (const item of relatorio.conflitosSlug) {
    linhas.push(`conflito_slug ${item.id} (${item.arquivo}): ${item.motivo}`);
  }

  for (const item of relatorio.erros) {
    linhas.push(`erro ${item.id} (${item.arquivo}): ${item.motivo}`);
  }

  return linhas;
}

export async function importarOracoes(opcoes: {
  arquivos: ArquivoBruto[];
  banco?: BancoOracoes;
  abrirBanco?: () => BancoOracoes;
  agora?: string;
}): Promise<RelatorioImportacao> {
  const preparados = prepararArquivos(opcoes.arquivos);
  const relatorio: RelatorioImportacao = {
    inseridos: [],
    ignoradosPorId: [],
    conflitosSlug: preparados.conflitosSlug,
    erros: [],
  };

  if (preparados.candidatos.length === 0) {
    return relatorio;
  }

  const banco = opcoes.banco ?? opcoes.abrirBanco?.();

  if (!banco) {
    throw new Error("A importação não recebeu acesso ao Firestore.");
  }

  const agora = opcoes.agora ?? new Date().toISOString();
  const idsExistentes = await banco.idsExistentes(
    preparados.candidatos.map((item) => item.id),
  );
  const semId = preparados.candidatos.filter((item) => {
    if (!idsExistentes.has(item.id)) {
      return true;
    }

    relatorio.ignoradosPorId.push({
      arquivo: item.arquivo,
      id: item.id,
      motivo: "o id já existe e foi preservado",
    });
    return false;
  });
  const slugsExistentes =
    semId.length === 0
      ? new Map<string, string>()
      : await banco.slugsExistentes(semId.map((item) => item.slug));
  const paraCriar = semId.filter((item) => {
    const outroId = slugsExistentes.get(item.slug);

    if (outroId === undefined) {
      return true;
    }

    if (outroId === item.id) {
      relatorio.ignoradosPorId.push({
        arquivo: item.arquivo,
        id: item.id,
        motivo: "o id já existe e foi preservado",
      });
      return false;
    }

    relatorio.conflitosSlug.push({
      arquivo: item.arquivo,
      id: item.id,
      motivo: `slug ${item.slug} já existe no documento ${outroId}`,
    });
    return false;
  });

  for (const item of paraCriar) {
    try {
      await banco.criar(item.id, montarDocumentoNovo(item.dados, agora));
      relatorio.inseridos.push({ arquivo: item.arquivo, id: item.id });
    } catch (erro) {
      if (criacaoRecusada(erro)) {
        relatorio.ignoradosPorId.push({
          arquivo: item.arquivo,
          id: item.id,
          motivo: "o id já existe e a criação foi recusada, sem alteração",
        });
        continue;
      }

      relatorio.erros.push({
        arquivo: item.arquivo,
        id: item.id,
        motivo: mensagemCurta(erro),
      });
    }
  }

  return relatorio;
}

export async function lerArquivosDeOracao(
  diretorio: string,
): Promise<LeituraDeArquivos> {
  let nomes: string[];

  try {
    nomes = await readdir(diretorio);
  } catch (erro) {
    if (ehAusente(erro)) {
      return {
        avisoVazio: `A pasta ${caminhoLegivel(diretorio)} não existe. Nada foi importado.`,
        arquivos: [],
      };
    }

    throw erro;
  }

  const jsons = nomes.filter((nome) => nome.endsWith(".json")).sort();

  if (jsons.length === 0) {
    return {
      avisoVazio: `Nenhum arquivo JSON em ${caminhoLegivel(diretorio)}. Nada foi importado.`,
      arquivos: [],
    };
  }

  const arquivos: ArquivoBruto[] = [];

  for (const nome of jsons) {
    arquivos.push({
      arquivo: nome,
      conteudo: await readFile(path.join(diretorio, nome), "utf8"),
    });
  }

  return { avisoVazio: null, arquivos };
}

export async function executarImportacao(
  opcoes: {
    diretorio?: string;
    lerArquivos?: () => Promise<ArquivoBruto[]>;
    banco?: BancoOracoes;
    abrirBanco?: () => BancoOracoes;
    agora?: string;
    registrar?: (linha: string) => void;
  } = {},
): Promise<{ vazio: true } | RelatorioImportacao> {
  const registrar = opcoes.registrar ?? ((linha: string) => console.log(linha));
  const leitura = opcoes.lerArquivos
    ? {
        avisoVazio: "Nenhum arquivo JSON em data/prayers. Nada foi importado.",
        arquivos: await opcoes.lerArquivos(),
      }
    : await lerArquivosDeOracao(opcoes.diretorio ?? diretorioPadrao);

  if (leitura.arquivos.length === 0) {
    registrar(
      leitura.avisoVazio ??
        "Nenhum arquivo JSON em data/prayers. Nada foi importado.",
    );
    return { vazio: true };
  }

  const relatorio = await importarOracoes({
    arquivos: leitura.arquivos,
    banco: opcoes.banco,
    abrirBanco: opcoes.abrirBanco ?? criarBanco,
    agora: opcoes.agora,
  });

  for (const linha of formatarRelatorio(relatorio)) {
    registrar(linha);
  }

  return relatorio;
}

function criarBanco(): BancoOracoes {
  const db = obterFirestore();
  const colecao = db.collection("prayers");

  return {
    async idsExistentes(ids) {
      const encontrados = new Set<string>();

      for (const lote of fatiar(ids, tamanhoConsultaId)) {
        const snaps = await db.getAll(...lote.map((id) => colecao.doc(id)));

        for (const snap of snaps) {
          if (snap.exists) {
            encontrados.add(snap.id);
          }
        }
      }

      return encontrados;
    },

    async slugsExistentes(slugs) {
      const mapa = new Map<string, string>();

      for (const lote of fatiar(slugs, tamanhoConsultaSlug)) {
        const consulta = await colecao
          .where("slug", "in", lote)
          .select("slug")
          .get();

        for (const documento of consulta.docs) {
          const slug = documento.get("slug");

          if (typeof slug === "string") {
            mapa.set(slug, documento.id);
          }
        }
      }

      return mapa;
    },

    async criar(id, dados) {
      await colecao.doc(id).create(dados);
    },
  };
}

function fatiar<T>(itens: T[], tamanho: number): T[][] {
  const lotes: T[][] = [];

  for (let indice = 0; indice < itens.length; indice += tamanho) {
    lotes.push(itens.slice(indice, indice + tamanho));
  }

  return lotes;
}

function caminhoLegivel(diretorio: string): string {
  const relativo = path.relative(process.cwd(), diretorio);
  return relativo && !relativo.startsWith("..") ? relativo : diretorio;
}

function ehAusente(erro: unknown): boolean {
  return ehRegistro(erro) && erro.code === "ENOENT";
}

function mensagemCurta(erro: unknown): string {
  const texto = erro instanceof Error ? erro.message : String(erro);
  return texto.replace(/[\r\n]+/g, " ").slice(0, 200);
}

function chamadoDiretamente(): boolean {
  const entrada = process.argv[1];

  if (!entrada) {
    return false;
  }

  const base = path.basename(entrada);
  return base === "importar-oracoes.ts" || base === "importar-oracoes.js";
}

if (chamadoDiretamente()) {
  executarImportacao()
    .then((resultado) => {
      if ("erros" in resultado && resultado.erros.length > 0) {
        process.exitCode = 1;
      }
    })
    .catch((erro: unknown) => {
      const mensagem = erro instanceof Error ? erro.message : String(erro);
      console.error(mensagem);
      process.exitCode = 1;
    });
}
