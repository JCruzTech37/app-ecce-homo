export const consultaListarPublicadas = "listar-publicadas";
export const consultaObterPorSlug = "obter-por-slug";

const limiteMensagem = 300;

export type AmbienteExecucao =
  "development" | "production" | "test" | "indefinido";

export type ResultadoConsulta = "sucesso" | "erro";

export type MedicaoConsulta = {
  documentos: number | null;
};

export type EventoConsultaFirestore = {
  evento: "firestore";
  operacao: string;
  origem: string;
  ambiente: AmbienteExecucao;
  resultado: ResultadoConsulta;
  documentos: number | null;
  duracaoMs: number;
  erro?: {
    nome: string;
    mensagem: string;
  };
};

export type DependenciasConsulta = {
  agora?: () => number;
  origem?: () => string;
  ambiente?: () => AmbienteExecucao;
  registrar?: (evento: EventoConsultaFirestore) => void;
};

export function ambienteDeExecucao(
  valor: string | undefined = process.env.NODE_ENV,
): AmbienteExecucao {
  if (valor === "development" || valor === "production" || valor === "test") {
    return valor;
  }

  return "indefinido";
}

export function descreverOrigem(origem: {
  caminho?: string;
  rota?: string;
}): string {
  return (
    sanitizarOrigem(origem.caminho) ??
    sanitizarOrigem(origem.rota) ??
    "fora-de-requisicao"
  );
}

export async function executarConsultaFirestore<T>(
  operacao: string,
  executar: (medicao: MedicaoConsulta) => Promise<T>,
  dependencias: DependenciasConsulta = {},
): Promise<T> {
  const medicao: MedicaoConsulta = { documentos: null };
  const agora = dependencias.agora ?? (() => performance.now());
  const inicio = agora();
  const origem = resolverOrigem(dependencias);
  const ambiente = resolverAmbiente(dependencias);

  try {
    const valor = await executar(medicao);
    emitir(
      {
        evento: "firestore",
        operacao,
        origem,
        ambiente,
        resultado: "sucesso",
        documentos: medicao.documentos,
        duracaoMs: duracao(agora() - inicio),
      },
      dependencias.registrar,
    );
    return valor;
  } catch (erro) {
    emitir(
      {
        evento: "firestore",
        operacao,
        origem,
        ambiente,
        resultado: "erro",
        documentos: medicao.documentos,
        duracaoMs: duracao(agora() - inicio),
        erro: descreverErro(erro),
      },
      dependencias.registrar,
    );
    throw erro;
  }
}

function resolverOrigem(dependencias: DependenciasConsulta): string {
  try {
    return (
      sanitizarOrigem(dependencias.origem?.() ?? "fora-de-requisicao") ??
      "fora-de-requisicao"
    );
  } catch {
    return "fora-de-requisicao";
  }
}

function resolverAmbiente(
  dependencias: DependenciasConsulta,
): AmbienteExecucao {
  try {
    return dependencias.ambiente?.() ?? ambienteDeExecucao();
  } catch {
    return "indefinido";
  }
}

function duracao(intervalo: number): number {
  if (!Number.isFinite(intervalo) || intervalo < 0) {
    return 0;
  }

  return Math.round(intervalo);
}

function descreverErro(erro: unknown): { nome: string; mensagem: string } {
  if (erro instanceof Error) {
    return {
      nome: erro.name || "Error",
      mensagem: limitarMensagem(erro.message),
    };
  }

  return {
    nome: "Error",
    mensagem: limitarMensagem(String(erro)),
  };
}

function emitir(
  evento: EventoConsultaFirestore,
  registrar: DependenciasConsulta["registrar"],
): void {
  try {
    if (registrar) {
      registrar(evento);
      return;
    }

    const linha = JSON.stringify(evento);

    if (evento.resultado === "erro") {
      console.error(linha);
      return;
    }

    console.info(linha);
  } catch {
    // O registro não pode alterar o resultado da consulta.
  }
}

function sanitizarOrigem(valor: string | undefined): string | undefined {
  if (!valor) {
    return undefined;
  }

  const semConsulta = valor.split("?")[0]?.split("#")[0] ?? "";
  const limpa = semConsulta.replace(/[\u0000-\u001F\u007F]/g, "").trim();

  if (!limpa) {
    return undefined;
  }

  return limpa.slice(0, 200);
}

function limitarMensagem(texto: string): string {
  return texto.replace(/[\r\n]+/g, " ").slice(0, limiteMensagem);
}
