import Link from "next/link";
import { FormularioBuscaOracao } from "@/components/FormularioBuscaOracao";
import { LogoMarca } from "@/components/LogoMarca";
import { Rodape } from "@/components/Rodape";

export default function PaginaNaoEncontrada() {
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
                className="link-secondary text-decoration-none"
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
        <div className="bg-light py-5" aria-hidden="true">
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
                <Link href="/oracoes" className="btn btn-outline-primary btn-ver-oracoes">
                  <i className="bi bi-book me-2" aria-hidden="true" />
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
