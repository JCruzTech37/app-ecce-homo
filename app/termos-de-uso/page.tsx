import type { Metadata } from "next";
import Link from "next/link";
import { FormularioBuscaOracao } from "@/components/FormularioBuscaOracao";
import { LogoMarca } from "@/components/LogoMarca";
import { Rodape } from "@/components/Rodape";

export const metadata: Metadata = {
  title: "Termos de Uso — Ecce Homo",
  description:
    "Condições de uso do Ecce Homo, projeto independente de conteúdo católico.",
};

export default function PaginaTermosDeUso() {
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
        <article className="container py-5" aria-labelledby="termos-titulo">
          <header className="mb-5">
            <p className="small text-uppercase text-secondary mb-2">
              Ecce Homo
            </p>
            <h1 id="termos-titulo" className="mb-0">
              Termos de Uso
            </h1>
          </header>

          <section className="mb-5" aria-labelledby="termos-identificacao">
            <h2
              id="termos-identificacao"
              className="h4 border-start border-primary border-3 ps-2"
            >
              1. Identificação e finalidade do site
            </h2>
            <p>
              O Ecce Homo é um projeto independente de conteúdo católico. Nesta
              etapa, o site dedica-se a orações e materiais devocionais, com o
              propósito de disponibilizá-los para consulta e prática religiosa.
            </p>
            <p>
              O nome e a identidade do projeto inspiram-se na devoção ao Senhor
              Bom Jesus dos Perdões, em Bom Jesus dos Perdões, São Paulo. Essa
              referência não significa que o Ecce Homo represente oficialmente
              uma paróquia, um santuário, uma comunidade ou um movimento.
            </p>
            <p className="mb-0">
              O site pode, no futuro, reunir outros conteúdos ligados à
              evangelização e ao conhecimento da fé católica. As condições
              abaixo referem-se ao uso do site na forma em que ele estiver
              disponível.
            </p>
          </section>

          <section className="mb-5" aria-labelledby="termos-aceitacao">
            <h2
              id="termos-aceitacao"
              className="h4 border-start border-primary border-3 ps-2"
            >
              2. Aceitação dos termos
            </h2>
            <p>
              O uso do Ecce Homo implica ciência das condições apresentadas
              nesta página. A pessoa que não concordar com elas pode deixar de
              utilizar o site.
            </p>
            <p className="mb-0">
              Estas condições não valem como consentimento para coleta ou
              tratamento de dados pessoais. Assuntos dessa natureza não são
              regulados por este documento e, quando couber, serão tratados em
              informação própria.
            </p>
          </section>

          <section className="mb-5" aria-labelledby="termos-uso-conteudo">
            <h2
              id="termos-uso-conteudo"
              className="h4 border-start border-primary border-3 ps-2"
            >
              3. Uso adequado do conteúdo
            </h2>
            <p>
              O conteúdo do site pode ser consultado e utilizado para fins
              pessoais e de prática religiosa.
            </p>
            <p>
              Os materiais não têm todos a mesma origem. Orações e fórmulas
              tradicionais, assim como textos de domínio público, não são
              tratados como propriedade exclusiva do Ecce Homo. Textos de
              terceiros, como trechos bíblicos, traduções e frases atribuídas a
              santos ou a outras fontes, permanecem sujeitos aos direitos de
              seus respectivos titulares. Textos editoriais, a organização das
              páginas e outros materiais elaborados para o projeto são de
              autoria do Ecce Homo, sem prejuízo dos direitos de terceiros que
              neles apareçam.
            </p>
            <p>
              Ao utilizar qualquer material, a pessoa deve respeitar os direitos
              autorais e a atribuição da fonte, quando essa atribuição for
              exigida.
            </p>
            <p className="mb-0">
              Não é permitida a reprodução comercial, a redistribuição integral
              do conteúdo do site nem a exploração de conteúdo protegido sem a
              autorização de quem seja o titular do direito.
            </p>
          </section>

          <section className="mb-5" aria-labelledby="termos-propriedade">
            <h2
              id="termos-propriedade"
              className="h4 border-start border-primary border-3 ps-2"
            >
              4. Propriedade intelectual
            </h2>
            <p>
              O nome, a identidade visual, o logotipo, os elementos gráficos e
              os materiais autorais do Ecce Homo podem estar protegidos pela
              legislação aplicável.
            </p>
            <p className="mb-0">
              Essa proteção não retira direitos de terceiros sobre os materiais
              que lhes pertençam e não atribui ao Ecce Homo exclusividade sobre
              orações tradicionais ou textos de domínio público.
            </p>
          </section>

          <section className="mb-5" aria-labelledby="termos-precisao">
            <h2
              id="termos-precisao"
              className="h4 border-start border-primary border-3 ps-2"
            >
              5. Precisão e disponibilidade do conteúdo
            </h2>
            <p>
              O projeto procura apresentar o conteúdo com cuidado e com
              fidelidade às fontes utilizadas. Podem ocorrer erros ou
              imprecisões. Os materiais podem ser corrigidos, atualizados ou
              removidos.
            </p>
            <p className="mb-0">
              O site pode ficar indisponível em alguns momentos, por manutenção
              ou por motivo técnico. Não se promete disponibilidade
              ininterrupta nem ausência de erros.
            </p>
          </section>

          <section className="mb-5" aria-labelledby="termos-links">
            <h2
              id="termos-links"
              className="h4 border-start border-primary border-3 ps-2"
            >
              6. Links externos
            </h2>
            <p className="mb-0">
              O site pode conter links para páginas de terceiros, inclusive
              quando uma oração é compartilhada por meio de outro serviço. Cada
              destino possui as próprias condições e políticas. O Ecce Homo não
              controla esses sites.
            </p>
          </section>

          <section className="mb-5" aria-labelledby="termos-publicidade">
            <h2
              id="termos-publicidade"
              className="h4 border-start border-primary border-3 ps-2"
            >
              7. Publicidade e serviços futuros
            </h2>
            <p className="mb-0">
              A versão atual do site não exibe publicidade. No futuro, o Ecce
              Homo poderá incluir anúncios ou outros serviços. Se isso ocorrer,
              estes termos poderão ser atualizados, e as informações adicionais
              aplicáveis serão publicadas.
            </p>
          </section>

          <section className="mb-5" aria-labelledby="termos-alteracoes">
            <h2
              id="termos-alteracoes"
              className="h4 border-start border-primary border-3 ps-2"
            >
              8. Alterações destes termos
            </h2>
            <p className="mb-0">
              Este documento pode ser atualizado para acompanhar mudanças no
              site ou nas obrigações aplicáveis. A versão vigente é a que
              estiver publicada nesta página.
            </p>
          </section>

          <section className="mb-5" aria-labelledby="termos-contato">
            <h2
              id="termos-contato"
              className="h4 border-start border-primary border-3 ps-2"
            >
              9. Contato
            </h2>
            <p className="mb-0">
              Dúvidas sobre estes Termos de Uso podem ser enviadas para{" "}
              <a href="mailto:contato@portaleccehomo.com.br">
                contato@portaleccehomo.com.br
              </a>.
            </p>
          </section>

          <section aria-labelledby="termos-finais">
            <h2
              id="termos-finais"
              className="h4 border-start border-primary border-3 ps-2"
            >
              10. Disposições finais
            </h2>
            <p className="mb-0">
              Estes termos são interpretados e aplicados de acordo com a
              legislação brasileira pertinente. O que não estiver escrito aqui
              não exclui direitos nem deveres previstos em lei.
            </p>
          </section>
        </article>
      </main>

      <Rodape />
    </>
  );
}
