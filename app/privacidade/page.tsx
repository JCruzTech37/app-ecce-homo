import type { Metadata } from "next";
import Link from "next/link";
import { FormularioBuscaOracao } from "@/components/FormularioBuscaOracao";
import { LogoMarca } from "@/components/LogoMarca";
import { Rodape } from "@/components/Rodape";

export const metadata: Metadata = {
  title: "Política de Privacidade — Ecce Homo",
  description:
    "Como o Ecce Homo trata informações relacionadas à navegação e à privacidade dos visitantes.",
};

export default function PaginaPrivacidade() {
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
        <article
          className="container py-5"
          aria-labelledby="privacidade-titulo"
        >
          <header className="mb-5">
            <p className="small text-uppercase text-secondary mb-2">
              Ecce Homo
            </p>
            <h1 id="privacidade-titulo" className="mb-0">
              Política de Privacidade
            </h1>
            <p className="mt-4">
              O Ecce Homo respeita a privacidade dos visitantes e busca tratar
              informações pessoais com transparência, responsabilidade e
              respeito à legislação aplicável.
            </p>
            <p className="mb-0">
              Esta Política de Privacidade explica as práticas relacionadas à
              navegação no site, aos recursos disponíveis e às possíveis
              alterações futuras. Seu objetivo é informar quais dados podem ser
              tratados, para quais finalidades e quais são os direitos dos
              titulares.
            </p>
          </header>

          <section className="mb-5" aria-labelledby="privacidade-sobre">
            <h2
              id="privacidade-sobre"
              className="h4 border-start border-primary border-3 ps-2"
            >
              1. Sobre o Ecce Homo
            </h2>
            <p>
              O Ecce Homo é um projeto independente de conteúdo católico,
              inicialmente dedicado à disponibilização de orações e materiais
              devocionais.
            </p>
            <p className="mb-0">
              O site busca oferecer um espaço de consulta e aprofundamento da
              vida de oração. Sua utilização pública não exige a criação de uma
              conta ou a realização de cadastro.
            </p>
          </section>

          <section className="mb-5" aria-labelledby="privacidade-dados">
            <h2
              id="privacidade-dados"
              className="h4 border-start border-primary border-3 ps-2"
            >
              2. Quais dados pessoais coletamos?
            </h2>
            <p>
              Na versão atual, o Ecce Homo não oferece cadastro de usuários nem
              exige que o visitante forneça dados pessoais para consultar as
              orações e os demais conteúdos públicos.
            </p>
            <p>
              Entretanto, a navegação na internet pode envolver o tratamento de
              informações técnicas, inclusive por serviços de hospedagem e
              infraestrutura necessários ao funcionamento do site. Dependendo da
              configuração desses serviços, essas informações podem incluir
              endereço IP, data e horário do acesso, páginas requisitadas,
              informações sobre o navegador e registros técnicos de segurança.
            </p>
            <p>
              A existência, a extensão e o período de retenção desses registros
              dependem dos serviços efetivamente utilizados e de suas
              configurações. Não afirmamos que essas informações sejam coletadas
              ou armazenadas pelo Ecce Homo de forma direta sem que isso tenha
              sido verificado.
            </p>
            <p className="mb-0">
              O Ecce Homo não deve ser considerado livre de qualquer tratamento
              de dados pessoais apenas porque não exige cadastro.
            </p>
          </section>

          <section className="mb-5" aria-labelledby="privacidade-finalidades">
            <h2
              id="privacidade-finalidades"
              className="h4 border-start border-primary border-3 ps-2"
            >
              3. Para quais finalidades os dados podem ser tratados?
            </h2>
            <p>
              Quando houver tratamento de informações pessoais ou técnicas
              relacionadas à navegação, ele deverá estar associado a finalidades
              legítimas e compatíveis com o funcionamento do site, como:
            </p>
            <ul>
              <li>Disponibilizar as páginas e os conteúdos solicitados.</li>
              <li>
                Manter a estabilidade, a integridade e a segurança do serviço.
              </li>
              <li>
                Identificar e investigar falhas técnicas ou tentativas de uso
                indevido, quando aplicável.
              </li>
              <li className="mb-3">
                Cumprir obrigações legais ou atender a solicitações legítimas de
                autoridades competentes, quando cabível.
              </li>
            </ul>
            <p className="mb-0">
              Os dados não deverão ser utilizados para finalidades incompatíveis
              com aquelas informadas, observadas as hipóteses legais aplicáveis.
            </p>
          </section>

          <section className="mb-5" aria-labelledby="privacidade-cookies">
            <h2
              id="privacidade-cookies"
              className="h4 border-start border-primary border-3 ps-2"
            >
              4. Cookies e tecnologias semelhantes
            </h2>
            <p>
              Cookies são pequenos arquivos que podem ser armazenados no
              dispositivo do visitante. Dependendo de sua finalidade, podem ser
              utilizados para viabilizar funcionalidades, manter preferências,
              medir audiência ou oferecer publicidade.
            </p>
            <p>
              A utilização efetiva dessas tecnologias no Ecce Homo depende da
              implementação técnica existente em cada momento.
            </p>
            <p>
              Não presumimos a existência de cookies de publicidade, ferramentas
              de análise de audiência ou mecanismos de rastreamento que não
              tenham sido confirmados no projeto.
            </p>
            <p>
              Caso sejam implementados cookies ou tecnologias semelhantes que
              envolvam tratamento de dados pessoais, as informações pertinentes
              deverão ser disponibilizadas de forma clara, incluindo suas
              finalidades, categorias, condições de utilização e, quando
              aplicável, os mecanismos de escolha do visitante.
            </p>
            <p className="mb-0">
              Quando exigido pela legislação aplicável, tecnologias que dependam
              de consentimento deverão respeitar os requisitos legais
              correspondentes.
            </p>
          </section>

          <section
            className="mb-5"
            aria-labelledby="privacidade-compartilhamento"
          >
            <h2
              id="privacidade-compartilhamento"
              className="h4 border-start border-primary border-3 ps-2"
            >
              5. Compartilhamento de dados
            </h2>
            <p>
              O Ecce Homo não deve compartilhar dados pessoais com terceiros
              para finalidades comerciais sem uma base legal adequada e as
              informações necessárias ao titular.
            </p>
            <p>
              Determinados dados técnicos poderão ser tratados por prestadores
              de serviços necessários à operação, à hospedagem ou à segurança do
              site, conforme os serviços efetivamente utilizados e as condições
              aplicáveis.
            </p>
            <p>
              Também poderá haver tratamento ou compartilhamento quando
              necessário para cumprir obrigação legal, atender determinação
              legítima de autoridade competente ou exercer direitos nos termos
              da legislação.
            </p>
            <p className="mb-0">
              A existência de um prestador de infraestrutura não significa, por
              si só, que todos os dados de navegação sejam compartilhados com
              ele para qualquer finalidade. O tratamento depende da configuração
              e do serviço utilizado.
            </p>
          </section>

          <section className="mb-5" aria-labelledby="privacidade-terceiros">
            <h2
              id="privacidade-terceiros"
              className="h4 border-start border-primary border-3 ps-2"
            >
              6. Links e serviços de terceiros
            </h2>
            <p>
              O site poderá disponibilizar links para serviços externos. Por
              exemplo, quando o visitante escolhe compartilhar uma oração pelo
              WhatsApp, a interação poderá levá-lo a um serviço de terceiro.
            </p>
            <p>
              A partir do momento em que o visitante acessa ou utiliza um
              serviço externo, o tratamento de dados passa a depender também das
              práticas e políticas do respectivo fornecedor.
            </p>
            <p className="mb-0">
              O Ecce Homo não controla integralmente os ambientes externos e
              recomenda que o visitante consulte as políticas dos serviços que
              decidir utilizar.
            </p>
          </section>

          <section className="mb-5" aria-labelledby="privacidade-publicidade">
            <h2
              id="privacidade-publicidade"
              className="h4 border-start border-primary border-3 ps-2"
            >
              7. Publicidade e funcionalidades futuras
            </h2>
            <p>
              A versão atual do site não deve ser descrita como se já utilizasse
              publicidade ou rastreamento publicitário caso esses recursos não
              estejam implementados.
            </p>
            <p>
              Futuramente, o Ecce Homo poderá incluir anúncios ou outros
              recursos destinados à manutenção do projeto.
            </p>
            <p>
              Se isso ocorrer, esta Política de Privacidade deverá ser revisada
              para refletir as práticas efetivamente adotadas, incluindo, quando
              aplicável, informações sobre fornecedores, dados tratados,
              finalidades, cookies e mecanismos de escolha do visitante.
            </p>
            <p className="mb-0">
              A implementação de novas funcionalidades deverá considerar as
              exigências legais aplicáveis antes de sua disponibilização.
            </p>
          </section>

          <section className="mb-5" aria-labelledby="privacidade-seguranca">
            <h2
              id="privacidade-seguranca"
              className="h4 border-start border-primary border-3 ps-2"
            >
              8. Segurança das informações
            </h2>
            <p>
              O Ecce Homo busca adotar medidas técnicas e organizacionais
              compatíveis com a natureza do projeto para proteger informações
              contra acessos não autorizados, perda, alteração ou utilização
              indevida.
            </p>
            <p>
              Nenhum sistema conectado à internet pode ter sua segurança
              garantida de forma absoluta. Por isso, as medidas de proteção
              devem ser continuamente avaliadas e ajustadas conforme as
              necessidades do serviço.
            </p>
            <p className="mb-0">
              Esta declaração não representa uma garantia de segurança absoluta
              nem substitui a avaliação das medidas efetivamente implementadas.
            </p>
          </section>

          <section className="mb-5" aria-labelledby="privacidade-retencao">
            <h2
              id="privacidade-retencao"
              className="h4 border-start border-primary border-3 ps-2"
            >
              9. Por quanto tempo os dados são mantidos?
            </h2>
            <p>
              O período de retenção depende da natureza da informação, da
              finalidade do tratamento, das configurações dos serviços
              utilizados e das obrigações legais aplicáveis.
            </p>
            <p>
              Quando houver registros técnicos mantidos por serviços de
              infraestrutura, os prazos deverão ser verificados de acordo com as
              políticas e configurações correspondentes.
            </p>
            <p className="mb-0">
              Os dados pessoais não deverão ser mantidos por período superior ao
              necessário para a finalidade que justificou seu tratamento,
              ressalvadas as hipóteses de conservação autorizadas ou exigidas
              pela legislação.
            </p>
          </section>

          <section className="mb-5" aria-labelledby="privacidade-direitos">
            <h2
              id="privacidade-direitos"
              className="h4 border-start border-primary border-3 ps-2"
            >
              10. Direitos dos titulares de dados pessoais
            </h2>
            <p>
              Nos termos da Lei Geral de Proteção de Dados Pessoais (Lei nº
              13.709/2018 — LGPD), os titulares podem exercer os direitos
              aplicáveis ao seu caso, incluindo:
            </p>
            <ul>
              <li>
                Confirmação da existência de tratamento de dados pessoais.
              </li>
              <li>Acesso aos dados pessoais tratados.</li>
              <li>
                Correção de dados incompletos, inexatos ou desatualizados.
              </li>
              <li>
                Anonimização, bloqueio ou eliminação de dados desnecessários,
                excessivos ou tratados em desconformidade com a legislação,
                quando cabível.
              </li>
              <li>
                Informações sobre compartilhamentos realizados, observadas as
                condições legais.
              </li>
              <li>
                Revogação do consentimento e solicitação de eliminação dos dados
                tratados com essa base legal, quando aplicável, ressalvadas as
                hipóteses legais de conservação.
              </li>
              <li className="mb-3">
                Apresentação de reclamação à Autoridade Nacional de Proteção de
                Dados (ANPD).
              </li>
            </ul>
            <p className="mb-0">
              O exercício de cada direito depende das circunstâncias do
              tratamento, das condições previstas na legislação e da
              possibilidade de identificação das informações envolvidas.
            </p>
          </section>

          <section className="mb-5" aria-labelledby="privacidade-contato">
            <h2
              id="privacidade-contato"
              className="h4 border-start border-primary border-3 ps-2"
            >
              11. Como entrar em contato?
            </h2>
            <p className="mb-0">
              Para dúvidas, solicitações ou questões relacionadas à privacidade
              e à proteção de dados pessoais, o visitante poderá utilizar o{" "}
              <Link href="/sobre#contato">
                canal de contato disponibilizado na página Sobre
              </Link>{" "}
              do Ecce Homo.
            </p>
          </section>

          <section aria-labelledby="privacidade-alteracoes">
            <h2
              id="privacidade-alteracoes"
              className="h4 border-start border-primary border-3 ps-2"
            >
              12. Alterações nesta Política de Privacidade
            </h2>
            <p>
              Esta Política de Privacidade poderá ser atualizada para refletir
              mudanças no funcionamento do site, nos serviços utilizados ou nas
              exigências legais aplicáveis.
            </p>
            <p className="mb-0">
              A versão vigente será disponibilizada nesta página. Recomendamos
              que os visitantes consultem o documento quando desejarem conhecer
              as práticas de privacidade aplicáveis.
            </p>
          </section>
        </article>
      </main>

      <Rodape />
    </>
  );
}
