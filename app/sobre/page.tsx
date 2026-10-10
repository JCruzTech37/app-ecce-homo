import Image from "next/image";
import Link from "next/link";
import imagemBanner from "../../docs/layout/banner-sobre-o-que-e-a-verdade.png";
import { CitacaoBiblica } from "@/components/CitacaoBiblica";
import { CopiarContato } from "@/components/CopiarContato";
import { FormularioBuscaOracao } from "@/components/FormularioBuscaOracao";
import { LogoMarca } from "@/components/LogoMarca";
import { Rodape } from "@/components/Rodape";
import stylesBomJesus from "@/app/sobre/imagemBomJesus.module.css";

export default function PaginaSobre() {
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
                className="link-primary fw-semibold text-decoration-none"
                aria-current="page"
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
        <section
          className="bg-light border-bottom"
          aria-labelledby="pilatos-titulo"
        >
          <div className="container py-5">
            <p className="small text-uppercase text-secondary mb-2">
              Sobre o Ecce Homo
            </p>
            <h1 id="pilatos-titulo" className="mb-4">
              Jesus diante de Pilatos
            </h1>
            <Image
              src={imagemBanner}
              alt="Jesus diante de Pilatos"
              priority
              sizes="(min-width: 1200px) 1140px, 100vw"
              className="d-block w-100 h-auto"
            />
          </div>
        </section>

        <section
          className="container py-5 border-bottom"
          aria-labelledby="o-que-e"
        >
          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-7">
              <h2
                id="o-que-e"
                className="h4 border-start border-primary border-3 ps-2"
              >
                1. O que é o Ecce Homo?
              </h2>
              <p>
                O Ecce Homo é um projeto dedicado a conteúdo católico. Começa
                com orações e novenas e, no futuro, poderá reunir leituras,
                catequese, liturgia e outros conteúdos. Quer ser acessível a
                quem procura uma vida de oração e deseja conhecer e praticar a
                fé.
              </p>
              <p>
                O nome vem da expressão “Ecce Homo”, dita por Pilatos ao
                apresentar Jesus. A pergunta “O que é a verdade?” está ligada à
                identidade e ao propósito do projeto. Cristo é apresentado como
                a resposta, conforme João 14,6.
              </p>
              <p className="mb-0">
                O projeto nasceu em Bom Jesus dos Perdões, São Paulo. A devoção
                ao Senhor Bom Jesus dos Perdões e a imagem do Ecce Homo venerada
                no Santuário inspiram o nome e a identidade do site.
              </p>
            </div>
            <div className="col-12 col-lg-5">
              <Image
                src="/images/senhor-bom-jesus.jpeg"
                alt="Senhor Bom Jesus dos Perdões"
                width={447}
                height={447}
                sizes="(min-width: 992px) 42vw, 100vw"
                className={stylesBomJesus.imagem}
              />
              <h3 className="h6 mt-3">O Bom Jesus dos Perdões</h3>
              <p className="small text-secondary mb-0">
                Espaço reservado para a imagem do Senhor Bom Jesus dos Perdões,
                venerada no Santuário e inspiração do nome do site.
              </p>
            </div>
          </div>
        </section>

        <section
          className="container py-5 border-bottom"
          aria-labelledby="proposito"
        >
          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-5">
              <CitacaoBiblica referencia="1Pedro 3,15">
                Antes, santificai o Senhor Jesus Cristo em vossos corações e
                estai sempre prontos a dar a razão da vossa esperança a todo
                aquele que a pedir.
              </CitacaoBiblica>
            </div>
            <div className="col-12 col-lg-7">
              <h2
                id="proposito"
                className="h4 border-start border-primary border-3 ps-2"
              >
                2. Qual é o propósito do site?
              </h2>
              <p>
                O projeto começa como um espaço para compartilhar orações e
                novenas. Pretende crescer de maneira constante e poderá reunir
                diferentes conteúdos que contribuam para a evangelização.
              </p>
              <p className="mb-0">
                Busca auxiliar na vida de oração e contribuir para um maior
                conhecimento da fé católica.
              </p>
            </div>
          </div>
        </section>

        <section
          id="contato"
          className="container py-5 border-bottom"
          aria-labelledby="contato-titulo"
        >
          <h2
            id="contato-titulo"
            className="h4 border-start border-primary border-3 ps-2"
          >
            3. Como posso entrar em contato?
          </h2>
          <p>Para falar com o Ecce Homo, use o e-mail de contato.</p>
          <CopiarContato />
        </section>

        <section className="container py-4">
          <nav
            aria-label="Informações da página"
            className="d-flex flex-wrap gap-3"
          >
            <Link href="/privacidade" className="link-secondary">
              Política de Privacidade
            </Link>
            <Link href="/termos-de-uso" className="link-secondary">
              Termos de Uso
            </Link>
          </nav>
        </section>
      </main>

      <Rodape />
    </>
  );
}
