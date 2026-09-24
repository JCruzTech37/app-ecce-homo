import type { CSSProperties } from "react";
import Link from "next/link";

const proporcaoRetrato = {
  "--bs-aspect-ratio": "133.333%",
} as CSSProperties;

// !!! ESTÁTICO — futuramente virá do domínio/repository !!!
const relacionadas = [
  {
    titulo: "Ave-Maria",
    descricao: "A oração que nos une a Maria.",
    tag: "Orações Marianas",
  },
  {
    titulo: "Consagração a Jesus",
    descricao: "Entregue sua vida a Cristo.",
    tag: "Orações a Jesus",
  },
  {
    titulo: "Oração a São José",
    descricao: "Peça a intercessão do pai adotivo de Jesus.",
    tag: "Orações aos Santos",
  },
  {
    titulo: "Oração a Nossa Senhora Aparecida",
    descricao: "Confie suas intenções à Mãe do Brasil.",
    tag: "Orações Marianas",
  },
];

const categoriasLaterais = [
  "Todas as Orações",
  "Orações Marianas",
  "Orações a Jesus",
  "Orações ao Espírito Santo",
  "Orações aos Santos",
  "Orações da Igreja",
  "Orações Diversas",
];

export default function PaginaOracaoExemplo() {
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
        <div className="bg-secondary-subtle py-4" aria-hidden="true" />

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
                <a href="#" className="text-decoration-none">
                  Orações Marianas
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Oração de exemplo
              </li>
            </ol>
          </nav>

          <div className="row g-4">
            <aside className="col-12 col-lg-3 order-3 order-lg-1">
              <div className="card mb-4">
                <div className="card-body">
                  <h2 className="h6">Orações</h2>
                  <ul className="list-unstyled mb-0">
                    {categoriasLaterais.map((categoria) => {
                      const ativa = categoria === "Orações Marianas";
                      return (
                        <li key={categoria}>
                          {categoria === "Todas as Orações" ? (
                            <Link
                              href="/oracoes"
                              className="d-block text-decoration-none py-2 px-2 border-start border-3 border-light"
                            >
                              {categoria}
                            </Link>
                          ) : (
                            <a
                              href="#"
                              className={`d-block text-decoration-none py-2 px-2 border-start border-3 ${
                                ativa
                                  ? "border-primary bg-primary-subtle"
                                  : "border-light"
                              }`}
                            >
                              {categoria}
                            </a>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* !!! ESTÁTICO — frase de santo provisória !!! */}
              <blockquote className="bg-light rounded p-4 mb-0">
                <i
                  className="bi bi-quote fs-3 text-secondary"
                  aria-hidden="true"
                />
                <p className="fst-italic mb-3">
                  Texto provisório de uma frase complementar, usado apenas para
                  ocupar o espaço previsto ao lado da oração.
                </p>
                <footer className="blockquote-footer mb-0">
                  Autor provisório
                </footer>
              </blockquote>
            </aside>

            <article className="col-12 col-lg-6 order-1 order-lg-2">
              {/* !!! ESTÁTICO — futuramente virá do domínio/repository !!! */}
              <p className="small text-uppercase text-secondary mb-2">Oração</p>
              <h1 className="display-6">Oração de exemplo</h1>
              <p>
                Texto provisório de apresentação, no lugar da descrição que
                acompanhará a oração quando o conteúdo estiver ligado.
              </p>
              <div className="mb-4">
                <p>Linha provisória da oração, para marcar o bloco de texto.</p>
                <p>
                  Segunda linha provisória, com extensão parecida à da
                  referência, para validar a largura da coluna.
                </p>
                <p>
                  Terceiro parágrafo provisório, usado somente para verificar
                  espaçamento, quebra de linha e altura do conteúdo.
                </p>
                <p>Quarto parágrafo provisório da oração de exemplo.</p>
                <p>R. Resposta provisória da oração.</p>
                <p className="mb-0">Amém.</p>
              </div>
              {/* !!! ESTÁTICO — compartilhamento sem comportamento !!! */}
              <p className="fw-semibold mb-2">Compartilhar esta oração:</p>
              <div className="d-flex flex-column flex-sm-row flex-wrap gap-2 mb-4">
                <button type="button" className="btn btn-success">
                  <i className="bi bi-whatsapp me-2" aria-hidden="true" />
                  WhatsApp
                </button>
                <button type="button" className="btn btn-outline-secondary">
                  <i className="bi bi-link-45deg me-2" aria-hidden="true" />
                  Copiar link
                </button>
                <button type="button" className="btn btn-outline-secondary">
                  <i className="bi bi-share me-2" aria-hidden="true" />
                  Mais opções
                </button>
              </div>
              <h2 className="h6">Categorias desta oração</h2>
              {/* !!! ESTÁTICO — tags provisórias !!! */}
              <p className="d-flex flex-wrap gap-2 mb-0">
                <a
                  href="#"
                  className="badge rounded-pill text-bg-primary text-decoration-none fw-normal"
                >
                  Orações Marianas
                </a>
                <a
                  href="#"
                  className="badge rounded-pill text-bg-primary text-decoration-none fw-normal"
                >
                  Nossa Senhora
                </a>
                <a
                  href="#"
                  className="badge rounded-pill text-bg-primary text-decoration-none fw-normal"
                >
                  Orações Tradicionais
                </a>
              </p>
            </article>

            <div className="col-12 col-lg-3 order-2 order-lg-3">
              {/* !!! ESTÁTICO — placeholder da imagem vertical !!! */}
              <div
                className="ratio bg-secondary-subtle rounded-top"
                style={proporcaoRetrato}
                aria-hidden="true"
              />
              {/* !!! ESTÁTICO — jaculatória provisória !!! */}
              <div className="bg-light border border-top-0 rounded-bottom text-center p-4">
                <p className="small text-uppercase fw-semibold mb-0">
                  Jaculatória provisória
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
            <Link href="/oracoes" className="btn btn-outline-primary btn-sm">
              Ver todas as orações
            </Link>
          </div>
          {/* !!! ESTÁTICO — relacionadas provisórias, sem regra de seleção !!! */}
          <div className="row g-4">
            {relacionadas.map((oracao) => (
              <div key={oracao.titulo} className="col-12 col-sm-6 col-lg-3">
                <article className="card h-100">
                  <div
                    className="ratio ratio-1x1 bg-secondary-subtle"
                    aria-hidden="true"
                  />
                  <div className="card-body d-flex flex-column">
                    <h3 className="h6 card-title">{oracao.titulo}</h3>
                    <p className="card-text small">{oracao.descricao}</p>
                    <p>
                      <a
                        href="#"
                        className="badge rounded-pill text-bg-primary text-decoration-none fw-normal"
                      >
                        {oracao.tag}
                      </a>
                    </p>
                    <a href="#" className="mt-auto">
                      Ler oração
                    </a>
                  </div>
                </article>
              </div>
            ))}
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
              <nav
                aria-label="Categorias do rodapé"
                className="d-flex flex-column gap-1"
              >
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
