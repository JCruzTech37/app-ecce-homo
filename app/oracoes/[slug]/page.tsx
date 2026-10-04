import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CarrosselOracoesRelacionadas } from "@/components/CarrosselOracoesRelacionadas";
import { CompartilharOracao } from "@/components/CompartilharOracao";
import { FormularioBuscaOracao } from "@/components/FormularioBuscaOracao";
import {
  categoriasPorQuantidade,
  categoriasSugeridas,
} from "@/domain/categoriasOracoes";
import { listarOracoesPublicadas, obterOracaoPorSlug } from "@/domain/oracoes";
import { categoriaDestaque, nomeCategoriaDestaque } from "@/domain/destaques";
import { oracoesRelacionadas } from "@/domain/oracoesRelacionadas";
import { hrefOracoes } from "@/lib/hrefOracoes";
import { Rodape } from "@/components/Rodape";
import styles from "./descricao.module.css";

const proporcaoRetrato = {
  "--bs-aspect-ratio": "133.333%",
} as CSSProperties;

function caminhoImagemPublica(referencia: string): string {
  if (referencia.startsWith("public/")) {
    return `/${referencia.slice("public/".length)}`;
  }

  return referencia;
}

function textoParametro(
  valor: string | string[] | undefined,
): string | undefined {
  return Array.isArray(valor) ? valor[0] : valor;
}

function ordenacaoSolicitada(valor: string | string[] | undefined): string {
  const texto = textoParametro(valor);

  if (
    texto === "antigas" ||
    texto === "az" ||
    texto === "za" ||
    texto === "recentes"
  ) {
    return texto;
  }

  return "recentes";
}

function nomeCategoria(tag: string): string {
  if (tag === categoriaDestaque) {
    return nomeCategoriaDestaque;
  }

  return tag
    .split("-")
    .map((parte) => {
      const palavra = parte.toLocaleLowerCase("pt-BR");

      if (palavra === "oracoes") {
        return "Orações";
      }

      if (palavra === "oracao") {
        return "Oração";
      }

      if (!parte) {
        return parte;
      }

      return parte.charAt(0).toLocaleUpperCase("pt-BR") + parte.slice(1);
    })
    .join(" ");
}

export default async function PaginaOracao(
  props: PageProps<"/oracoes/[slug]">,
) {
  const { slug } = await props.params;
  const {
    busca: buscaInformada,
    categoria: categoriaInformada,
    ordem: ordemInformada,
  } = await props.searchParams;
  const oracao = await obterOracaoPorSlug(slug);

  if (!oracao) {
    notFound();
  }

  const publicadas = await listarOracoesPublicadas();
  const categorias = categoriasPorQuantidade(publicadas).filter(
    (item) => item.slug !== categoriaDestaque,
  );
  const ordem = ordenacaoSolicitada(ordemInformada);
  const busca = (textoParametro(buscaInformada) ?? "").trim().slice(0, 50);
  const categoriaSolicitada = (textoParametro(categoriaInformada) ?? "").trim();
  const categoria =
    categoriaSolicitada === categoriaDestaque ||
    categorias.some((item) => item.slug === categoriaSolicitada)
      ? categoriaSolicitada
      : "";
  const sugestoes = categoriasSugeridas(oracao.tags, categorias);
  const relacionadas = oracoesRelacionadas(oracao, publicadas).map((item) => ({
    slug: item.slug,
    titulo: item.titulo,
    descricao: item.descricao,
    imagemVertical: item.imagemVertical,
    textoAlternativo: item.textoAlternativo,
    tags: item.tags,
  }));
  const rotuloContexto = categoria
    ? nomeCategoria(categoria)
    : busca
      ? busca
      : "Todas as Orações";
  const hrefContexto = hrefOracoes({ busca, ordem, categoria });
  const hrefTodas = hrefOracoes({ busca, ordem });

  return (
    <>
      <header className="border-bottom bg-white">
        <div className="container py-3">
          <div className="row align-items-center g-3">
            <div className="col-12 col-lg-3">
              <Link href="/" className="text-decoration-none">
                <span className="d-block fs-4 fw-semibold text-primary lh-1">
                  Ecce Homo
                </span>
                <span className="d-block small text-secondary text-uppercase">
                  Ad maiorem Dei gloriam
                </span>
              </Link>
            </div>
            <nav
              aria-label="Principal"
              className="col-12 col-lg-5 d-flex flex-wrap justify-content-lg-center gap-3"
            >
              <Link href="/" className="link-secondary text-decoration-none">
                Início
              </Link>
              <Link
                href="/oracoes"
                className="link-primary fw-semibold text-decoration-none"
              >
                Orações
              </Link>
              <Link
                href="/sobre"
                className="link-secondary text-decoration-none"
              >
                Sobre
              </Link>
              <Link
                href="/sobre#contato"
                className="link-secondary text-decoration-none"
              >
                Contato
              </Link>
            </nav>
            <div className="col-12 col-lg-4">
              <FormularioBuscaOracao />
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* !!! ESTÁTICO — placeholder da faixa visual superior !!! */}
        <div className="bg-light py-4" aria-hidden="true" />

        <div className="container py-4">
          <nav aria-label="Trilha">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/" className="text-decoration-none">
                  <i className="bi bi-house-door me-1" aria-hidden="true" />
                  Início
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/oracoes" className="text-decoration-none">
                  Orações
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link href={hrefContexto} className="text-decoration-none">
                  {rotuloContexto}
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {oracao.titulo}
              </li>
            </ol>
          </nav>

          <div className="row g-4">
            <aside className="col-12 col-lg-3 order-3 order-lg-1">
              <div className="card mb-4">
                <div className="card-body">
                  <h2 className="h6">Orações</h2>
                  <ul className="list-unstyled mb-0">
                    <li>
                      <Link
                        href={hrefTodas}
                        className={`d-block text-decoration-none py-2 px-2 border-start border-3 ${
                          categoria
                            ? "border-light"
                            : "border-primary bg-primary-subtle"
                        }`}
                        aria-current={categoria ? undefined : "true"}
                      >
                        Todas as Orações
                      </Link>
                    </li>
                    {sugestoes.map((tag) => {
                      const ativa = tag === categoria;

                      return (
                        <li key={tag}>
                          <Link
                            href={hrefOracoes({ busca, ordem, categoria: tag })}
                            className={`d-block text-decoration-none py-2 px-2 border-start border-3 ${
                              ativa
                                ? "border-primary bg-primary-subtle"
                                : "border-light"
                            }`}
                            aria-current={ativa ? "true" : undefined}
                          >
                            {nomeCategoria(tag)}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <blockquote className="bg-light rounded p-4 mb-0">
                <i
                  className="bi bi-quote fs-3 text-secondary"
                  aria-hidden="true"
                />
                <p className="fst-italic mb-3">{oracao.fraseSanto}</p>
                <footer className="blockquote-footer mb-0">
                  {oracao.fraseSantoAutor}
                </footer>
              </blockquote>
            </aside>

            <article className="col-12 col-lg-6 order-1 order-lg-2">
              <p className="small text-uppercase text-secondary mb-2">Oração</p>
              <h1 className="display-6">{oracao.titulo}</h1>
              {oracao.descricao ? (
                <p className={styles.descricao}>{oracao.descricao}</p>
              ) : null}
              <div className="mb-4" style={{ whiteSpace: "pre-line" }}>
                {oracao.texto}
              </div>
              <p className="fw-semibold mb-2">Compartilhar esta oração:</p>
              <CompartilharOracao titulo={oracao.titulo} texto={oracao.texto} />
              {oracao.tags.length > 0 ? (
                <>
                  <h2 className="h6">Categorias desta oração</h2>
                  <p className="d-flex flex-wrap gap-2 mb-0">
                    {oracao.tags.map((tag, indice) => (
                      <Link
                        key={`${tag}-${indice}`}
                        href={hrefOracoes({ categoria: tag })}
                        className={`badge text-decoration-none ${
                          tag === categoriaDestaque
                            ? "text-bg-warning"
                            : "text-bg-primary"
                        }`}
                      >
                        {nomeCategoria(tag)}
                      </Link>
                    ))}
                  </p>
                </>
              ) : null}
            </article>

            <div className="col-12 col-lg-3 order-2 order-lg-3">
              <div
                className="ratio bg-secondary-subtle rounded-top overflow-hidden"
                style={proporcaoRetrato}
              >
                <Image
                  src={caminhoImagemPublica(oracao.imagemVertical)}
                  alt={oracao.textoAlternativo}
                  fill
                  className="object-fit-cover"
                  sizes="(min-width: 992px) 280px, 100vw"
                />
              </div>
              <div className="bg-light border border-top-0 rounded-bottom text-center p-4">
                <p className="small text-uppercase fw-semibold mb-0">
                  {oracao.jaculatoria}
                </p>
              </div>
            </div>
          </div>
        </div>

        <section
          className="container pb-5"
          aria-labelledby="relacionadas-titulo"
        >
          <div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center gap-2 mb-4">
            <h2
              id="relacionadas-titulo"
              className="h4 mb-0 border-start border-primary border-3 ps-2"
            >
              Orações relacionadas
            </h2>
            <Link href="/oracoes" className="btn btn-outline-primary btn-ver-oracoes">
              Ver todas as orações
            </Link>
          </div>
          <CarrosselOracoesRelacionadas
            oracoes={relacionadas}
            busca={busca}
            ordem={ordem}
            categoria={categoria}
          />
        </section>
      </main>

      <Rodape />
    </>
  );
}
