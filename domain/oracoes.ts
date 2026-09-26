import { oracoesEmDestaque, tagsEfetivas } from "@/domain/destaques";
import { oracoesRecentes } from "@/domain/oracoesRecentes";
import type { RepositorioOracoes } from "@/domain/repositorioOracoes";
import { repositorioOracoesFirestore } from "@/lib/repositorioOracoesFirestore";
import type { Oracao } from "@/types/oracao";

const repositorio: RepositorioOracoes = repositorioOracoesFirestore;

function aplicarDestaque(oracao: Oracao): Oracao {
  const destaque = oracao.isDestaque === true;

  return {
    ...oracao,
    isDestaque: destaque,
    tags: tagsEfetivas(oracao.tags, destaque),
  };
}

export async function obterOracaoPorSlug(slug: string): Promise<Oracao | null> {
  const oracao = await repositorio.obterPorSlug(slug);

  return oracao ? aplicarDestaque(oracao) : null;
}

export async function listarOracoesPublicadas(): Promise<Oracao[]> {
  const lista = await repositorio.listarPublicadas();

  return lista.map(aplicarDestaque);
}

export async function listarOracoesEmDestaque(): Promise<Oracao[]> {
  return oracoesEmDestaque(await listarOracoesPublicadas());
}

export async function listarOracoesRecentes(): Promise<Oracao[]> {
  return oracoesRecentes(await listarOracoesPublicadas());
}
