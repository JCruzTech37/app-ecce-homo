import assert from "node:assert/strict";
import test from "node:test";
import {
  catalogoPublicadoEmCache,
  oracaoPublicadaPorSlug,
  ttlCatalogoPublicadoSegundos,
} from "./catalogoPublicado";

type OracaoDeTeste = {
  slug: string;
  publicado: boolean;
};

const publicada: OracaoDeTeste = { slug: "ave-maria", publicado: true };
const oculta: OracaoDeTeste = { slug: "oracao-oculta", publicado: false };

test("o catálogo revalida depois de 3600 segundos", () => {
  assert.equal(ttlCatalogoPublicadoSegundos, 3600);
});

test("resolve slug publicado e rejeita slug oculto ou inválido", () => {
  const catalogo = [publicada, oculta];

  assert.equal(oracaoPublicadaPorSlug(catalogo, "ave-maria"), publicada);
  assert.equal(oracaoPublicadaPorSlug(catalogo, "oracao-oculta"), null);
  assert.equal(oracaoPublicadaPorSlug(catalogo, "Ave Maria"), null);
  assert.equal(oracaoPublicadaPorSlug(catalogo, "inexistente"), null);
});

test("reutiliza o catálogo até o TTL e consulta de novo depois", async () => {
  let agora = 0;
  const entradas = new Map<string, { body: string; gravadoEm: number }>();
  const globalComCache = globalThis as typeof globalThis & {
    __incrementalCache?: {
      isOnDemandRevalidate: boolean;
      generateSimpleCacheKey: (entrada: string) => Promise<string>;
      get: (
        chave: string,
        contexto: { revalidate?: number },
      ) => Promise<{
        isStale: boolean;
        value: { kind: string; data: { body: string } };
      } | null>;
      set: (chave: string, dado: { data?: { body?: string } }) => Promise<void>;
    };
  };
  const anterior = globalComCache.__incrementalCache;
  globalComCache.__incrementalCache = {
    isOnDemandRevalidate: false,
    async generateSimpleCacheKey(entrada) {
      return entrada;
    },
    async get(chave, contexto) {
      const entrada = entradas.get(chave);
      if (!entrada) {
        return null;
      }

      const revalidate = contexto.revalidate ?? ttlCatalogoPublicadoSegundos;
      const idadeSegundos = (agora - entrada.gravadoEm) / 1000;

      return {
        isStale: idadeSegundos >= revalidate,
        value: {
          kind: "FETCH",
          data: { body: entrada.body },
        },
      };
    },
    async set(chave, dado) {
      const body = dado.data?.body;
      if (typeof body !== "string") {
        throw new Error("corpo de cache ausente");
      }

      entradas.set(chave, { body, gravadoEm: agora });
    },
  };

  let consultas = 0;
  let versao = "primeira";
  const lerCatalogo = catalogoPublicadoEmCache(async () => {
    consultas += 1;
    return versao;
  });

  try {
    assert.equal(await lerCatalogo(), "primeira");
    versao = "segunda";
    assert.equal(await lerCatalogo(), "primeira");
    assert.equal(consultas, 1);

    agora += (ttlCatalogoPublicadoSegundos - 1) * 1000;
    assert.equal(await lerCatalogo(), "primeira");
    assert.equal(consultas, 1);

    agora += 1000;
    assert.equal(await lerCatalogo(), "segunda");
    assert.equal(consultas, 2);
  } finally {
    if (anterior === undefined) {
      delete globalComCache.__incrementalCache;
    } else {
      globalComCache.__incrementalCache = anterior;
    }
  }
});
