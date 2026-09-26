import { categoriasPorQuantidade } from "@/domain/categoriasOracoes";

const limiteRelacionadas = 12;

type OracaoRelacionavel = {
  id: string;
  slug: string;
  tags: string[];
};

function embaralhar<T>(lista: T[], semente: string): T[] {
  const resultado = [...lista];
  let estado = 2166136261;

  for (let indice = 0; indice < semente.length; indice++) {
    estado ^= semente.charCodeAt(indice);
    estado = Math.imul(estado, 16777619);
  }

  estado >>>= 0;

  for (let indice = resultado.length - 1; indice > 0; indice--) {
    estado = (Math.imul(estado, 1664525) + 1013904223) >>> 0;
    const destino = estado % (indice + 1);
    const item = resultado[indice];
    resultado[indice] = resultado[destino];
    resultado[destino] = item;
  }

  return resultado;
}

export function selecionarOracoesRelacionadas<T extends OracaoRelacionavel>(
  atual: OracaoRelacionavel,
  publicadas: T[],
): T[] {
  const selecionadas: T[] = [];
  const slugs = new Set<string>([atual.slug]);
  const ids = new Set<string>([atual.id]);

  function livre(oracao: T): boolean {
    return !slugs.has(oracao.slug) && !ids.has(oracao.id);
  }

  function adicionar(oracao: T) {
    selecionadas.push(oracao);
    slugs.add(oracao.slug);
    ids.add(oracao.id);
  }

  const proprias: string[] = [];

  for (const tag of atual.tags) {
    if (!proprias.includes(tag)) {
      proprias.push(tag);
    }
  }

  let encontrou = true;

  while (selecionadas.length < limiteRelacionadas && encontrou) {
    encontrou = false;

    for (const tag of proprias) {
      if (selecionadas.length >= limiteRelacionadas) {
        break;
      }

      const proxima = publicadas.find(
        (oracao) => oracao.tags.includes(tag) && livre(oracao),
      );

      if (proxima) {
        adicionar(proxima);
        encontrou = true;
      }
    }
  }

  const processadas = new Set(proprias);

  for (const categoria of categoriasPorQuantidade(publicadas)) {
    if (selecionadas.length >= limiteRelacionadas) {
      break;
    }

    if (processadas.has(categoria.slug)) {
      continue;
    }

    processadas.add(categoria.slug);

    for (const oracao of publicadas) {
      if (selecionadas.length >= limiteRelacionadas) {
        break;
      }

      if (oracao.tags.includes(categoria.slug) && livre(oracao)) {
        adicionar(oracao);
      }
    }
  }

  return selecionadas;
}

export function oracoesRelacionadas<T extends OracaoRelacionavel>(
  atual: OracaoRelacionavel,
  publicadas: T[],
): T[] {
  return embaralhar(
    selecionarOracoesRelacionadas(atual, publicadas),
    atual.slug,
  );
}
