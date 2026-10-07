import Link from "next/link";
import { LogoRodape } from "@/components/LogoRodape";
import { categoriasPorQuantidade } from "@/domain/categoriasOracoes";
import { categoriaDestaque } from "@/domain/destaques";
import { listarOracoesPublicadas } from "@/domain/oracoes";
import { hrefOracoes } from "@/lib/hrefOracoes";

const limiteCategoriasRodape = 6;

export async function Rodape() {
  const publicadas = await listarOracoesPublicadas();
  const categorias = categoriasPorQuantidade(publicadas)
    .filter((item) => item.slug !== categoriaDestaque)
    .slice(0, limiteCategoriasRodape);

  return (
    <footer className="border-top bg-light">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-12 col-md-6 col-lg-3">
            <LogoRodape />
            <p className="small mb-0">
              {'"Jesus Cristo é o Senhor!, para a glória de Deus Pai."'} <br />
              {"Filipenses 2:11"}
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
              <Link href="/sobre" className="link-secondary small">
                Sobre
              </Link>
              <Link href="/sobre#contato" className="link-secondary small">
                Contato
              </Link>
            </nav>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <h2 className="h6">Categorias</h2>
            <nav
              aria-label="Categorias do rodapé"
              className="d-flex flex-column gap-1"
            >
              {categorias.map((categoria) => (
                <Link
                  key={categoria.slug}
                  href={hrefOracoes({ categoria: categoria.slug })}
                  className="link-secondary small"
                >
                  {categoria.slug}
                </Link>
              ))}
            </nav>
          </div>
          <div className="col-12 col-md-6 col-lg-3 opacity-75">
            <h2 className="h6">
              Receba novas orações <span className="fw-normal">(em breve)</span>
            </h2>
            <p className="small">
              Cadastre seu e-mail e receba novos conteúdos do Ecce Homo.
            </p>
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Seu e-mail"
                aria-label="Seu e-mail"
                disabled
              />
              <button type="button" className="btn btn-primary" disabled>
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
  );
}
