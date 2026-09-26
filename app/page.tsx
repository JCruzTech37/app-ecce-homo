import Link from "next/link";
import { CarrosselOracoesRelacionadas } from "@/components/CarrosselOracoesRelacionadas";
import { FormularioBuscaOracao } from "@/components/FormularioBuscaOracao";
import { Rodape } from "@/components/Rodape";
import { categoriaDestaque } from "@/domain/destaques";
import {
  listarOracoesEmDestaque,
  listarOracoesRecentes,
} from "@/domain/oracoes";
import { hrefOracoes } from "@/lib/hrefOracoes";

export default async function Home() {
  const paraCarrossel = (
    oracoes: Awaited<ReturnType<typeof listarOracoesRecentes>>,
  ) =>
    oracoes.map((oracao) => ({
      slug: oracao.slug,
      titulo: oracao.titulo,
      descricao: oracao.descricao,
      imagemVertical: oracao.imagemVertical,
      textoAlternativo: oracao.textoAlternativo,
      tags: oracao.tags,
    }));
  const destaques = paraCarrossel(await listarOracoesEmDestaque());
  const recentes = paraCarrossel(await listarOracoesRecentes());
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
              <Link
                href="/"
                className="link-primary fw-semibold text-decoration-none"
              >
                Início
              </Link>
              <Link
                href="/oracoes"
                className="link-secondary text-decoration-none"
              >
                Orações
              </Link>
              <Link href="/404" className="link-secondary text-decoration-none">
                Sobre
              </Link>
            </nav>

            <div className="col-12 col-lg-4">
              <FormularioBuscaOracao />
            </div>
          </div>
        </div>
      </header>

      <main>
        <section
          className="bg-light border-bottom"
          aria-labelledby="hero-titulo"
        >
          <div className="container py-5">
            <div className="row align-items-center g-4">
              <div className="col-12 col-lg-7">
                {/* !!! ESTÁTICO — texto provisório da apresentação !!! */}
                <h1 id="hero-titulo" className="display-6 fw-semibold">
                  “Maria sempre nos conduz a Jesus.”
                </h1>
                <p className="text-secondary mb-4">São João Paulo II</p>
                <p className="lead mb-2">
                  Encontre orações para todos os momentos da sua vida.
                </p>
                <p className="mb-4">Reze, medite e fortaleça sua fé.</p>
                <Link href="/oracoes" className="btn btn-primary">
                  Ver todas as orações
                </Link>
              </div>
              <div className="col-12 col-lg-5">
                <div
                  className="ratio ratio-4x3 bg-secondary-subtle rounded"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="container py-5" aria-labelledby="destaque-titulo">
          <div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center gap-2 mb-4">
            <h2
              id="destaque-titulo"
              className="h4 mb-0 border-start border-primary border-3 ps-2"
            >
              Orações em destaque
            </h2>
            <Link
              href={hrefOracoes({ categoria: categoriaDestaque })}
              className="btn btn-outline-primary btn-sm"
            >
              Ver todas
            </Link>
          </div>
          <CarrosselOracoesRelacionadas
            oracoes={destaques}
            rotuloNavegacao="Páginas de orações em destaque"
          />
        </section>

        <section className="container pb-5" aria-labelledby="recentes-titulo">
          <div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center gap-2 mb-4">
            <h2
              id="recentes-titulo"
              className="h4 mb-0 border-start border-primary border-3 ps-2"
            >
              Orações mais recentes
            </h2>
            <Link href="/oracoes" className="btn btn-outline-primary btn-sm">
              Ver todas
            </Link>
          </div>
          <CarrosselOracoesRelacionadas
            oracoes={recentes}
            rotuloNavegacao="Páginas de orações mais recentes"
          />
        </section>

        <section
          className="bg-light border-top border-bottom"
          aria-labelledby="categorias-titulo"
        >
          <div className="container py-5">
            <h2
              id="categorias-titulo"
              className="h4 mb-4 border-start border-primary border-3 ps-2"
            >
              Categorias de orações
            </h2>

            {/* !!! ESTÁTICO — agrupamento visual provisório, sem categorias funcionais !!! */}
            <div className="row g-3">
              <div className="col-12 col-sm-6 col-lg-4 col-xl-2">
                <article className="card h-100 text-center">
                  <div className="card-body d-flex flex-column">
                    <i
                      className="bi bi-heart fs-3 text-primary"
                      aria-hidden="true"
                    />
                    <h3 className="h6 mt-2">Orações Marianas</h3>
                    <p className="small text-secondary">
                      Orações a Nossa Senhora
                    </p>
                    <Link href="/404" className="mt-auto small">
                      Ver orações
                    </Link>
                  </div>
                </article>
              </div>
              <div className="col-12 col-sm-6 col-lg-4 col-xl-2">
                <article className="card h-100 text-center">
                  <div className="card-body d-flex flex-column">
                    <i
                      className="bi bi-plus-lg fs-3 text-primary"
                      aria-hidden="true"
                    />
                    <h3 className="h6 mt-2">Orações a Jesus</h3>
                    <p className="small text-secondary">
                      Orações ao Sagrado Coração
                    </p>
                    <Link href="/404" className="mt-auto small">
                      Ver orações
                    </Link>
                  </div>
                </article>
              </div>
              <div className="col-12 col-sm-6 col-lg-4 col-xl-2">
                <article className="card h-100 text-center">
                  <div className="card-body d-flex flex-column">
                    <i
                      className="bi bi-wind fs-3 text-primary"
                      aria-hidden="true"
                    />
                    <h3 className="h6 mt-2">Orações ao Espírito Santo</h3>
                    <p className="small text-secondary">
                      Peça a luz e a força do Espírito
                    </p>
                    <Link href="/404" className="mt-auto small">
                      Ver orações
                    </Link>
                  </div>
                </article>
              </div>
              <div className="col-12 col-sm-6 col-lg-4 col-xl-2">
                <article className="card h-100 text-center">
                  <div className="card-body d-flex flex-column">
                    <i
                      className="bi bi-people fs-3 text-primary"
                      aria-hidden="true"
                    />
                    <h3 className="h6 mt-2">Orações aos Santos</h3>
                    <p className="small text-secondary">
                      Intercessão dos Santos
                    </p>
                    <Link href="/404" className="mt-auto small">
                      Ver orações
                    </Link>
                  </div>
                </article>
              </div>
              <div className="col-12 col-sm-6 col-lg-4 col-xl-2">
                <article className="card h-100 text-center">
                  <div className="card-body d-flex flex-column">
                    <i
                      className="bi bi-building fs-3 text-primary"
                      aria-hidden="true"
                    />
                    <h3 className="h6 mt-2">Orações da Igreja</h3>
                    <p className="small text-secondary">Orações tradicionais</p>
                    <Link href="/404" className="mt-auto small">
                      Ver orações
                    </Link>
                  </div>
                </article>
              </div>
              <div className="col-12 col-sm-6 col-lg-4 col-xl-2">
                <article className="card h-100 text-center">
                  <div className="card-body d-flex flex-column">
                    <i
                      className="bi bi-book fs-3 text-primary"
                      aria-hidden="true"
                    />
                    <h3 className="h6 mt-2">Orações Diversas</h3>
                    <p className="small text-secondary">
                      Para todos os momentos
                    </p>
                    <Link href="/404" className="mt-auto small">
                      Ver orações
                    </Link>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-5" aria-labelledby="chamada-titulo">
          {/* !!! ESTÁTICO — chamada institucional provisória !!! */}
          <div className="row g-0 border rounded overflow-hidden">
            <div className="col-12 col-lg-6">
              <div
                className="ratio ratio-16x9 bg-secondary-subtle h-100"
                aria-hidden="true"
              />
            </div>
            <div className="col-12 col-lg-6 bg-light">
              <div className="p-4 p-lg-5">
                <h2 id="chamada-titulo" className="h4">
                  Aprofunde sua vida de oração
                </h2>
                <p>
                  Descubra orações tradicionais, conheça novos santos e
                  fortaleça sua caminhada de fé.
                </p>
                <Link href="/oracoes" className="btn btn-primary">
                  Ver todas as orações
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Rodape />
    </>
  );
}
