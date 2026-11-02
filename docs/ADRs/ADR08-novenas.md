# ADR08 --- Módulo de Novenas

-   **Status:** Aprovado
-   **Data:** 2026-11-02
-   **Relacionados:** ADR01, ADR02, ADR03, ADR04, ADR05, ADR06 e ADR07.

## 1. Objetivo

Criar um módulo independente para novenas e outras sequências
devocionais, como trezenas e conteúdos quaresmais. A estrutura começa
simples e poderá evoluir conforme as necessidades reais das novenas
cadastradas.

O módulo deverá respeitar a identidade visual e os padrões já existentes
no Ecce Homo, sem provocar alterações ou regressões no módulo de
Orações.

## 2. Modelo conceitual

### 2.1. Duração

-   Nove dias será o padrão.
-   A quantidade de dias será flexível, permitindo outras sequências
    devocionais.
-   O modelo não ficará limitado a nove dias.

### 2.2. Blocos próprios da novena

Cada novena terá seus próprios blocos. Não haverá catálogo global ou
catálogo predefinido de tipos de conteúdo.

A estrutura inicial de cada bloco será simples:

-   `id`: identificador consultável pela composição dos dias.
-   `titulo`: título do bloco.
-   `texto`: texto do bloco.

Os blocos poderão ser referenciados por um ou mais dias. Uma alteração
no bloco compartilhado deverá refletir em todos os dias que o utilizam.

A primeira novena cadastrada será utilizada para identificar
necessidades reais e avaliar quais informações ou estruturas adicionais
serão necessárias. Não serão criados campos antecipadamente sem
necessidade concreta.

### 2.3. Dias e composição ordenada

A novena terá uma lista `dias`. Cada objeto dessa lista representa um
dia e contém:

-   `numero`: identificação numérica do dia ou etapa.
-   `itens`: lista de entradas que compõem a exibição daquele dia.

Cada entrada possui uma posição própria por meio de `ordenacao`. A mesma
referência a bloco poderá aparecer mais de uma vez no mesmo dia, em
posições diferentes.

Há três formas de entrada:

**Referência a bloco** - `ordenacao`: número da posição. - `is_bloco`:
`true`. - `id_bloco`: identificador do bloco da própria novena.

O título e o texto são obtidos do bloco referenciado.

**Conteúdo próprio do dia** - `ordenacao`: número da posição. -
`is_bloco`: `false`. - `titulo`: título do conteúdo. - `texto`: texto do
conteúdo.

**Referência a oração existente** - `ordenacao`: número da posição. -
`nome`: nome legível apresentado ao usuário. - `id_oracao`: ID do
documento da oração no Firestore.

Para a referência a oração, `is_bloco`, `id_bloco`, `titulo` e `texto`
não são necessários. A ordenação continua obrigatória.

### 2.4. Campos da novena

Campos obrigatórios:

  Campo               Tipo
  ------------------- ------------------
  `titulo`            string
  `createdAt`         timestamp
  `descricao`         string
  `fraseSanto`        string
  `fraseSantoAutor`   string
  `id`                string
  `jaculatoria`       string
  `publicado`         boolean
  `seoDescription`    string
  `seoTitle`          string
  `slug`              string
  `tags`              lista de string
  `updatedAt`         timestamp
  `blocos`            lista de objetos
  `dias`              lista de objetos

Cada objeto de `blocos` contém `id`, `titulo` e `texto`.

Cada objeto de `dias` contém `numero` e `itens`, conforme a seção 2.3.

Campos opcionais:

  Campo           Tipo
  --------------- -------------------------------------------
  `referencia`    objeto com `link` (URL) e `nome` (string)
  `is_destaque`   boolean

### 2.5. Evolução do modelo

A estrutura inicial deverá permanecer simples. Novas propriedades ou
formatos de conteúdo serão considerados quando uma novena real
demonstrar essa necessidade.

Não haverá catálogo de tipos de bloco, nem tentativa de prever
previamente todas as formas de conteúdo que poderão existir.

## 3. Relação com o módulo de Orações

A utilização de orações cadastradas no módulo de Orações será opcional.
Uma novena poderá referenciar orações existentes ou conter textos
próprios.

Quando houver referência a uma oração existente, a interface apresentará
`nome` como link. Ao clicar, será aberto um modal que consultará a
oração pelo `id_oracao`, correspondente ao ID do documento no Firestore.

A consulta deverá ocorrer somente após a ação do usuário para abrir o
modal. Não haverá consulta antecipada ou carregamento de orações que o
usuário não tenha solicitado.

O modal exibirá somente: - Título da oração. - Texto da oração.

Não serão exibidos descrição, jaculatória ou os demais campos do
documento de oração.

A integração deverá utilizar os padrões já definidos no projeto para
consulta e apresentação, aplicados ao modal, sem estender esse
comportamento à página inteira da novena.

## 4. Rotas, listagem e navegação

Rotas:

-   `/novenas` --- página central para busca, pesquisa e filtros.
-   `/novenas/[slug]` --- página individual da novena.

A listagem de Novenas deverá replicar o comportamento já existente no
módulo de Orações, incluindo buscas e funcionalidades equivalentes,
sempre consultando a estrutura `novenas`.

Componentes existentes poderão ser reutilizados quando isso for simples
e não introduzir complexidade desnecessária. Se a reutilização tornar a
solução complexa, a duplicação será aceita.

No menu do header, a opção **Orações** deverá oferecer um submenu com
acesso a **Orações** e **Novenas**.

Na página individual da novena: - O primeiro dia será selecionado por
padrão. - A navegação pelo conteúdo do dia ocorrerá por rolagem dentro
da própria página. - Os demais dias serão acessados por tabs, com uma
tab para cada dia. - A troca de dia ocorrerá na própria página.

As tabs serão implementadas inicialmente de forma simples. Melhorias
poderão ser feitas posteriormente, respeitando os padrões existentes no
portal.

## 5. Modal responsivo de orações

**Desktop** - Modal centralizado. - Largura aproximada de 70% a 80% da
tela.

**Mobile** - Apresentação no formato bottom sheet, surgindo da parte
inferior. - Altura aproximada de 80% da tela. - Rolagem própria quando
necessária.

O modal buscará a oração somente quando solicitado pelo usuário.

## 6. Persistência, nomenclatura e apresentação

-   O módulo terá uma estrutura própria no Firestore, identificada como
    `novenas`, independente da estrutura `prayers`.
-   A nomenclatura deverá privilegiar português, evitando variáveis e
    identificadores em inglês sem necessidade.
-   Se um conteúdo ou campo não estiver presente nos dados, ele não
    deverá ser exibido.
-   A estrutura poderá evoluir conforme necessidades concretas
    identificadas durante o cadastro de novas novenas.

## 7. Independência e padrões do projeto

O módulo de Novenas terá suas próprias responsabilidades de
apresentação, domínio e acesso aos dados, seguindo a arquitetura
definida no ADR02.

A integração com Orações deverá ser controlada e não poderá exigir
alterações no módulo existente. Não faz parte deste ADR: - Alterar o
modelo de oração definido no ADR03. - Alterar as rotas, componentes ou
regras de domínio de Orações. - Alterar o processo de importação de
orações definido no ADR06. - Criar dependência do módulo de Orações em
relação ao módulo de Novenas.

A inclusão de Novenas no submenu do header é uma integração de navegação
do portal e não altera a independência dos módulos.

A identidade visual e o design system do ADR07 serão integralmente
respeitados. Não serão criadas novas cores, famílias tipográficas ou um
design system paralelo.

A implementação seguirá os ADR02 e ADR05, incluindo separação de
responsabilidades, TypeScript estrito, componentes de servidor por
padrão e ausência de abstrações ou dependências sem justificativa.

A responsabilidade pelos testes continuará no fluxo de desenvolvimento
já utilizado no projeto. Este ADR não cria uma estratégia de testes
independente.

## 8. Critérios de sucesso

1.  O módulo suporta novenas e outras sequências com diferentes
    quantidades de dias.
2.  Cada novena possui seus próprios blocos, sem catálogo global
    predefinido.
3.  Os dias podem referenciar blocos, conter conteúdo próprio ou
    referenciar orações existentes.
4.  Cada entrada diária possui ordenação própria.
5.  Um bloco pode ser reutilizado e aparecer mais de uma vez na
    composição de um dia.
6.  Orações existentes são consultadas somente após o usuário solicitar
    sua abertura.
7.  O modal apresenta somente título e texto da oração, com
    comportamento responsivo definido.
8.  A listagem e as buscas seguem o comportamento do módulo de Orações,
    consultando `novenas`.
9.  A identidade visual existente é preservada.
10. O módulo de Novenas não exige alterações no módulo de Orações.

## 9. Encerramento da definição

As decisões funcionais e estruturais necessárias para iniciar o
desenvolvimento do módulo estão registradas neste ADR.

A estrutura inicial dos blocos permanece intencionalmente mínima (`id`,
`titulo` e `texto`). A primeira novena real será utilizada para validar
a suficiência desse formato e orientar evoluções posteriores.

O modelo de dados consolidado está exemplificado no arquivo
`ADR08-novenas.json`.

**Decisão:** ADR08 concluído e aprovado como ponto de partida para o
desenvolvimento. Evoluções futuras deverão ser registradas neste ADR ou
em novas decisões, conforme o impacto da mudança.
