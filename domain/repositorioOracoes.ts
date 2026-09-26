import type { Oracao } from "@/types/oracao";

export interface RepositorioOracoes {
  listarPublicadas(): Promise<Oracao[]>;
  obterPorSlug(slug: string): Promise<Oracao | null>;
}
