"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { FormularioBuscaOracao } from "@/components/FormularioBuscaOracao";
import { categoriaDestaque, nomeCategoriaDestaque } from "@/domain/destaques";
import { hrefOracoes } from "@/lib/hrefOracoes";

const limiteCategorias = 20;
const idGrade = "grade-oracoes";

export function PainelFiltrosOracoes({
  busca,
  ordem,
  categoria,
  total,
  categorias,
  quantidadeDestaques,
  quantidadeResultados,
}: {
  busca: string;
  ordem: string;
  categoria: string;
  total: number;
  categorias: { slug: string; quantidade: number }[];
  quantidadeDestaques: number;
  quantidadeResultados: number;
}) {
  const painelRef = useRef<HTMLDivElement>(null);
  const listaRef = useRef<HTMLUListElement>(null);
  const [expandida, setExpandida] = useState(false);
  const [alturaLista, setAlturaLista] = useState<number | null>(null);
  const visiveis = expandida
    ? categorias
    : categorias.slice(0, limiteCategorias);
  const mostrarVerMais = !expandida && categorias.length > limiteCategorias;

  useLayoutEffect(() => {
    const painel = painelRef.current;
    const lista = listaRef.current;
    const grade = document.getElementById(idGrade);

    if (!painel || !lista || !grade) {
      setAlturaLista(null);
      return;
    }

    const medir = () => {
      const alturaGrade = grade.getBoundingClientRect().height;
      const alturaPainel = painel.getBoundingClientRect().height;
      const alturaAtual = lista.getBoundingClientRect().height;

      if (alturaGrade <= 0) {
        setAlturaLista(null);
        return;
      }

      const restante = alturaPainel - alturaAtual;
      const maxima = Math.max(0, Math.round(alturaGrade - restante));
      setAlturaLista((atual) =>
        atual !== null && Math.abs(atual - maxima) < 1 ? atual : maxima,
      );
    };

    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(grade);

    return () => observador.disconnect();
  }, [expandida, quantidadeResultados, categorias.length, mostrarVerMais]);

  return (
    <div ref={painelRef} className="card">
      <div className="card-body d-flex flex-column">
        <h2 className="h6">Buscar oração</h2>
        <FormularioBuscaOracao
          valor={busca}
          ordem={ordem}
          categoria={categoria}
          placeholder="Digite o nome da oração..."
          rotuloCampo="Digite o nome da oração"
          rotuloBotao="Buscar oração"
          classeBotao="btn btn-outline-secondary"
          classeFormulario="mb-4"
        />

        <h2 className="h6">Categorias</h2>
        <ul className="list-unstyled mb-0">
          <li>
            <Link
              href={hrefOracoes({ busca, ordem })}
              className={`d-flex justify-content-between text-decoration-none py-2 px-2 border-start border-3 ${
                categoria
                  ? "border-light text-body"
                  : "border-primary bg-primary-subtle"
              }`}
              aria-current={categoria ? undefined : "true"}
            >
              <span className="text-break me-2">Todas as Orações</span>
              <span className="text-secondary flex-shrink-0">{total}</span>
            </Link>
          </li>
          <li>
            <Link
              href={hrefOracoes({
                busca,
                ordem,
                categoria: categoriaDestaque,
              })}
              className={`d-flex justify-content-between text-decoration-none py-2 px-2 border-start border-3 ${
                categoria === categoriaDestaque
                  ? "border-primary bg-primary-subtle"
                  : "border-light text-body"
              }`}
              aria-current={
                categoria === categoriaDestaque ? "true" : undefined
              }
            >
              <span className="text-break me-2 fw-semibold">
                <i
                  className="bi bi-star-fill me-1 text-warning"
                  aria-hidden="true"
                />
                {nomeCategoriaDestaque}
              </span>
              <span className="text-secondary flex-shrink-0">
                {quantidadeDestaques}
              </span>
            </Link>
          </li>
        </ul>
        <ul
          ref={listaRef}
          className="list-unstyled mb-0"
          style={
            alturaLista === null
              ? undefined
              : { maxHeight: alturaLista, overflowY: "auto" }
          }
        >
          {visiveis.map((item) => {
            const ativa = item.slug === categoria;

            return (
              <li key={item.slug}>
                <Link
                  href={hrefOracoes({ busca, ordem, categoria: item.slug })}
                  className={`d-flex justify-content-between text-decoration-none py-2 px-2 border-start border-3 ${
                    ativa
                      ? "border-primary bg-primary-subtle"
                      : "border-light text-body"
                  }`}
                  aria-current={ativa ? "true" : undefined}
                >
                  <span className="text-break me-2">{item.slug}</span>
                  <span className="text-secondary flex-shrink-0">
                    {item.quantidade}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        {mostrarVerMais ? (
          <button
            type="button"
            className="btn btn-outline-secondary w-100 mt-3"
            onClick={() => setExpandida(true)}
          >
            Ver mais
          </button>
        ) : null}
        <Link
          href={hrefOracoes({ ordem })}
          className="btn btn-outline-primary w-100 mt-4"
        >
          <i className="bi bi-arrow-counterclockwise me-2" aria-hidden="true" />
          Limpar filtros
        </Link>
      </div>
    </div>
  );
}
