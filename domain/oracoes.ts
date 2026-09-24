import { repositorioOracoesJson } from "@/lib/repositorioOracoesJson";
import type { Oracao } from "@/types/oracao";

export async function obterOracaoPorSlug(
  slug: string,
): Promise<Oracao | null> {
  return repositorioOracoesJson.obterPorSlug(slug);
}
