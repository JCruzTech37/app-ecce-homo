const limiteRecentes = 12;

export function oracoesRecentes<
  T extends { createdAt: string; slug: string; publicado: boolean },
>(lista: T[]): T[] {
  const unicas: T[] = [];
  const slugs = new Set<string>();

  for (const oracao of lista) {
    if (oracao.publicado !== true || slugs.has(oracao.slug)) {
      continue;
    }

    slugs.add(oracao.slug);
    unicas.push(oracao);
  }

  return unicas
    .sort((a, b) => {
      const datas = b.createdAt.localeCompare(a.createdAt);

      if (datas !== 0) {
        return datas;
      }

      return a.slug.localeCompare(b.slug);
    })
    .slice(0, limiteRecentes);
}
