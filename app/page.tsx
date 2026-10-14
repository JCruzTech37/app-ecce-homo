import Image from "next/image";
import Link from "next/link";
import bannerInferior from "@/app/bannerInferior.module.css";
import { CarrosselBannerInicial } from "@/components/CarrosselBannerInicial";
import { LogoMarca } from "@/components/LogoMarca";
import { CarrosselOracoesRelacionadas } from "@/components/CarrosselOracoesRelacionadas";
import { FormularioBuscaOracao } from "@/components/FormularioBuscaOracao";
import { Rodape } from "@/components/Rodape";
import { categoriaDestaque, oracoesEmDestaque } from "@/domain/destaques";
import { listarOracoesPublicadas } from "@/domain/oracoes";
import { oracoesRecentes } from "@/domain/oracoesRecentes";
import { hrefOracoes } from "@/lib/hrefOracoes";

export const dynamic = "force-dynamic";

export default async function Home() {
  const publicadas = await listarOracoesPublicadas();
  const paraCarrossel = (oracoes: typeof publicadas) =>
    oracoes.map((oracao) => ({
      slug: oracao.slug,
      titulo: oracao.titulo,
      descricao: oracao.descricao,
      tags: oracao.tags,
    }));
  const destaques = paraCarrossel(oracoesEmDestaque(publicadas));
  const recentes = paraCarrossel(oracoesRecentes(publicadas));
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
        <CarrosselBannerInicial />

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

        <section className="container py-5" aria-labelledby="chamada-titulo">
          <div
            className={`${bannerInferior.banner} bg-light rounded overflow-hidden`}
          >
            <div className={bannerInferior.imagem}>
              <Image
                src="/images/biblia-aberta.png"
                alt=""
                fill
                className="object-fit-cover"
                sizes="(min-width: 992px) 62vw, 100vw"
              />
            </div>
            <div className={bannerInferior.texto}>
              <h2 id="chamada-titulo" className="h4">
                APROFUNDE SUA VIDA DE ORAÇÃO
              </h2>
              <p>
                Descubra orações tradicionais, conheça novos santos e fortaleça
                sua caminhada de fé.
              </p>
              <Link href="/oracoes" className="btn btn-primary btn-ver-oracoes">
                Ver todas as orações
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Rodape />
    </>
  );
}
