import type { ReferenciaOracao } from "@/types/oracao";

const nomeDeIcone = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function ehRegistro(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === "object" && valor !== null && !Array.isArray(valor);
}

function textoOuAusente(valor: unknown, campo: string): string | undefined {
  if (valor === undefined) {
    return undefined;
  }

  if (typeof valor !== "string") {
    throw new Error(
      `Campo referencia.${campo} inválido no documento de oração.`,
    );
  }

  return valor;
}

function linkHttp(valor: string): boolean {
  try {
    const url = new URL(valor);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function interpretarReferencia(
  valor: unknown,
): ReferenciaOracao | undefined {
  if (valor === undefined) {
    return undefined;
  }

  if (!ehRegistro(valor)) {
    throw new Error("Campo referencia inválido no documento de oração.");
  }

  const icone = textoOuAusente(valor.icone, "icone");
  const nome = textoOuAusente(valor.nome, "nome")?.trim() ?? "";
  const link = textoOuAusente(valor.link, "link")?.trim() ?? "";

  if (!nome || !linkHttp(link)) {
    return undefined;
  }

  const referencia: ReferenciaOracao = { nome, link };
  const iconeLimpo = icone?.trim() ?? "";

  if (nomeDeIcone.test(iconeLimpo)) {
    referencia.icone = iconeLimpo;
  }

  return referencia;
}

export function validarReferencia(valor: unknown): string[] {
  if (valor === undefined) {
    return [];
  }

  if (!ehRegistro(valor)) {
    return ["referencia deve ser um objeto"];
  }

  const erros: string[] = [];

  for (const campo of ["icone", "nome", "link"] as const) {
    if (valor[campo] !== undefined && typeof valor[campo] !== "string") {
      erros.push(`referencia.${campo} deve ser texto`);
    }
  }

  return erros;
}
