import { unstable_cache } from "next/cache";

export const ttlCatalogoPublicadoSegundos = 3600;
export const chaveCatalogoPublicado = "oracoes-publicadas";

const slugDeOracao = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function ehSlugDeOracao(slug: string): boolean {
  return slugDeOracao.test(slug);
}

// cacheComponents permanece desligado. No Next.js 16.3.6, o cache
// compartilhado de uma consulta que não usa fetch é unstable_cache.
export function catalogoPublicadoEmCache<T>(
  carregar: () => Promise<T>,
): () => Promise<T> {
  return unstable_cache(carregar, [chaveCatalogoPublicado], {
    revalidate: ttlCatalogoPublicadoSegundos,
  });
}

export function oracaoPublicadaPorSlug<
  T extends { slug: string; publicado: boolean },
>(catalogo: readonly T[], slug: string): T | null {
  if (!ehSlugDeOracao(slug)) {
    return null;
  }

  return (
    catalogo.find(
      (oracao) => oracao.slug === slug && oracao.publicado === true,
    ) ?? null
  );
}
