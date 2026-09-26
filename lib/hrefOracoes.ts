export function hrefOracoes(opcoes: {
  busca?: string;
  ordem?: string;
  categoria?: string;
  pagina?: number;
}): string {
  const params = new URLSearchParams();
  const busca = opcoes.busca?.trim() ?? "";

  if (busca) {
    params.set("busca", busca);
  }

  if (opcoes.categoria) {
    params.set("categoria", opcoes.categoria);
  }

  if (opcoes.ordem && opcoes.ordem !== "recentes") {
    params.set("ordem", opcoes.ordem);
  }

  if (opcoes.pagina && opcoes.pagina > 1) {
    params.set("pagina", String(opcoes.pagina));
  }

  const consulta = params.toString();
  return consulta ? `/oracoes?${consulta}` : "/oracoes";
}

export function hrefOracao(
  slug: string,
  opcoes: {
    busca?: string;
    ordem?: string;
    categoria?: string;
  } = {},
): string {
  const listagem = hrefOracoes(opcoes);
  const consulta = listagem.startsWith("/oracoes?")
    ? listagem.slice("/oracoes".length)
    : "";

  return `/oracoes/${slug}${consulta}`;
}
