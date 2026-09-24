import Link from "next/link";

export default function PaginaNaoEncontrada() {
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
              <Link href="/oracoes" className="link-secondary text-decoration-none">
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
        {/* !!! ESTÁTICO — placeholder da faixa visual superior !!! */}
        <div className="bg-secondary-subtle py-5" aria-hidden="true">
          <div className="py-lg-3" />
        </div>

        <section className="container py-5" aria-labelledby="titulo-404">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-6">
              {/* !!! ESTÁTICO — placeholder da imagem lateral !!! */}
              <div
                className="ratio ratio-1x1 bg-secondary-subtle rounded"
                aria-hidden="true"
              />
            </div>
            <div className="col-12 col-lg-6 text-center">
              {/* !!! ESTÁTICO — texto provisório da página não encontrada !!! */}
              <p className="small text-uppercase text-secondary mb-2">
                Página não encontrada
              </p>
              <p className="display-1 fw-semibold text-primary mb-3">404</p>
              <h1 id="titulo-404" className="h2">
                Esta página não foi encontrada.
              </h1>
              <p>
                A página que você está procurando não existe ou pode ter sido
                movida para outro endereço.
              </p>
              <p>
                Enquanto isso, que tal voltar para as orações e continuar sua
                caminhada de fé?
              </p>
              <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 mt-4">
                <Link href="/" className="btn btn-primary">
                  <i className="bi bi-house-door me-2" aria-hidden="true" />
                  Voltar para o início
                </Link>
                <Link href="/oracoes" className="btn btn-outline-primary">
                  <i className="bi bi-book me-2" aria-hidden="true" />
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
              <Link
                href="/"
                className="d-block fs-5 fw-semibold text-primary mb-1 text-decoration-none"
              >
                Ecce Homo
              </Link>
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
