export const categoriaDestaque = "em-destaque";
export const nomeCategoriaDestaque = "Em destaque";

const limiteDestaques = 12;

export function ehDestaque(oracao: { isDestaque?: boolean }): boolean {
  return oracao.isDestaque === true;
}

export function tagsEfetivas(tags: string[], destaque: boolean): string[] {
  if (!destaque || tags.includes(categoriaDestaque)) {
    return tags;
  }

  return [...tags, categoriaDestaque];
}

export function tagsExibidasNoCard(tags: string[], limite: number): string[] {
  if (!tags.includes(categoriaDestaque)) {
    return tags.slice(0, limite);
  }

  const demais = tags.filter((tag) => tag !== categoriaDestaque);

  return [categoriaDestaque, ...demais].slice(0, limite);
}

export function oracoesEmDestaque<
  T extends { isDestaque?: boolean; slug: string },
>(lista: T[]): T[] {
  const selecionadas: T[] = [];
  const slugs = new Set<string>();

  for (const oracao of lista) {
    if (!ehDestaque(oracao) || slugs.has(oracao.slug)) {
      continue;
    }

    slugs.add(oracao.slug);
    selecionadas.push(oracao);

    if (selecionadas.length >= limiteDestaques) {
      break;
    }
  }

  return selecionadas;
}
