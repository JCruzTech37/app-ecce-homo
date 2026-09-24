import Link from "next/link";

{
  /* !!! ESTÁTICO — futuramente virá do domínio/repository !!! */
}
const oracoes = [
  {
    titulo: "Ave-Maria",
    descricao: "A oração que nos une a Maria.",
    tags: ["Orações Marianas", "Nossa Senhora"],
  },
  {
    titulo: "Consagração a Jesus",
    descricao: "Entregue sua vida a Cristo.",
    tags: ["Orações a Jesus", "Consagração"],
  },
  {
    titulo: "Oração a São José",
    descricao: "Peça a intercessão do pai adotivo de Jesus.",
    tags: ["Orações aos Santos", "São José"],
  },
  {
    titulo: "Oração a Nossa Senhora Aparecida",
    descricao: "Confie suas intenções à Mãe do Brasil.",
    tags: ["Orações Marianas", "Nossa Senhora"],
  },
  {
    titulo: "Oração da Manhã",
    descricao: "Comece o dia com Deus.",
    tags: ["Orações Diversas", "Manhã"],
  },
  {
    titulo: "Oração da Noite",
    descricao: "Entregue seu dia ao Senhor.",
    tags: ["Orações Diversas", "Noite"],
  },
  {
    titulo: "Vinde Espírito Santo",
    descricao: "Peça os dons do Espírito Santo.",
    tags: ["Orações ao Espírito Santo", "Pentecostes"],
  },
  {
    titulo: "Oração do Terço",
    descricao: "Medite os mistérios do Rosário.",
    tags: ["Orações Marianas", "Rosário"],
  },
  {
    titulo: "Oração a Santo Antônio",
    descricao: "Peça a intercessão de Santo Antônio.",
    tags: ["Orações aos Santos", "Santo Antônio"],
  },
];

const categorias = [
  { nome: "Todas as Orações", quantidade: 32, ativa: true },
  { nome: "Orações Marianas", quantidade: 12, ativa: false },
  { nome: "Orações a Jesus", quantidade: 8, ativa: false },
  { nome: "Orações ao Espírito Santo", quantidade: 4, ativa: false },
  { nome: "Orações aos Santos", quantidade: 6, ativa: false },
  { nome: "Orações da Igreja", quantidade: 4, ativa: false },
  { nome: "Orações Diversas", quantidade: 3, ativa: false },
];

const momentos = [
  ["Manhã", 7],
  ["Noite", 6],
  ["Família", 8],
  ["Dificuldades", 5],
  ["Agradecimento", 6],
  ["Proteção", 5],
  ["Paz", 4],
] as const;

export default function PaginaOracoes() {
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
        <section className="bg-secondary-subtle border-bottom">
          <div className="container py-4">
            <div className="row align-items-center g-4">
              <div className="col-12 col-lg-7">
                <nav aria-label="Trilha">
                  <ol className="breadcrumb mb-3">
                    <li className="breadcrumb-item">
                      <Link href="/" className="text-decoration-none">
                        <i
                          className="bi bi-house-door me-1"
                          aria-hidden="true"
                        />
                        Início
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Orações
                    </li>
                  </ol>
                </nav>
                {/* !!! ESTÁTICO — texto provisório da listagem !!! */}
                <h1 className="display-6">Orações</h1>
                <p className="mb-0 col-lg-10">
                  Encontre orações para todos os momentos da sua vida. Reze,
                  medite e fortaleça sua fé com as mais belas orações da
                  tradição católica.
                </p>
              </div>
              <div className="col-12 col-lg-5">
                {/* !!! ESTÁTICO — placeholder da imagem de abertura !!! */}
                <div
                  className="ratio ratio-16x9 bg-body-secondary rounded"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="container py-4">
          <div className="row g-4">
            <aside className="col-12 col-lg-3">
              <div className="card">
                <div className="card-body">
                  <h2 className="h6">Buscar oração</h2>
                  {/* !!! ESTÁTICO — busca da listagem sem comportamento !!! */}
                  <div className="input-group mb-4">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Digite o nome da oração..."
                      aria-label="Digite o nome da oração"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      aria-label="Buscar oração"
                    >
                      <i className="bi bi-search" aria-hidden="true" />
                    </button>
                  </div>

                  <h2 className="h6">Categorias</h2>
                  {/* !!! ESTÁTICO — categorias visuais, sem filtro !!! */}
                  <ul className="list-unstyled mb-4">
                    {categorias.map((categoria) => (
                      <li key={categoria.nome}>
                        <a
                          href="#"
                          className={`d-flex justify-content-between text-decoration-none py-2 px-2 border-start border-3 ${
                            categoria.ativa
                              ? "border-primary bg-primary-subtle"
                              : "border-light text-body"
                          }`}
                        >
                          <span>{categoria.nome}</span>
                          <span className="text-secondary">
                            {categoria.quantidade}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>

                  <h2 className="h6">Momentos</h2>
                  {/* !!! ESTÁTICO — momentos visuais, sem filtro !!! */}
                  <ul className="list-unstyled mb-4">
                    {momentos.map(([nome, quantidade]) => (
                      <li
                        key={nome}
                        className="d-flex justify-content-between align-items-center py-1"
                      >
                        <div className="form-check mb-0">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`momento-${nome}`}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`momento-${nome}`}
                          >
                            {nome}
                          </label>
                        </div>
                        <span className="text-secondary small">
                          {quantidade}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a href="#" className="btn btn-outline-primary w-100">
                    <i
                      className="bi bi-arrow-counterclockwise me-2"
                      aria-hidden="true"
                    />
                    Limpar filtros
                  </a>
                </div>
              </div>
            </aside>

            <section
              className="col-12 col-lg-9"
              aria-labelledby="titulo-listagem"
            >
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-3">
                <div>
                  <h2 id="titulo-listagem" className="h4 mb-1">
                    Todas as Orações
                  </h2>
                  {/* !!! ESTÁTICO — quantidade provisória !!! */}
                  <p className="text-secondary small mb-0">
                    32 orações encontradas
                  </p>
                </div>
                {/* !!! ESTÁTICO — ordenação visual, sem comportamento !!! */}
                <label className="d-flex align-items-center gap-2 small mb-0">
                  Ordenar por:
                  <select
                    className="form-select form-select-sm"
                    defaultValue="recentes"
                  >
                    <option value="recentes">Mais recentes</option>
                  </select>
                </label>
              </div>

              <div className="row g-4">
                {oracoes.map((oracao) => (
                  <div key={oracao.titulo} className="col-12 col-md-6 col-lg-4">
                    <article className="card h-100">
                      <div
                        className="ratio ratio-4x3 bg-secondary-subtle"
                        aria-hidden="true"
                      />
                      <div className="card-body d-flex flex-column">
                        <h3 className="h6 card-title">{oracao.titulo}</h3>
                        <p className="card-text small">{oracao.descricao}</p>
                        <p className="d-flex flex-wrap gap-1 mb-3">
                          {oracao.tags.map((tag) => (
                            <a
                              key={tag}
                              href="#"
                              className="badge rounded-pill text-bg-primary text-decoration-none fw-normal"
                            >
                              {tag}
                            </a>
                          ))}
                        </p>
                        <a href="#" className="mt-auto">
                          Ler oração
                        </a>
                      </div>
                    </article>
                  </div>
                ))}
              </div>

              {/* !!! ESTÁTICO — paginação visual, sem comportamento !!! */}
              <nav className="mt-4" aria-label="Paginação">
                <ul className="pagination justify-content-center mb-0">
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Anterior
                    </a>
                  </li>
                  <li className="page-item active" aria-current="page">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      4
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Próxima
                    </a>
                  </li>
                </ul>
              </nav>
            </section>
          </div>
        </div>
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
