import type { RepositorioOracoes } from "@/domain/repositorioOracoes";
import { repositorioOracoesFirestore } from "@/lib/repositorioOracoesFirestore";
import type { Oracao } from "@/types/oracao";

const repositorio: RepositorioOracoes = repositorioOracoesFirestore;

export async function obterOracaoPorSlug(
  slug: string,
): Promise<Oracao | null> {
  return repositorio.obterPorSlug(slug);
}

export async function listarOracoesPublicadas(): Promise<Oracao[]> {
  return repositorio.listarPublicadas();
}
