"use client";

import { useState, useSyncExternalStore } from "react";
import carrossel from "@/components/carrosselOracoesRelacionadas.module.css";
import { CardOracao } from "@/components/CardOracao";
import { hrefOracao } from "@/lib/hrefOracoes";

const consultaQuatro = "(min-width: 992px)";
const consultaTres = "(min-width: 768px)";
const consultaDois = "(min-width: 576px)";

function cardsPorPaginaNoCliente(): number {
  if (window.matchMedia(consultaQuatro).matches) {
    return 4;
  }

  if (window.matchMedia(consultaTres).matches) {
    return 3;
  }

  if (window.matchMedia(consultaDois).matches) {
    return 2;
  }

  return 1;
}

function inscreverCardsPorPagina(atualizar: () => void) {
  const consultas = [consultaQuatro, consultaTres, consultaDois].map(
    (consulta) => window.matchMedia(consulta),
  );

  for (const consulta of consultas) {
    consulta.addEventListener("change", atualizar);
  }

  return () => {
    for (const consulta of consultas) {
      consulta.removeEventListener("change", atualizar);
    }
  };
}

function useCardsPorPagina() {
  return useSyncExternalStore(
    inscreverCardsPorPagina,
    cardsPorPaginaNoCliente,
    () => 4,
  );
}

export type OracaoDoCarrossel = {
  slug: string;
  titulo: string;
  descricao?: string;
  tags: string[];
};

export function CarrosselOracoesRelacionadas({
  oracoes,
  busca,
  ordem,
  categoria,
  rotuloNavegacao = "Páginas de orações relacionadas",
}: {
  oracoes: OracaoDoCarrossel[];
  busca?: string;
  ordem?: string;
  categoria?: string;
  rotuloNavegacao?: string;
}) {
  const [pagina, setPagina] = useState(0);
  const [direcao, setDirecao] = useState<"proxima" | "anterior" | null>(null);
  const [ciclo, setCiclo] = useState(0);
  const cardsPorPagina = useCardsPorPagina();
  const totalPaginas = Math.ceil(oracoes.length / cardsPorPagina);
  const paginaVisivel =
    totalPaginas === 0 ? 0 : Math.min(pagina, totalPaginas - 1);
  const inicio = paginaVisivel * cardsPorPagina;
  const visiveis = oracoes.slice(inicio, inicio + cardsPorPagina);

  function mudarPagina(delta: number) {
    setDirecao(delta > 0 ? "proxima" : "anterior");
    setCiclo((atual) => atual + 1);
    setPagina((atual) => {
      const limite = Math.ceil(oracoes.length / cardsPorPagina);
      const atualVisivel = limite === 0 ? 0 : Math.min(atual, limite - 1);

      return (atualVisivel + delta + limite) % limite;
    });
  }

  if (visiveis.length === 0) {
    return null;
  }

  return (
    <>
      <div className={carrossel.troca}>
        <div
          key={ciclo}
          className={`row g-4${direcao ? ` ${carrossel[direcao]}` : ""}`}
        >
          {visiveis.map((oracao) => {
            const destino = hrefOracao(oracao.slug, {
              busca,
              ordem,
              categoria,
            });

            return (
              <div
                key={oracao.slug}
                className="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <CardOracao
                  titulo={oracao.titulo}
                  descricao={oracao.descricao}
                  tags={oracao.tags}
                  href={destino}
                />
              </div>
            );
          })}
        </div>
      </div>
      {totalPaginas > 1 ? (
        <nav
          aria-label={rotuloNavegacao}
          className="d-flex justify-content-center align-items-center gap-3 mt-4"
        >
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={() => {
              mudarPagina(-1);
            }}
          >
            Anterior
          </button>
          <p className="small mb-0" aria-live="polite">
            Página {paginaVisivel + 1} de {totalPaginas}
          </p>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={() => {
              mudarPagina(1);
            }}
          >
            Próxima
          </button>
        </nav>
      ) : null}
    </>
  );
}
