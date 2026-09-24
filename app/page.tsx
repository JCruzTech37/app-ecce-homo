import Link from "next/link";

export default function Home() {
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

            {/* !!! ESTÁTICO — a pesquisa ainda não possui comportamento !!! */}
            <div className="col-12 col-lg-4">
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Busque uma oração..."
                  aria-label="Busque uma oração"
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  aria-label="Buscar"
                >
                  <i className="bi bi-search" aria-hidden="true" />
                </button>
              </div>
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
            <Link href="/oracoes" className="btn btn-outline-primary btn-sm">
              Ver todas
            </Link>
          </div>

          {/* !!! ESTÁTICO — futuramente virá do domínio de orações em destaque !!! */}
          <div className="row g-4">
            <div className="col-12 col-sm-6 col-lg-3">
              <article className="card h-100">
                <div
                  className="ratio ratio-1x1 bg-secondary-subtle"
                  aria-hidden="true"
                />
                <div className="card-body d-flex flex-column">
                  <h3 className="h6 card-title">Ave-Maria</h3>
                  <p className="card-text small">
                    A oração que nos une a Maria.
                  </p>
                  <p className="small text-primary mb-3">Orações Marianas</p>
                  <a href="#" className="mt-auto">
                    Ler oração
                  </a>
                </div>
              </article>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <article className="card h-100">
                <div
                  className="ratio ratio-1x1 bg-secondary-subtle"
                  aria-hidden="true"
                />
                <div className="card-body d-flex flex-column">
                  <h3 className="h6 card-title">Consagração a Jesus</h3>
                  <p className="card-text small">Entregue sua vida a Cristo.</p>
                  <p className="small text-primary mb-3">Orações a Jesus</p>
                  <a href="#" className="mt-auto">
                    Ler oração
                  </a>
                </div>
              </article>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <article className="card h-100">
                <div
                  className="ratio ratio-1x1 bg-secondary-subtle"
                  aria-hidden="true"
                />
                <div className="card-body d-flex flex-column">
                  <h3 className="h6 card-title">Oração a São José</h3>
                  <p className="card-text small">
                    Peça a intercessão do pai adotivo de Jesus.
                  </p>
                  <p className="small text-primary mb-3">Orações aos Santos</p>
                  <a href="#" className="mt-auto">
                    Ler oração
                  </a>
                </div>
              </article>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <article className="card h-100">
                <div
                  className="ratio ratio-1x1 bg-secondary-subtle"
                  aria-hidden="true"
                />
                <div className="card-body d-flex flex-column">
                  <h3 className="h6 card-title">
                    Oração a Nossa Senhora Aparecida
                  </h3>
                  <p className="card-text small">
                    Confie suas intenções à Mãe do Brasil.
                  </p>
                  <p className="small text-primary mb-3">Orações Marianas</p>
                  <a href="#" className="mt-auto">
                    Ler oração
                  </a>
                </div>
              </article>
            </div>
          </div>
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

          {/* !!! ESTÁTICO — futuramente virá do domínio de orações recentes !!! */}
          <div className="row g-4">
            <div className="col-12 col-sm-6 col-lg-3">
              <article className="card h-100">
                <div
                  className="ratio ratio-1x1 bg-secondary-subtle"
                  aria-hidden="true"
                />
                <div className="card-body d-flex flex-column">
                  <h3 className="h6 card-title">Oração da Manhã</h3>
                  <p className="card-text small">Comece o dia com Deus.</p>
                  <p className="small text-primary mb-3">Orações Diversas</p>
                  <a href="#" className="mt-auto">
                    Ler oração
                  </a>
                </div>
              </article>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <article className="card h-100">
                <div
                  className="ratio ratio-1x1 bg-secondary-subtle"
                  aria-hidden="true"
                />
                <div className="card-body d-flex flex-column">
                  <h3 className="h6 card-title">Oração da Noite</h3>
                  <p className="card-text small">Entregue seu dia ao Senhor.</p>
                  <p className="small text-primary mb-3">Orações Diversas</p>
                  <a href="#" className="mt-auto">
                    Ler oração
                  </a>
                </div>
              </article>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <article className="card h-100">
                <div
                  className="ratio ratio-1x1 bg-secondary-subtle"
                  aria-hidden="true"
                />
                <div className="card-body d-flex flex-column">
                  <h3 className="h6 card-title">Vinde Espírito Santo</h3>
                  <p className="card-text small">
                    Peça os dons do Espírito Santo.
                  </p>
                  <p className="small text-primary mb-3">
                    Orações ao Espírito Santo
                  </p>
                  <a href="#" className="mt-auto">
                    Ler oração
                  </a>
                </div>
              </article>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <article className="card h-100">
                <div
                  className="ratio ratio-1x1 bg-secondary-subtle"
                  aria-hidden="true"
                />
                <div className="card-body d-flex flex-column">
                  <h3 className="h6 card-title">Oração do Terço</h3>
                  <p className="card-text small">
                    Medite os mistérios do Rosário.
                  </p>
                  <p className="small text-primary mb-3">Orações Marianas</p>
                  <a href="#" className="mt-auto">
                    Ler oração
                  </a>
                </div>
              </article>
            </div>
          </div>
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

      <footer className="border-top bg-light">
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-3">
              <p className="fs-5 fw-semibold text-primary mb-1">Ecce Homo</p>
              <p className="small text-uppercase text-secondary">
                Ad maiorem Dei gloriam
              </p>
              {/* !!! ESTÁTICO — texto institucional provisório !!! */}
              <p className="small mb-0">
                Um espaço dedicado à oração e à vida católica, para maior glória
                de Deus.
              </p>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <h2 className="h6">Navegação</h2>
              <nav aria-label="Rodapé" className="d-flex flex-column gap-1">
                <Link href="/" className="link-secondary small">
                  Início
                </Link>
                <Link href="/oracoes" className="link-secondary small">
                  Orações
                </Link>
                <Link href="/404" className="link-secondary small">
                  Sobre
                </Link>
              </nav>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <h2 className="h6">Categorias</h2>
              {/* !!! ESTÁTICO — links de categoria provisórios !!! */}
              <nav aria-label="Categorias" className="d-flex flex-column gap-1">
                <Link href="/404" className="link-secondary small">
                  Orações Marianas
                </Link>
                <Link href="/404" className="link-secondary small">
                  Orações a Jesus
                </Link>
                <Link href="/404" className="link-secondary small">
                  Orações ao Espírito Santo
                </Link>
                <Link href="/404" className="link-secondary small">
                  Orações aos Santos
                </Link>
                <Link href="/404" className="link-secondary small">
                  Orações da Igreja
                </Link>
                <Link href="/404" className="link-secondary small">
                  Orações Diversas
                </Link>
              </nav>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <h2 className="h6">Receba novas orações</h2>
              {/* !!! ESTÁTICO — newsletter sem envio !!! */}
              <p className="small">
                Cadastre seu e-mail e receba novos conteúdos do Ecce Homo.
              </p>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Seu e-mail"
                  aria-label="Seu e-mail"
                />
                <button type="button" className="btn btn-primary">
                  Cadastrar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="border-top">
          <div className="container py-3 d-flex flex-column flex-sm-row justify-content-between gap-2">
            <p className="small text-secondary mb-0">
              © 2026 Ecce Homo. Todos os direitos reservados.
            </p>
            <nav aria-label="Informações legais" className="d-flex gap-3">
              <Link href="/404" className="link-secondary small">
                Política de Privacidade
              </Link>
              <Link href="/404" className="link-secondary small">
                Termos de Uso
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
