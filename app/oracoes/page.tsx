import Image from "next/image";
import Link from "next/link";
import { CardOracao } from "@/components/CardOracao";
import { FormularioBuscaOracao } from "@/components/FormularioBuscaOracao";
import { LogoMarca } from "@/components/LogoMarca";
import styles from "./oracoes.module.css";
import { OrdenacaoOracoes } from "@/components/OrdenacaoOracoes";
import { PainelFiltrosOracoes } from "@/components/PainelFiltrosOracoes";
import { categoriasPorQuantidade } from "@/domain/categoriasOracoes";
import { categoriaDestaque, ehDestaque } from "@/domain/destaques";
import { listarOracoesPublicadas } from "@/domain/oracoes";
import { idListaOracoes } from "@/lib/ancoraListaOracoes";
import { hrefOracao, hrefOracoes } from "@/lib/hrefOracoes";
import type { Oracao } from "@/types/oracao";
import { Rodape } from "@/components/Rodape";

const tamanhoPagina = 9;
const tamanhoJanela = 5;

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

function textoParametro(
  valor: string | string[] | undefined,
): string | undefined {
  return Array.isArray(valor) ? valor[0] : valor;
}

function ordenacaoSolicitada(valor: string | string[] | undefined): Ordenacao {
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
  return normalizar(busca)
    .split(" ")
    .filter((palavra) => palavra.length > 0);
}

function relevancia(
  oracao: Oracao,
  busca: string,
  palavras: string[],
): number {
  const tituloNormalizado = normalizar(oracao.titulo);

  if (tituloNormalizado === normalizar(busca)) {
    return 0;
  }

  if (palavras.every((palavra) => tituloNormalizado.includes(palavra))) {
    return 1;
  }

  if (palavras.some((palavra) => tituloNormalizado.includes(palavra))) {
    return 2;
  }

  const categorias = oracao.tags.map(normalizar);
  const naCategoria = (palavra: string) =>
    categorias.some((tag) => tag.includes(palavra));

  if (palavras.every(naCategoria)) {
    return 3;
  }

  if (palavras.some(naCategoria)) {
    return 4;
  }

  return 5;
}

function filtrarPorBusca(lista: Oracao[], busca: string): Oracao[] {
  const palavras = palavrasDaBusca(busca);

  if (palavras.length === 0) {
    return lista;
  }

  return lista.filter((oracao) => relevancia(oracao, busca, palavras) < 5);
}

function ordenarBusca(
  lista: Oracao[],
  busca: string,
  ordem: Ordenacao,
): Oracao[] {
  const palavras = palavrasDaBusca(busca);

  if (palavras.length === 0) {
    return ordenarOracoes(lista, ordem);
  }

  const grupos = [0, 1, 2, 3, 4].map((nivel) =>
    ordenarOracoes(
      lista.filter((oracao) => relevancia(oracao, busca, palavras) === nivel),
      ordem,
    ),
  );

  return grupos.flat();
}

export default async function PaginaOracoes(props: PageProps<"/oracoes">) {
  const {
    pagina: paginaInformada,
    ordem: ordemInformada,
    busca: buscaInformada,
    categoria: categoriaInformada,
  } = await props.searchParams;
  const ordem = ordenacaoSolicitada(ordemInformada);
  const busca = (textoParametro(buscaInformada) ?? "").trim().slice(0, 50);
  const publicadas = await listarOracoesPublicadas();
  const correspondentes = filtrarPorBusca(publicadas, busca);
  const categoriasCatalogo = categoriasPorQuantidade(publicadas).filter(
    (item) => item.slug !== categoriaDestaque,
  );
  const quantidadesDaBusca = new Map(
    categoriasPorQuantidade(correspondentes).map((item) => [
      item.slug,
      item.quantidade,
    ]),
  );
  const categorias = categoriasCatalogo.map((item) => ({
    slug: item.slug,
    quantidade: quantidadesDaBusca.get(item.slug) ?? 0,
  }));
  const quantidadeDestaques = correspondentes.filter(ehDestaque).length;
  const categoriaSolicitada = (textoParametro(categoriaInformada) ?? "").trim();
  const categoria =
    categoriaSolicitada === categoriaDestaque ||
    categoriasCatalogo.some((item) => item.slug === categoriaSolicitada)
      ? categoriaSolicitada
      : "";
  const encontradas = correspondentes.filter((oracao) => {
    if (!categoria) {
      return true;
    }

    if (categoria === categoriaDestaque) {
      return ehDestaque(oracao);
    }

    return oracao.tags.includes(categoria);
  });
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
                <LogoMarca priority />
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
              <FormularioBuscaOracao
                valor={busca}
                ordem={ordem}
                categoria={categoria}
              />
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="border-bottom">
          <div className="container">
            <div className={styles.banner}>
              <Image
                src="/images/virgem-maria-em-oracao.png"
                alt=""
                width={1998}
                height={787}
                priority
                sizes="(min-width: 1400px) 1296px, (min-width: 1200px) 1116px, (min-width: 992px) 936px, 100vw"
                className={styles.imagem}
              />
              <div className={styles.texto}>
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
            </div>
          </div>
        </section>

        <div className="container py-4">
          <div className="row g-4">
            <aside className="col-12 col-lg-3">
              <PainelFiltrosOracoes
                busca={busca}
                ordem={ordem}
                categoria={categoria}
                total={publicadas.length}
                categorias={categorias}
                quantidadeDestaques={quantidadeDestaques}
                quantidadeResultados={oracoes.length}
              />
            </aside>

            <section
              id={idListaOracoes}
              className={`col-12 col-lg-9 ${styles.lista}`}
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
                <OrdenacaoOracoes
                  valor={ordem}
                  busca={busca}
                  categoria={categoria}
                />
              </div>

              {paginaAtual.length === 0 ? (
                busca ? (
                  <div>
                    <p className="mb-1">Nenhuma oração encontrada</p>
                    <p className="text-secondary mb-0">
                      Não encontramos nenhuma oração para essa busca.
                    </p>
                  </div>
                ) : categoria ? (
                  <p className="mb-0">
                    Nenhuma oração encontrada nesta categoria.
                  </p>
                ) : (
                  <p className="text-secondary mb-0">
                    Nenhuma oração cadastrada.
                  </p>
                )
              ) : (
                <div id="grade-oracoes" className="row g-4">
                  {paginaAtual.map((oracao) => {
                    const destino = hrefOracao(oracao.slug, {
                      busca,
                      ordem,
                      categoria,
                    });

                    return (
                      <div key={oracao.id} className="col-12 col-md-6 col-lg-4">
                        <CardOracao
                          titulo={oracao.titulo}
                          descricao={oracao.descricao}
                          tags={oracao.tags}
                          href={destino}
                        />
                      </div>
                    );
                  })}
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
                          href={hrefOracoes({
                            pagina: pagina - 1,
                            ordem,
                            busca,
                            categoria,
                          })}
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
                          href={hrefOracoes({
                            pagina: numero,
                            ordem,
                            busca,
                            categoria,
                          })}
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
                          href={hrefOracoes({
                            pagina: pagina + 1,
                            ordem,
                            busca,
                            categoria,
                          })}
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

      <Rodape />
    </>
  );
}
