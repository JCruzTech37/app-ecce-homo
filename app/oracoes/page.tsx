import Image from "next/image";
import Link from "next/link";
import { OrdenacaoOracoes } from "@/components/OrdenacaoOracoes";
import { listarOracoesPublicadas } from "@/domain/oracoes";
import type { Oracao } from "@/types/oracao";

const tamanhoPagina = 9;
const tamanhoJanela = 5;

function caminhoImagemPublica(referencia: string): string {
  if (referencia.startsWith("public/")) {
    return `/${referencia.slice("public/".length)}`;
  }

  return referencia;
}

function paginaSolicitada(
  valor: string | string[] | undefined,
  totalPaginas: number,
): number {
  const texto = Array.isArray(valor) ? valor[0] : valor;
  const numero = Number(texto);

  if (!texto || !Number.isInteger(numero) || numero < 1) {
    return 1;
  }

  if (totalPaginas < 1) {
    return 1;
  }

  return Math.min(numero, totalPaginas);
}

function janelaDePaginas(atual: number, total: number): number[] {
  if (total < 1) {
    return [];
  }

  const quantidade = Math.min(tamanhoJanela, total);
  let inicio = atual - Math.floor(tamanhoJanela / 2);

  if (inicio < 1) {
    inicio = 1;
  }

  if (inicio + quantidade - 1 > total) {
    inicio = total - quantidade + 1;
  }

  return Array.from({ length: quantidade }, (_, indice) => inicio + indice);
}

type Ordenacao = "recentes" | "antigas" | "az" | "za";

function textoParametro(valor: string | string[] | undefined): string | undefined {
  return Array.isArray(valor) ? valor[0] : valor;
}

function ordenacaoSolicitada(valor: string | string[] | undefined): Ordenacao {
  const texto = textoParametro(valor);

  if (texto === "antigas" || texto === "az" || texto === "za" || texto === "recentes") {
    return texto;
  }

  return "recentes";
}

function ordenarOracoes(lista: Oracao[], ordem: Ordenacao): Oracao[] {
  return [...lista].sort((a, b) => {
    if (ordem === "az" || ordem === "za") {
      const titulos = a.titulo.localeCompare(b.titulo, "pt");
      return ordem === "az" ? titulos : -titulos;
    }

    const datas = a.createdAt.localeCompare(b.createdAt);
    return ordem === "antigas" ? datas : -datas;
  });
}

function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLocaleLowerCase("pt")
    .replace(/\s+/g, " ")
    .trim();
}

function palavrasDaBusca(busca: string): string[] {
  return normalizar(busca).split(" ").filter((palavra) => palavra.length > 0);
}

function relevancia(titulo: string, busca: string, palavras: string[]): number {
  const tituloNormalizado = normalizar(titulo);

  if (tituloNormalizado === normalizar(busca)) {
    return 0;
  }

  if (palavras.every((palavra) => tituloNormalizado.includes(palavra))) {
    return 1;
  }

  if (palavras.some((palavra) => tituloNormalizado.includes(palavra))) {
    return 2;
  }

  return 3;
}

function filtrarPorTitulo(lista: Oracao[], busca: string): Oracao[] {
  const palavras = palavrasDaBusca(busca);

  if (palavras.length === 0) {
    return lista;
  }

  return lista.filter((oracao) => relevancia(oracao.titulo, busca, palavras) < 3);
}

function ordenarBusca(lista: Oracao[], busca: string, ordem: Ordenacao): Oracao[] {
  const palavras = palavrasDaBusca(busca);

  if (palavras.length === 0) {
    return ordenarOracoes(lista, ordem);
  }

  const grupos = [0, 1, 2].map((nivel) =>
    ordenarOracoes(
      lista.filter((oracao) => relevancia(oracao.titulo, busca, palavras) === nivel),
      ordem,
    ),
  );

  return grupos.flat();
}

function hrefPagina(pagina: number, ordem: Ordenacao, busca: string): string {
  const params = new URLSearchParams();

  if (busca) {
    params.set("busca", busca);
  }

  if (ordem !== "recentes") {
    params.set("ordem", ordem);
  }

  if (pagina > 1) {
    params.set("pagina", String(pagina));
  }

  const consulta = params.toString();
  return consulta ? `/oracoes?${consulta}` : "/oracoes";
}

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

export default async function PaginaOracoes(props: PageProps<"/oracoes">) {
  const {
    pagina: paginaInformada,
    ordem: ordemInformada,
    busca: buscaInformada,
  } = await props.searchParams;
  const ordem = ordenacaoSolicitada(ordemInformada);
  const busca = (textoParametro(buscaInformada) ?? "").trim().slice(0, 50);
  const publicadas = await listarOracoesPublicadas();
  const encontradas = filtrarPorTitulo(publicadas, busca);
  const oracoes = ordenarBusca(encontradas, busca, ordem);
  const totalPaginas = Math.ceil(oracoes.length / tamanhoPagina);
  const pagina = paginaSolicitada(paginaInformada, totalPaginas);
  const inicio = (pagina - 1) * tamanhoPagina;
  const paginaAtual = oracoes.slice(inicio, inicio + tamanhoPagina);
  const paginasVisiveis = janelaDePaginas(pagina, totalPaginas);

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
                  <form action="/oracoes" method="get" className="mb-4">
                    {ordem !== "recentes" ? (
                      <input type="hidden" name="ordem" value={ordem} />
                    ) : null}
                    <div className="input-group">
                      <input
                        type="search"
                        name="busca"
                        className="form-control"
                        placeholder="Digite o nome da oração..."
                        aria-label="Digite o nome da oração"
                        maxLength={50}
                        defaultValue={busca}
                      />
                      <button
                        type="submit"
                        className="btn btn-outline-secondary"
                        aria-label="Buscar oração"
                      >
                        <i className="bi bi-search" aria-hidden="true" />
                      </button>
                    </div>
                  </form>

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
                  <p className="text-secondary small mb-0">
                    {oracoes.length === 1
                      ? "1 oração encontrada"
                      : `${oracoes.length} orações encontradas`}
                  </p>
                </div>
                <OrdenacaoOracoes valor={ordem} busca={busca} />
              </div>

              {paginaAtual.length === 0 ? (
                busca ? (
                  <div>
                    <p className="mb-1">Nenhuma oração encontrada</p>
                    <p className="text-secondary mb-0">
                      Não encontramos nenhuma oração com esse título.
                    </p>
                  </div>
                ) : (
                  <p className="text-secondary mb-0">Nenhuma oração cadastrada.</p>
                )
              ) : (
                <div className="row g-4">
                  {paginaAtual.map((oracao) => (
                    <div key={oracao.id} className="col-12 col-md-6 col-lg-4">
                      <article className="card h-100">
                        <div className="ratio ratio-4x3 bg-secondary-subtle">
                          <Image
                            src={caminhoImagemPublica(oracao.imagemVertical)}
                            alt={oracao.textoAlternativo}
                            fill
                            className="object-fit-cover"
                            sizes="(min-width: 992px) 280px, (min-width: 768px) 50vw, 100vw"
                          />
                        </div>
                        <div className="card-body d-flex flex-column">
                          <h3 className="h6 card-title">{oracao.titulo}</h3>
                          {oracao.descricao ? (
                            <p className="card-text small">{oracao.descricao}</p>
                          ) : null}
                          <p className="d-flex flex-wrap gap-1 mb-3">
                            {oracao.tags.map((tag) => (
                              <span
                                key={tag}
                                className="badge rounded-pill text-bg-primary fw-normal"
                              >
                                {tag}
                              </span>
                            ))}
                          </p>
                          <Link
                            href={`/oracoes/${oracao.slug}`}
                            className="mt-auto"
                          >
                            Ler oração
                          </Link>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              )}

              {totalPaginas > 0 ? (
                <nav className="mt-4" aria-label="Paginação">
                  <ul className="pagination justify-content-center mb-0">
                    <li
                      className={`page-item${pagina === 1 ? " disabled" : ""}`}
                    >
                      {pagina === 1 ? (
                        <span className="page-link">Anterior</span>
                      ) : (
                        <Link
                          className="page-link"
                          href={hrefPagina(pagina - 1, ordem, busca)}
                        >
                          Anterior
                        </Link>
                      )}
                    </li>
                    {paginasVisiveis.map((numero) => (
                      <li
                        key={numero}
                        className={`page-item${numero === pagina ? " active" : ""}`}
                        aria-current={numero === pagina ? "page" : undefined}
                      >
                        <Link
                          className="page-link"
                          href={hrefPagina(numero, ordem, busca)}
                        >
                          {numero}
                        </Link>
                      </li>
                    ))}
                    <li
                      className={`page-item${pagina === totalPaginas ? " disabled" : ""}`}
                    >
                      {pagina === totalPaginas ? (
                        <span className="page-link">Próxima</span>
                      ) : (
                        <Link
                          className="page-link"
                          href={hrefPagina(pagina + 1, ordem, busca)}
                        >
                          Próxima
                        </Link>
                      )}
                    </li>
                  </ul>
                </nav>
              ) : null}
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
