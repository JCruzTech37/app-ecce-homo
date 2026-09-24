# ADR01 — Visão e Escopo

**Status:** Aprovado 
**Data:** 2026-09-24
**Projeto:** Ecce Homo
**Tipo:** Visão e Escopo

---

## 1. Contexto

O **Ecce Homo** será uma plataforma web católica voltada inicialmente à disponibilização de **orações e novenas**.

O projeto deverá começar de forma simples, com desenvolvimento e execução local, mas sua arquitetura deve permitir evolução futura sem necessidade de reconstrução da aplicação.

A primeira versão terá como prioridade:

- arquitetura;
- organização do código;
- facilidade de inclusão de conteúdo;
- navegação;
- responsividade;
- SEO;
- capacidade de evolução.

A estética visual definitiva não faz parte das decisões desta fase.

---



## 2. Objetivo

Construir uma aplicação web católica que permita ao usuário:

- encontrar orações;
- encontrar novenas;
- navegar facilmente entre conteúdos;
- acessar cada conteúdo por uma URL própria;
- descobrir conteúdos relacionados;
- encontrar novenas próximas de determinadas datas;
- utilizar o site confortavelmente em dispositivos móveis e desktops.

A aplicação deverá ser preparada para futuramente receber novos tipos de conteúdo e funcionalidades sem necessidade de alteração estrutural significativa.

---



## 3. Escopo da V1

A primeira versão terá somente dois tipos principais de conteúdo:

### 3.1. Oração

Uma oração será um conteúdo independente, acessível por uma URL própria.

Exemplo:

```text
/oracoes/ave-maria
```



### 3.2. Novena

Uma novena será composta por informações gerais e seus respectivos dias.

Exemplo:

```text
/novenas/nossa-senhora-aparecida
/novenas/nossa-senhora-aparecida/dia/1
/novenas/nossa-senhora-aparecida/dia/2
...
/novenas/nossa-senhora-aparecida/dia/9
```

---



## 4. Escopo funcional

A V1 deverá contemplar:

- Home;
- listagem de orações;
- página individual de oração;
- listagem de novenas;
- página individual de novena;
- páginas individuais dos dias de uma novena;
- categorias para organização dos conteúdos;
- navegação entre conteúdos;
- breadcrumbs;
- conteúdos relacionados;
- seções dinâmicas na Home;
- identificação de novenas relacionadas a datas próximas;
- URLs amigáveis;
- página 404;
- metadata básica para SEO;
- layout responsivo.

---



## 5. Home

A Home não deverá ser uma página composta exclusivamente por conteúdo fixo.

Ela deverá possuir **seções autônomas**, capazes de selecionar conteúdos a partir dos dados disponíveis.

Exemplos de seções:

- orações recentes;
- orações populares ou em destaque;
- novenas próximas;
- novenas recentes ou em destaque;
- categorias de conteúdo.

A seleção dos conteúdos deverá ser realizada por regras definidas na camada de domínio.

A Home não deverá precisar conhecer individualmente cada oração ou novena existente.

---



## 6. Autonomia do conteúdo

A aplicação deverá ser construída de forma que a inclusão de um novo conteúdo não exija alterações nos componentes existentes.

Conceitualmente:

```text
Novo conteúdo
      ↓
Fonte de dados
      ↓
Repository
      ↓
Regras de domínio
      ↓
Página / Home
      ↓
Componentes
```

Na V1, a fonte de dados será composta por arquivos JSON locais.

Posteriormente, essa fonte poderá ser substituída por uma solução externa, como Firestore, sem que a camada de apresentação precise ser reestruturada.

---



## 7. Fonte de dados da V1

Durante o desenvolvimento inicial, o conteúdo será mantido localmente.

Exemplo conceitual:

```text
data/
├── prayers/
│   ├── ave-maria.json
│   ├── pai-nosso.json
│   └── ...
│
└── novenas/
    ├── nossa-senhora-aparecida/
    │   ├── novena.json
    │   ├── day-01.json
    │   ├── day-02.json
    │   └── ...
```

Os componentes da interface não deverão acessar esses arquivos diretamente.

O acesso deverá ocorrer através de uma camada de dados.

---



## 8. Arquitetura tecnológica inicial

A V1 utilizará:

- **Next.js** como framework principal;
- **React** para construção da interface;
- **TypeScript** como linguagem;
- **Bootstrap** como base de layout e responsividade;
- **Bootstrap Icons**, quando necessário;
- **ESLint** para padronização e qualidade do código;
- **Git** para controle de versão.

O projeto utilizará o **App Router** do Next.js.

---



## 9. Responsividade

O desenvolvimento será **mobile first**.

Bootstrap será utilizado ao máximo para:

- grid;
- containers;
- breakpoints;
- espaçamentos;
- flexbox utilities;
- componentes responsivos;
- navegação responsiva;
- dimensionamento de elementos.

A aplicação deverá funcionar adequadamente em:

```text
Mobile
   ↓
Tablet
   ↓
Desktop
   ↓
Large Desktop
```

Não será criado inicialmente um sistema de responsividade próprio quando uma solução existente do Bootstrap atender ao requisito.

---



## 10. Separação de responsabilidades

A aplicação deverá separar:

### Apresentação

Responsável por:

- páginas;
- componentes;
- layout;
- interação;
- apresentação dos conteúdos.



### Domínio

Responsável por:

- regras de negócio;
- seleção de conteúdos;
- ordenação;
- filtros;
- cálculo de novenas próximas;
- regras utilizadas pela Home.



### Dados

Responsável por:

- obtenção dos conteúdos;
- leitura dos JSONs;
- transformação dos dados;
- acesso aos repositórios.

Essa separação deverá permitir substituir posteriormente a fonte local por uma fonte externa.

---



## 11. SEO

SEO será considerado desde a V1.

A aplicação deverá utilizar os recursos do Next.js para:

- títulos;
- descriptions;
- metadata;
- URLs amigáveis;
- metadata específica por conteúdo;
- sitemap;
- robots;
- Open Graph;
- estrutura semântica.

Cada oração e cada novena deverá possuir uma URL própria e indexável.

---



## 12. Renderização

A aplicação deverá priorizar os recursos nativos do Next.js para renderização no servidor e geração de páginas.

A V1 deverá ser construída de forma compatível com uma futura utilização de:

- geração estática;
- páginas dinâmicas;
- revalidação;
- ISR.

A escolha específica das estratégias de renderização será detalhada na ADR de arquitetura.

---



## 13. Conteúdo fora do escopo da V1

Não serão implementados nesta versão:

- login de usuários;
- cadastro de usuários;
- comentários;
- avaliações;
- favoritos;
- notificações;
- blog;
- catequese;
- liturgia diária;
- santo do dia;
- fórum;
- sistema de busca avançada;
- áudio;
- vídeo;
- painel administrativo;
- sistema de anúncios;
- integração com Google Analytics;
- Firebase;
- Firestore;
- Firebase Storage;
- autenticação;
- recomendações baseadas em inteligência artificial.

Esses itens poderão ser considerados posteriormente.

---



## 14. Preparação para evolução

Embora essas funcionalidades não façam parte da V1, a arquitetura deverá permitir futuramente:

```text
Firestore
Firebase Storage
Firebase Authentication
Google Analytics
Painel administrativo
Novos tipos de conteúdo
Busca
Favoritos
Comentários
Áudio
Vídeo
```

A preparação deverá ocorrer por meio da separação de responsabilidades e contratos de dados, e não pela implementação antecipada dessas funcionalidades.

---



## 15. Princípio de independência da fonte de dados

O frontend não deverá depender diretamente do formato físico utilizado para armazenar o conteúdo.

Na V1:

```text
JSON
 ↓
Repository
 ↓
Domain
 ↓
Next.js
```

Em uma versão futura:

```text
Firestore
 ↓
Repository
 ↓
Domain
 ↓
Next.js
```

A camada de apresentação deverá permanecer essencialmente independente dessa mudança.

---



## 16. Critérios de sucesso da V1

A V1 será considerada arquiteturalmente adequada quando for possível:

1. adicionar uma nova oração criando apenas o conteúdo necessário;
2. adicionar uma nova novena sem modificar componentes existentes;
3. adicionar os dias de uma novena sem modificar as páginas;
4. fazer o conteúdo aparecer automaticamente nas listagens correspondentes;
5. fazer a Home selecionar conteúdos com base nas regras definidas;
6. acessar cada conteúdo por uma URL própria;
7. navegar adequadamente entre mobile e desktop;
8. executar o projeto completamente de forma local;
9. substituir posteriormente os JSONs por uma fonte externa sem reestruturar a aplicação;
10. adicionar novos tipos de conteúdo sem transformar os tipos atuais em estruturas rígidas e específicas demais.

---



## 17. Fora deste ADR

Este documento não define detalhadamente:

- estrutura de diretórios;
- interfaces TypeScript;
- schemas dos JSONs;
- componentes React;
- regras específicas da Home;
- rotas completas;
- estratégia de cache;
- estratégia de ISR;
- configuração do Firebase;
- configuração de deploy;
- identidade visual;
- conteúdo textual das orações e novenas.

Esses pontos serão definidos nos ADRs e documentos seguintes.

---



## 18. Decisão

A V1 do **Ecce Homo** será desenvolvida como uma aplicação **Next.js + React + TypeScript**, utilizando **Bootstrap** como base de layout e responsividade.

O conteúdo inicial será armazenado localmente em **arquivos JSON**, acessados através de uma camada de dados independente da apresentação.

A aplicação será estruturada desde o início para que a fonte de dados possa ser substituída futuramente por uma solução externa, especialmente **Firestore**, sem exigir uma reestruturação significativa do frontend.

O foco da V1 será **arquitetura, conteúdo, navegação, responsividade e SEO**, mantendo funcionalidades adicionais fora do escopo até que exista necessidade concreta de implementá-las.