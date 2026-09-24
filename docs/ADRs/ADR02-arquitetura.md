# ADR02 — Arquitetura

**Status:** Aprovado
**Data:** 2026-09-24
**Projeto:** Ecce Homo
**Tipo:** Arquitetura

---

## 1. Objetivo

Definir a arquitetura técnica da primeira versão do Ecce Homo, estabelecendo:

* responsabilidades de cada camada;
* fluxo de dados;
* organização geral da aplicação;
* separação entre conteúdo, domínio e apresentação;
* estratégia para permitir evolução futura;
* princípios para evitar acoplamento desnecessário.

A arquitetura deverá ser simples para a V1, mas suficientemente estruturada para permitir crescimento sem necessidade de reconstrução da aplicação.

---

# 2. Visão geral

A aplicação será organizada em três camadas principais:

```text
┌───────────────────────────────────────┐
│             APRESENTAÇÃO              │
│                                       │
│       Next.js + React + Bootstrap     │
│                                       │
│  Pages / Components / Layout / SEO    │
└───────────────────┬───────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│                DOMÍNIO                │
│                                       │
│       Regras e comportamentos         │
│                                       │
│  seleção / filtros / ordenação /      │
│  recomendações / regras de conteúdo   │
└───────────────────┬───────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│                 DADOS                 │
│                                       │
│       JSON local na V1                │
│                                       │
│  repositories / leitura / adaptação   │
└───────────────────────────────────────┘
```

A camada de apresentação não deverá depender diretamente da implementação física dos dados.

---

# 3. Stack

A arquitetura utilizará:

| Tecnologia      | Responsabilidade                         |
| --------------- | ---------------------------------------- |
| Next.js         | Framework da aplicação                   |
| React           | Interface e componentes                  |
| TypeScript      | Tipagem e contratos                      |
| Bootstrap       | Layout e responsividade                  |
| Bootstrap Icons | Iconografia funcional, quando necessária |
| ESLint          | Qualidade e padronização                 |
| Node.js         | Runtime de desenvolvimento               |
| npm             | Gerenciamento de dependências            |
| Git             | Controle de versão                       |

---

# 4. Next.js

Next.js será o framework principal da aplicação.

Será utilizado para:

* roteamento;
* páginas;
* layouts;
* Server Components;
* renderização;
* metadata;
* SEO;
* páginas dinâmicas;
* tratamento de páginas inexistentes;
* geração de páginas;
* futura utilização de revalidação/ISR.

A aplicação utilizará o **App Router**.

---

# 5. React

React será responsável pela construção da interface através de componentes reutilizáveis.

Os componentes deverão representar responsabilidades claras.

Exemplo:

```text
PrayerCard
NovenaCard
Breadcrumb
Header
Footer
```

Um componente não deverá assumir responsabilidades de acesso ao banco ou regras de negócio que pertençam a outras camadas.

---

# 6. TypeScript

TypeScript será utilizado em toda a aplicação.

Os tipos deverão representar os contratos entre as diferentes camadas.

Exemplo conceitual:

```ts
Prayer
Novena
NovenaDay
Category
Image
```

Os tipos não deverão ser duplicados desnecessariamente entre componentes, domínio e dados.

Quando um contrato representar uma entidade do domínio, ele deverá possuir uma definição centralizada.

---

# 7. Bootstrap

Bootstrap será utilizado como base para:

* sistema de grid;
* containers;
* breakpoints;
* espaçamentos;
* flexbox;
* utilities;
* componentes básicos;
* responsividade.

A aplicação deverá utilizar as funcionalidades existentes do Bootstrap antes de criar soluções próprias.

A criação de CSS personalizado deverá ocorrer somente quando Bootstrap não atender adequadamente à necessidade.

A responsividade seguirá prioritariamente o modelo **mobile first** fornecido pelo Bootstrap.

---

# 8. Princípio de separação

A arquitetura deverá seguir a seguinte regra:

> **A interface não deve conhecer a origem dos dados e a fonte dos dados não deve conhecer a interface.**

Portanto:

```text
React Component
      ↓
Domain / Application logic
      ↓
Repository
      ↓
Data source
```

e não:

```text
React Component
      ↓
JSON diretamente
```

---

# 9. Camada de apresentação

A camada de apresentação será responsável por:

* páginas;
* layouts;
* componentes;
* navegação;
* renderização;
* interação do usuário;
* metadata;
* composição das informações recebidas.

Ela não será responsável por:

* ler arquivos JSON diretamente;
* implementar regras de seleção de conteúdo;
* conhecer detalhes de armazenamento;
* implementar regras de negócio.

---

# 10. Camada de domínio

A camada de domínio concentrará as regras relacionadas ao conteúdo do Ecce Homo.

Exemplos:

```text
getRecentPrayers()
getFeaturedPrayers()
getUpcomingNovenas()
getPublishedNovenas()
getRelatedContent()
```

Também poderá conter regras como:

* conteúdo publicado;
* ordenação;
* filtragem;
* categorização;
* seleção de conteúdo;
* cálculo de proximidade de datas;
* relacionamento entre conteúdos.

O domínio deverá trabalhar com entidades e regras, não com detalhes de armazenamento.

---

# 11. Camada de dados

A camada de dados será responsável por obter os conteúdos.

Na V1:

```text
JSON local
```

Exemplo:

```text
data/
├── prayers/
└── novenas/
```

A camada de dados fornecerá os dados através de repositories.

---

# 12. Repository Pattern

A aplicação utilizará uma abstração de Repository para separar o domínio da fonte de dados.

Exemplo conceitual:

```ts
interface PrayerRepository {
  getBySlug(slug: string): Promise<Prayer | null>;
  getAll(): Promise<Prayer[]>;
  getPublished(): Promise<Prayer[]>;
}
```

A implementação da V1 poderá ser:

```text
JsonPrayerRepository
```

Futuramente poderá existir:

```text
FirestorePrayerRepository
```

O restante da aplicação não deverá precisar conhecer essa diferença.

---

# 13. Fluxo de dados

O fluxo padrão será:

```text
JSON
 ↓
Repository
 ↓
Domain
 ↓
Next.js Page
 ↓
React Component
 ↓
HTML
```

Exemplo:

```text
ave-maria.json
       ↓
PrayerRepository
       ↓
Prayer
       ↓
/oracoes/[slug]
       ↓
PrayerPage
       ↓
PrayerContent
```

---

# 14. Exemplo de fluxo da Home

A Home deverá utilizar as regras do domínio.

```text
                    JSON
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
 PrayerRepository       NovenaRepository
          │                     │
          ▼                     ▼
     Prayer Domain        Novena Domain
          │                     │
          └──────────┬──────────┘
                     ▼
                    Home
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
    Recentes      Destaques    Próximas
```

A Home não deverá selecionar diretamente arquivos individuais.

---

# 15. Server Components

Por padrão, os componentes deverão ser **Server Components**.

Client Components serão utilizados somente quando houver necessidade real de:

* estado no navegador;
* eventos de interação;
* APIs específicas do navegador;
* comportamento que exija execução no cliente.

Isso evita transformar desnecessariamente toda a aplicação em uma aplicação client-side.

---

# 16. Client Components

Quando um componente precisar ser executado no navegador, deverá utilizar explicitamente:

```tsx
"use client";
```

A utilização deverá ser justificada pela necessidade funcional.

Não será adotada a prática de marcar componentes como Client Components apenas por conveniência.

---

# 17. Roteamento

As rotas serão definidas através do App Router do Next.js.

Estrutura inicial:

```text
/
├── oracoes/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
│
└── novenas/
    ├── page.tsx
    └── [slug]/
        ├── page.tsx
        └── dia/
            └── [day]/
                └── page.tsx
```

As URLs serão orientadas ao conteúdo e deverão ser legíveis.

---

# 18. URLs e Slugs

Cada conteúdo deverá possuir um `slug` único dentro de seu tipo.

Exemplo:

```text
/oracoes/ave-maria
/oracoes/pai-nosso

/novenas/nossa-senhora-aparecida
```

O slug deverá:

* ser legível;
* ser estável;
* evitar caracteres desnecessários;
* ser adequado para SEO;
* identificar unicamente o conteúdo.

---

# 19. Renderização

A aplicação deverá priorizar as capacidades de renderização do Next.js.

A arquitetura deverá permitir:

```text
Server Rendering
Static Generation
Dynamic Routes
Revalidation / ISR
```

Na V1 local, os JSONs serão a fonte de dados.

A estratégia exata de geração e revalidação será definida conforme a implantação da aplicação e será detalhada em documentação específica.

---

# 20. SEO

SEO será responsabilidade da aplicação Next.js, utilizando seus mecanismos nativos.

Cada conteúdo deverá possuir metadata própria.

Exemplo conceitual:

```text
Prayer
 ├── title
 ├── description
 └── Open Graph

Novena
 ├── title
 ├── description
 └── Open Graph
```

As páginas deverão utilizar HTML semântico sempre que possível.

---

# 21. Conteúdo e apresentação

O conteúdo deverá ser separado da forma como é apresentado.

Por exemplo:

```text
Prayer
```

representa a informação.

```text
PrayerContent
```

representa a maneira como essa informação é apresentada.

Isso permitirá alterar posteriormente o design sem alterar a estrutura dos dados.

---

# 22. Conteúdo estruturado

O conteúdo das orações e novenas deverá ser armazenado de maneira estruturada.

Não será adotado como regra geral o armazenamento de páginas inteiras como HTML arbitrário.

A estrutura deverá permitir que diferentes blocos de conteúdo sejam interpretados pela aplicação.

Exemplo conceitual:

```text
paragraph
heading
quote
image
```

Novos tipos de bloco poderão ser adicionados posteriormente.

---

# 23. Organização dos componentes

Os componentes deverão ser organizados por responsabilidade e domínio.

Exemplo:

```text
components/
├── layout/
├── navigation/
├── prayer/
├── novena/
└── content/
```

Componentes específicos de oração deverão permanecer no domínio visual de oração.

Componentes compartilhados deverão ser colocados em áreas comuns somente quando realmente forem reutilizados.

---

# 24. Reutilização

A aplicação deverá buscar reutilização sem criar abstrações prematuras.

Não será considerado necessário criar um componente genérico apenas porque dois componentes possuem alguma semelhança.

A abstração deverá ocorrer quando existir uma responsabilidade realmente compartilhada.

---

# 25. Dependências entre camadas

A direção das dependências deverá ser:

```text
Presentation
      ↓
Domain
      ↓
Data abstraction
      ↓
Data implementation
```

A camada de dados não deverá depender de componentes React.

A camada de domínio não deverá depender de Bootstrap.

A camada de domínio não deverá depender de elementos visuais.

---

# 26. Estrutura conceitual

A arquitetura completa deverá seguir:

```text
                    ┌─────────────────────┐
                    │       NEXT.JS       │
                    │                     │
                    │ Pages / Layouts     │
                    │ Server Components   │
                    │ Metadata / SEO      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       DOMAIN        │
                    │                     │
                    │ Rules               │
                    │ Selectors           │
                    │ Filters             │
                    │ Sorting             │
                    │ Date calculations   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    REPOSITORIES     │
                    │                     │
                    │ PrayerRepository    │
                    │ NovenaRepository    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     DATA SOURCE     │
                    │                     │
                    │ JSON files - V1     │
                    └─────────────────────┘
```

---

# 27. Evolução para Firestore

A arquitetura deverá permitir substituir:

```text
JsonPrayerRepository
```

por:

```text
FirestorePrayerRepository
```

sem modificar:

* páginas;
* componentes;
* regras de domínio;
* URLs;
* estrutura de navegação.

Conceitualmente:

### V1

```text
Next.js
   ↓
Domain
   ↓
Repository
   ↓
JSON
```

### Futuro

```text
Next.js
   ↓
Domain
   ↓
Repository
   ↓
Firestore
```

Essa é uma das principais decisões arquiteturais do projeto.

---

# 28. Evolução para novos tipos de conteúdo

A arquitetura não deverá assumir que o Ecce Homo terá apenas `Prayer` e `Novena` para sempre.

Novos tipos poderão ser adicionados futuramente:

```text
Prayer
Novena
NovenaDay
Article
Catechesis
Saint
Liturgy
Meditation
```

A inclusão de um novo tipo deverá ocorrer adicionando seu domínio, repository e apresentação, sem alterar desnecessariamente os tipos existentes.

---

# 29. Regra para novas funcionalidades

Uma nova funcionalidade deverá ser adicionada na camada correspondente.

Exemplo:

```text
Nova regra de recomendação
        ↓
Domain

Nova fonte de dados
        ↓
Data / Repository

Nova página
        ↓
App Router

Novo componente visual
        ↓
Components
```

Não deverão ser concentradas regras de diferentes responsabilidades em uma única página ou componente.

---

# 30. Princípio de evolução incremental

A V1 não deverá implementar infraestrutura futura antecipadamente.

Portanto:

```text
Agora
JSON
 ↓
Repository
 ↓
Domain
 ↓
Next.js
```

Posteriormente:

```text
Firestore
Storage
Authentication
Analytics
Admin
```

serão adicionados conforme houver necessidade real.

A arquitetura deverá estar preparada para essas evoluções, mas a V1 não deverá carregá-las sem necessidade.

---

# 31. Critérios arquiteturais

A arquitetura será considerada adequada quando:

* componentes não acessarem JSON diretamente;
* regras de negócio não estiverem espalhadas pelas páginas;
* dados não dependerem da interface;
* novas orações não exigirem alterações de código;
* novas novenas não exigirem alterações de componentes;
* a Home funcionar a partir dos dados disponíveis;
* a fonte de dados puder ser substituída futuramente;
* páginas e componentes puderem evoluir independentemente dos dados;
* Bootstrap puder ser substituído ou complementado futuramente sem alteração do domínio.

---

# 32. Decisão

O Ecce Homo adotará uma arquitetura em camadas baseada em:

```text
Next.js
   ↓
Presentation
   ↓
Domain
   ↓
Repositories
   ↓
JSON
```

A V1 utilizará arquivos JSON como fonte local de conteúdo.

A aplicação será construída com **Next.js, React e TypeScript**, utilizando **Bootstrap** como base de layout e responsividade.

O domínio será separado da apresentação e da persistência.

O acesso aos dados será abstraído através de repositories, permitindo que a fonte local de JSON seja posteriormente substituída por **Firestore** ou outra fonte de dados sem reestruturar a aplicação.

A arquitetura priorizará **simplicidade na V1, baixo acoplamento e capacidade de evolução**.
