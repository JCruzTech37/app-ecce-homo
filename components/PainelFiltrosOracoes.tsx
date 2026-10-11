"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { FormularioBuscaOracao } from "@/components/FormularioBuscaOracao";
import { categoriaDestaque, nomeCategoriaDestaque } from "@/domain/destaques";
import {
  consultaViewportMobile,
  idListaOracoes,
  rolarParaListaOracoes,
  viewportMobile,
} from "@/lib/ancoraListaOracoes";
import { hrefOracoes } from "@/lib/hrefOracoes";

const limiteCategorias = 20;
const minimoLinhas = 7;
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
  const router = useRouter();
  const painelRef = useRef<HTMLDivElement>(null);
  const listaRef = useRef<HTMLUListElement>(null);
  const [expandida, setExpandida] = useState(false);
  const [alturaLista, setAlturaLista] = useState<number | null>(null);
  const visiveis = expandida
    ? categorias
    : categorias.slice(0, limiteCategorias);
  const mostrarVerMais = !expandida && categorias.length > limiteCategorias;

  useLayoutEffect(() => {
    if (alturaLista === null) {
      return;
    }

    if (window.location.hash !== `#${idListaOracoes}`) {
      return;
    }

    rolarParaListaOracoes();
  }, [busca, categoria, alturaLista]);

  useLayoutEffect(() => {
    const painel = painelRef.current;
    const lista = listaRef.current;

    if (!painel || !lista) {
      return;
    }

    const definirAltura = (proxima: number | null) => {
      setAlturaLista((atual) =>
        proxima !== null && atual !== null && Math.abs(atual - proxima) < 1
          ? atual
          : proxima,
      );
    };

    const medir = () => {
      const item = lista.querySelector("li");
      const minima = item
        ? Math.round(item.getBoundingClientRect().height * minimoLinhas)
        : null;

      if (window.matchMedia(consultaViewportMobile).matches) {
        definirAltura(minima);
        return;
      }

      const grade = document.getElementById(idGrade);

      if (!grade || grade.getBoundingClientRect().height <= 0) {
        definirAltura(minima);
        return;
      }

      const alturaGrade = grade.getBoundingClientRect().height;
      const alturaPainel = painel.getBoundingClientRect().height;
      const alturaAtual = lista.getBoundingClientRect().height;
      const restante = alturaPainel - alturaAtual;
      const alinhada = Math.max(0, Math.round(alturaGrade - restante));
      definirAltura(Math.max(minima ?? 0, alinhada));
    };

    medir();
    const observador = new ResizeObserver(medir);
    const grade = document.getElementById(idGrade);
    if (grade) {
      observador.observe(grade);
    }
    const midia = window.matchMedia(consultaViewportMobile);
    midia.addEventListener("change", medir);

    return () => {
      observador.disconnect();
      midia.removeEventListener("change", medir);
    };
  }, [expandida, quantidadeResultados, categorias.length, mostrarVerMais]);

  function aoAbrirLista(evento: MouseEvent<HTMLAnchorElement>) {
    if (!viewportMobile()) {
      return;
    }

    evento.preventDefault();
    const href = evento.currentTarget.getAttribute("href");

    if (!href) {
      return;
    }

    router.push(`${href.split("#")[0]}#${idListaOracoes}`, { scroll: false });
    rolarParaListaOracoes();
  }

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
              onClick={aoAbrirLista}
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
              onClick={aoAbrirLista}
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
                  onClick={aoAbrirLista}
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
          onClick={aoAbrirLista}
        >
          <i className="bi bi-arrow-counterclockwise me-2" aria-hidden="true" />
          Limpar filtros
        </Link>
      </div>
    </div>
  );
}
