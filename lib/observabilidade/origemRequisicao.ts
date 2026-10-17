import { workAsyncStorage } from "next/dist/server/app-render/work-async-storage.external";
import { workUnitAsyncStorage } from "next/dist/server/app-render/work-unit-async-storage.external";
import { descreverOrigem } from "@/lib/observabilidade/consultaFirestore";

// Lê a rota que o Next já colocou no armazenamento da renderização.
// Não chama headers(): essa API tornaria dinâmicas as rotas hoje estáticas.
export function origemDaRequisicao(): string {
  try {
    return descreverOrigem({
      caminho: caminhoDaRequisicao(workUnitAsyncStorage.getStore()),
      rota: rotaDoTrabalho(workAsyncStorage.getStore()),
    });
  } catch {
    return "fora-de-requisicao";
  }
}

function caminhoDaRequisicao(unidade: unknown): string | undefined {
  if (
    !ehRegistro(unidade) ||
    unidade.type !== "request" ||
    !ehRegistro(unidade.url)
  ) {
    return undefined;
  }

  return typeof unidade.url.pathname === "string"
    ? unidade.url.pathname
    : undefined;
}

function rotaDoTrabalho(loja: unknown): string | undefined {
  if (!ehRegistro(loja) || typeof loja.route !== "string") {
    return undefined;
  }

  return loja.route;
}

function ehRegistro(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === "object" && valor !== null;
}
