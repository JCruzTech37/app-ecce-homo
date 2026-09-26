const limiteCategoriasMenu = 6;

export function categoriasPorQuantidade(
  lista: { tags: string[] }[],
): { slug: string; quantidade: number }[] {
  const contagem = new Map<string, number>();

  for (const oracao of lista) {
    for (const tag of new Set(oracao.tags)) {
      contagem.set(tag, (contagem.get(tag) ?? 0) + 1);
    }
  }

  return [...contagem.entries()]
    .map(([slug, quantidade]) => ({ slug, quantidade }))
    .sort((a, b) => b.quantidade - a.quantidade);
}

export function categoriasSugeridas(
  tags: string[],
  categorias: { slug: string }[],
): string[] {
  const proprias: string[] = [];

  for (const tag of tags) {
    if (!proprias.includes(tag)) {
      proprias.push(tag);
    }
  }

  if (proprias.length >= limiteCategoriasMenu) {
    return proprias;
  }

  const usadas = new Set(proprias);
  const gerais = categorias
    .map((item) => item.slug)
    .filter((slug) => !usadas.has(slug));

  return [
    ...proprias,
    ...gerais.slice(0, limiteCategoriasMenu - proprias.length),
  ];
}
