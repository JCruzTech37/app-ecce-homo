import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Oracao } from "@/types/oracao";

const slugValido = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function ehRegistro(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === "object" && valor !== null && !Array.isArray(valor);
}

function texto(valor: unknown): valor is string {
  return typeof valor === "string";
}

function caminhoPublico(referencia: string): string {
  if (referencia.startsWith("public/")) {
    return `/${referencia.slice("public/".length)}`;
  }

  return referencia;
}

function interpretarOracao(valor: unknown, slug: string): Oracao | null {
  if (!ehRegistro(valor)) {
    return null;
  }

  if (
    valor.slug !== slug ||
    !texto(valor.titulo) ||
    !texto(valor.texto) ||
    !texto(valor.imagemVertical) ||
    !texto(valor.textoAlternativo) ||
    !texto(valor.jaculatoria)
  ) {
    return null;
  }

  if (valor.descricao !== undefined && !texto(valor.descricao)) {
    return null;
  }

  if (valor.fraseSanto !== undefined && !texto(valor.fraseSanto)) {
    return null;
  }

  if (valor.fraseSantoAutor !== undefined && !texto(valor.fraseSantoAutor)) {
    return null;
  }

  return {
    slug,
    titulo: valor.titulo,
    descricao: texto(valor.descricao) ? valor.descricao : undefined,
    texto: valor.texto,
    imagemVertical: caminhoPublico(valor.imagemVertical),
    textoAlternativo: valor.textoAlternativo,
    jaculatoria: valor.jaculatoria,
    fraseSanto: texto(valor.fraseSanto) ? valor.fraseSanto : undefined,
    fraseSantoAutor: texto(valor.fraseSantoAutor)
      ? valor.fraseSantoAutor
      : undefined,
  };
}

export const repositorioOracoesJson = {
  async obterPorSlug(slug: string): Promise<Oracao | null> {
    if (!slugValido.test(slug)) {
      return null;
    }

    const arquivo = path.join(process.cwd(), "data", "prayers", `${slug}.json`);

    try {
      const conteudo = await readFile(arquivo, "utf8");
      return interpretarOracao(JSON.parse(conteudo) as unknown, slug);
    } catch {
      return null;
    }
  },
};
