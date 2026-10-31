import path from "node:path";
import { obterFirestore } from "../lib/firebase/admin";

export type DocumentoDestaque = {
  titulo: unknown;
};

export type LeitorDestaques = {
  listar(): Promise<DocumentoDestaque[]>;
};

export function selecionarTitulos(
  documentos: readonly DocumentoDestaque[],
): string[] {
  const titulos: string[] = [];

  for (const documento of documentos) {
    if (tituloLegivel(documento.titulo)) {
      titulos.push(documento.titulo);
    }
  }

  titulos.sort((esquerda, direita) => esquerda.localeCompare(direita, "pt"));
  return titulos;
}

export function formatarDestaques(titulos: readonly string[]): string[] {
  return [...titulos, `total ${titulos.length}`];
}

export async function executarConsultaDestaques(
  opcoes: {
    leitor?: LeitorDestaques;
    abrirLeitor?: () => LeitorDestaques;
    registrar?: (linha: string) => void;
  } = {},
): Promise<string[]> {
  const registrar = opcoes.registrar ?? ((linha: string) => console.log(linha));
  const leitor = opcoes.leitor ?? (opcoes.abrirLeitor ?? criarLeitor)();
  const linhas = formatarDestaques(selecionarTitulos(await leitor.listar()));

  for (const linha of linhas) {
    registrar(linha);
  }

  return linhas;
}

function tituloLegivel(valor: unknown): valor is string {
  return typeof valor === "string" && valor.trim().length > 0;
}

function criarLeitor(): LeitorDestaques {
  const colecao = obterFirestore().collection("prayers");

  return {
    async listar() {
      const consulta = await colecao
        .where("is_destaque", "==", true)
        .select("titulo")
        .get();

      return consulta.docs.map((documento) => ({
        titulo: documento.get("titulo") as unknown,
      }));
    },
  };
}

function chamadoDiretamente(): boolean {
  const entrada = process.argv[1];

  if (!entrada) {
    return false;
  }

  const base = path.basename(entrada);
  return base === "isdestaque-oracoes.ts" || base === "isdestaque-oracoes.js";
}

if (chamadoDiretamente()) {
  executarConsultaDestaques().catch((erro: unknown) => {
    const mensagem = erro instanceof Error ? erro.message : String(erro);
    console.error(mensagem);
    process.exitCode = 1;
  });
}
