export function conteudoEditorial(
  oracao: Record<string, unknown>,
): Record<string, unknown> {
  const conteudo = { ...oracao };
  delete conteudo.createdAt;
  delete conteudo.updatedAt;
  return conteudo;
}
