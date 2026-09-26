import type { RepositorioOracoes } from "@/domain/repositorioOracoes";
import { obterFirestore } from "@/lib/firebase/admin";
import type { Oracao } from "@/types/oracao";

function ehRegistro(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === "object" && valor !== null && !Array.isArray(valor);
}

function texto(valor: unknown): valor is string {
  return typeof valor === "string";
}

function textoOpcional(
  valor: unknown,
  campo: string,
): string | undefined {
  if (valor === undefined) {
    return undefined;
  }

  if (!texto(valor)) {
    throw new Error(`Campo ${campo} inválido no documento de oração.`);
  }

  return valor;
}

function dataTexto(valor: unknown, campo: string): string {
  if (texto(valor) && valor.length > 0) {
    return valor;
  }

  if (
    typeof valor === "object" &&
    valor !== null &&
    "toDate" in valor &&
    typeof valor.toDate === "function"
  ) {
    const data = valor.toDate();
    if (data instanceof Date && !Number.isNaN(data.getTime())) {
      return data.toISOString();
    }
  }

  throw new Error(`Campo ${campo} inválido no documento de oração.`);
}

function interpretarOracao(valor: unknown): Oracao {
  if (!ehRegistro(valor)) {
    throw new Error("Documento de oração inválido.");
  }

  if (
    !texto(valor.id) ||
    !texto(valor.slug) ||
    !texto(valor.titulo) ||
    !texto(valor.texto) ||
    !texto(valor.imagemVertical) ||
    !texto(valor.textoAlternativo) ||
    !texto(valor.jaculatoria) ||
    typeof valor.publicado !== "boolean" ||
    !Array.isArray(valor.tags) ||
    !valor.tags.every(texto)
  ) {
    throw new Error("Documento de oração inválido.");
  }

  return {
    id: valor.id,
    slug: valor.slug,
    titulo: valor.titulo,
    descricao: textoOpcional(valor.descricao, "descricao"),
    texto: valor.texto,
    imagemVertical: valor.imagemVertical,
    textoAlternativo: valor.textoAlternativo,
    jaculatoria: valor.jaculatoria,
    fraseSanto: textoOpcional(valor.fraseSanto, "fraseSanto"),
    fraseSantoAutor: textoOpcional(valor.fraseSantoAutor, "fraseSantoAutor"),
    tags: valor.tags,
    publicado: valor.publicado,
    createdAt: dataTexto(valor.createdAt, "createdAt"),
    updatedAt: dataTexto(valor.updatedAt, "updatedAt"),
    seoTitle: textoOpcional(valor.seoTitle, "seoTitle"),
    seoDescription: textoOpcional(valor.seoDescription, "seoDescription"),
  };
}

export const repositorioOracoesFirestore: RepositorioOracoes = {
  async listarPublicadas() {
    const consulta = await obterFirestore()
      .collection("prayers")
      .where("publicado", "==", true)
      .get();

    return consulta.docs
      .map((documento) => interpretarOracao(documento.data()))
      .sort((a, b) => a.slug.localeCompare(b.slug));
  },

  async obterPorSlug(slug) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return null;
    }

    const consulta = await obterFirestore()
      .collection("prayers")
      .where("slug", "==", slug)
      .limit(1)
      .get();

    const documento = consulta.docs[0];
    if (!documento) {
      return null;
    }

    return interpretarOracao(documento.data());
  },
};
