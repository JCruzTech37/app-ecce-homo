"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "@/app/oracoes/oracoes.module.css";
import { BadgeCategoria } from "@/components/BadgeCategoria";
import { hrefOracao } from "@/lib/hrefOracoes";

const cardsPorPagina = 4;

export type OracaoDoCarrossel = {
  slug: string;
  titulo: string;
  descricao?: string;
  imagemVertical: string;
  textoAlternativo: string;
  tags: string[];
};

function caminhoImagemPublica(referencia: string): string {
  if (referencia.startsWith("public/")) {
    return `/${referencia.slice("public/".length)}`;
  }

  return referencia;
}

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
  const totalPaginas = Math.ceil(oracoes.length / cardsPorPagina);
  const paginaVisivel = totalPaginas === 0 ? 0 : pagina % totalPaginas;
  const inicio = paginaVisivel * cardsPorPagina;
  const visiveis = oracoes.slice(inicio, inicio + cardsPorPagina);

  if (visiveis.length === 0) {
    return null;
  }

  return (
    <>
      <div className="row g-4">
        {visiveis.map((oracao) => {
          const destino = hrefOracao(oracao.slug, { busca, ordem, categoria });

          return (
            <div key={oracao.slug} className="col-12 col-sm-6 col-lg-3">
              <article className="card h-100">
                <Link
                  href={destino}
                  className="ratio ratio-4x3 bg-secondary-subtle"
                >
                  <Image
                    src={caminhoImagemPublica(oracao.imagemVertical)}
                    alt={oracao.textoAlternativo}
                    fill
                    className="object-fit-cover"
                    sizes="(min-width: 992px) 25vw, (min-width: 576px) 50vw, 100vw"
                  />
                </Link>
                <div className="card-body d-flex flex-column">
                  <h3 className="h6 card-title">{oracao.titulo}</h3>
                  {oracao.descricao ? (
                    <p className={`card-text small ${styles.descricao}`}>
                      {oracao.descricao}
                    </p>
                  ) : null}
                  <p className="d-flex flex-wrap gap-1 mb-3">
                    {oracao.tags.slice(0, 4).map((tag, indice) => (
                      <BadgeCategoria key={`${tag}-${indice}`} tag={tag} />
                    ))}
                  </p>
                  <Link href={destino} className="mt-auto">
                    Ler oração
                  </Link>
                </div>
              </article>
            </div>
          );
        })}
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
              setPagina((atual) => (atual - 1 + totalPaginas) % totalPaginas);
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
              setPagina((atual) => (atual + 1) % totalPaginas);
            }}
          >
            Próxima
          </button>
        </nav>
      ) : null}
    </>
  );
}
