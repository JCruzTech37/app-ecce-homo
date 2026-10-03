import Link from "next/link";
import { FormularioBuscaOracao } from "@/components/FormularioBuscaOracao";
import { Rodape } from "@/components/Rodape";

function Placeholder({ texto }: { texto: string }) {
  return (
    <div className="ratio ratio-4x3 bg-secondary-subtle rounded">
      <p className="d-flex align-items-center justify-content-center text-center text-secondary small p-3 mb-0">
        {texto}
      </p>
    </div>
  );
}

export default function PaginaSobre() {
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
            <div className="row g-4 align-items-start">
              <div className="col-12 col-lg-8">
                <p className="small text-uppercase text-secondary mb-2">
                  Sobre o Ecce Homo
                </p>
                <h1 id="pilatos-titulo" className="display-6 fw-semibold">
                  Jesus diante de Pilatos
                </h1>
                <p className="fw-semibold">João 18, 33–38</p>
                <p className="border rounded bg-white p-3 mb-4">
                  [PLACEHOLDER — TRECHO BÍBLICO JOÃO 18, 33–38]
                </p>
                <p className="h4 fst-italic text-primary border-start border-primary border-3 ps-3 mb-0">
                  O que é a verdade?
                </p>
              </div>
              <div className="col-12 col-lg-4">
                <Placeholder texto="[PLACEHOLDER — IMAGEM JESUS DIANTE DE PILATOS]" />
              </div>
            </div>
          </div>
        </section>

        <section
          className="container py-5 border-bottom"
          aria-labelledby="o-que-e"
        >
          <div className="row g-4 align-items-start">
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
              <Placeholder texto="[PLACEHOLDER — IMAGEM DO SENHOR BOM JESUS DOS PERDÕES]" />
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
          <div className="row g-4 align-items-start">
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
            <div className="col-12 col-lg-5">
              <blockquote className="bg-light rounded p-4 mb-0">
                <i
                  className="bi bi-quote fs-3 text-secondary"
                  aria-hidden="true"
                />
                <p className="fst-italic mb-3">
                  [PLACEHOLDER — TRECHO BÍBLICO 1PEDRO 3,15]
                </p>
                <footer className="blockquote-footer mb-0">1Pedro 3,15</footer>
              </blockquote>
            </div>
          </div>
        </section>

        <section
          className="container py-5 border-bottom"
          aria-labelledby="pertence"
        >
          <h2
            id="pertence"
            className="h4 border-start border-primary border-3 ps-2"
          >
            3. O Ecce Homo pertence a alguma paróquia, comunidade ou movimento?
          </h2>
          <p>
            O Ecce Homo é um projeto independente. Não é o site oficial de uma
            paróquia, comunidade ou movimento.
          </p>
          <p className="mb-0">
            Seu criador participa da vida de fé e frequenta o Santuário do
            Senhor Bom Jesus dos Perdões, em Bom Jesus dos Perdões, São Paulo. O
            nome do site é uma homenagem inspirada na imagem do Santuário. O
            projeto não representa oficialmente o Santuário nem a paróquia. É
            uma demonstração pessoal de gratidão e devoção.
          </p>
        </section>

        <section
          className="container py-5 border-bottom"
          aria-labelledby="quem-mantem"
        >
          <h2
            id="quem-mantem"
            className="h4 border-start border-primary border-3 ps-2"
          >
            4. Quem mantém o site Ecce Homo?
          </h2>
          <p>
            O Ecce Homo é uma iniciativa independente, criado e desenvolvido
            pelo seu próprio desenvolvedor. Há uma motivação pessoal ligada a
            uma promessa feita à Virgem Maria: utilizar conhecimentos de
            tecnologia para criar um projeto voltado à fé. O Ecce Homo une,
            portanto, fé e tecnologia.
          </p>
          <div className="row g-3 align-items-center">
            <div className="col-12 col-sm-4 col-lg-3">
              <Placeholder texto="[PLACEHOLDER — LOGO JCruz SOLUÇÕES TECH]" />
            </div>
            <div className="col-12 col-sm-8 col-lg-9">
              <h3 className="h6">JCruz Soluções Tech</h3>
              <p className="small mb-3">
                Espaço reservado para uma breve apresentação da JCruz Soluções
                Tech, ligada ao desenvolvimento técnico do projeto.
              </p>
              <span
                className="btn btn-outline-primary disabled"
                aria-disabled="true"
              >
                Conheça nossos projetos
              </span>
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
            5. Como posso entrar em contato?
          </h2>
          <p>
            Para falar com o Ecce Homo, use o e-mail de contato. O endereço
            definitivo ainda não foi definido.
          </p>
          <p className="border rounded bg-light p-3 mb-0">
            [PLACEHOLDER — E-MAIL DE CONTATO]
          </p>
        </section>

        <section className="container py-4">
          <nav
            aria-label="Informações da página"
            className="d-flex flex-wrap gap-3"
          >
            <Link href="/404" className="link-secondary">
              Política de Privacidade
            </Link>
            <Link href="/404" className="link-secondary">
              Termos de Uso
            </Link>
          </nav>
        </section>
      </main>

      <Rodape />
    </>
  );
}
