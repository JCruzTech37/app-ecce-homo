# ADR04 — Rotas e UX Funcional

**Status:** Aprovado  
**Data:** 2026-09-24  
**Projeto:** Ecce Homo

---

## 1. Contexto

O Ecce Homo será uma plataforma católica de orações e novenas, com navegação simples, conteúdo organizado e URLs legíveis.

Este documento define as decisões funcionais relacionadas a:

- rotas públicas;
- estrutura de navegação;
- experiência de descoberta de conteúdo;
- páginas de listagem;
- páginas individuais;
- categorias/tags;
- breadcrumbs;
- conteúdos relacionados;
- Home dinâmica;
- comportamento básico em dispositivos móveis;
- estados de erro e conteúdo inexistente.

A modelagem interna de `Prayer` foi definida no ADR03.

A modelagem de `Novena` e `NovenaDay` será definida posteriormente, quando essa parte do desenvolvimento for iniciada.

---

# 2. Decisão

A aplicação utilizará o **Next.js App Router** e terá URLs públicas simples, estáveis e orientadas ao conteúdo.

A estrutura principal da V1 será:

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

As páginas públicas não dependerão de autenticação.

---

# 3. Rotas públicas

## 3.1 Home — `/`

A Home será a principal porta de entrada do Ecce Homo.

Ela não deverá ser construída como uma página estática com conteúdo fixado manualmente.

A composição da Home deverá consumir dados e regras do domínio.

Exemplos de seções possíveis na V1:

- orações em destaque;
- orações recentes;
- orações populares, quando houver mecanismo para isso;
- novenas próximas de uma data relevante;
- novenas disponíveis;
- categorias/tags de orações;
- conteúdos relacionados.

A Home deve funcionar mesmo quando a quantidade de conteúdo ainda for pequena.

Não deverá existir lógica do tipo:

```text
se mês == outubro:
    mostrar Nossa Senhora Aparecida
```

A seleção deverá ser baseada nos metadados dos conteúdos e nas regras de domínio.

---

# 4. Orações

## 4.1 Listagem — `/oracoes`

Responsável por apresentar as orações disponíveis publicamente.

Exemplo:

```text
/oracoes
```

A página poderá apresentar:

- título;
- descrição curta;
- imagem;
- categorias/tags;
- ordenação definida pelo domínio;
- acesso à página individual.

Conteúdo não publicado não deve aparecer.

---

## 4.2 Oração individual — `/oracoes/[slug]`

Exemplo:

```text
/oracoes/ave-maria
/oracoes/salve-rainha
/oracoes/pai-nosso
```

A página individual será responsável por apresentar o conteúdo completo da oração.

Elementos funcionais previstos:

- breadcrumb;
- título;
- texto da oração;
- imagem vertical;
- texto alternativo;
- jaculatória;
- frase complementar, quando existir;
- autor da frase, quando existir;
- compartilhamento;
- conteúdos relacionados;
- navegação de retorno para orações/listagens.

A existência ou ausência de campos opcionais não deve quebrar o layout.

---

# 5. Categorias e tags

As orações poderão possuir múltiplas `tags`.

Uma oração, portanto, não pertence necessariamente a uma única categoria.

Exemplo:

```text
Ave-Maria
├── oracoes-marianas
├── nossa-senhora
└── oracoes-tradicionais
```

As tags poderão ser utilizadas para criar páginas de agrupamento.

A estrutura de URL inicialmente prevista é:

```text
/oracoes/tag/[tag]
```

Exemplo:

```text
/oracoes/tag/oracoes-marianas
```

A página deverá apresentar:

- nome da categoria;
- descrição, se houver;
- lista das orações associadas;
- navegação de retorno para `/oracoes`.

A criação de uma entidade complexa de categoria não é necessária neste momento. As tags continuam sendo identificadores simples.

---

# 6. Novenas

A V1 também terá novenas, mas sua modelagem será definida posteriormente.

As rotas previstas são:

```text
/novenas
/novenas/[slug]
/novenas/[slug]/dia/[day]
```

Exemplos:

```text
/novenas
/novenas/nossa-senhora-aparecida
/novenas/nossa-senhora-aparecida/dia/1
```

## 6.1 `/novenas`

Listagem pública de novenas.

## 6.2 `/novenas/[slug]`

Página principal da novena.

Deverá apresentar as informações gerais da novena e permitir acesso aos dias.

## 6.3 `/novenas/[slug]/dia/[day]`

Página de um dia específico da novena.

Exemplo:

```text
/novenas/nossa-senhora-aparecida/dia/3
```

As regras detalhadas de navegação entre dias, estrutura do conteúdo e metadados serão definidas no ADR específico de novenas.

---

# 7. Breadcrumbs

As páginas internas deverão utilizar breadcrumbs para indicar a localização do usuário.

Exemplo de oração:

```text
Início > Orações > Salve Rainha
```

Exemplo de categoria:

```text
Início > Orações > Orações Marianas
```

Exemplo de novena:

```text
Início > Novenas > Nossa Senhora Aparecida
```

Exemplo de dia:

```text
Início > Novenas > Nossa Senhora Aparecida > Dia 3
```

Os breadcrumbs devem ser derivados da rota e do contexto do conteúdo, não digitados manualmente em cada página.

---

# 8. Navegação principal

A navegação principal da V1 terá, no mínimo:

```text
Início
Orações
Novenas
Sobre
```

A navegação deve permitir acesso direto às principais áreas do site.

A pesquisa poderá existir visualmente no projeto, mas o mecanismo de busca não faz parte da primeira implementação funcional caso ainda não esteja implementado.

Não haverá autenticação na navegação da V1.

---

# 9. Conteúdos relacionados

A página individual de uma oração poderá apresentar uma seção como:

```text
Talvez você também queira rezar
```

A seleção dos conteúdos não deve ser codificada diretamente na página.

Exemplo inadequado:

```text
if prayer === "salve-rainha":
    mostrar "ave-maria"
    mostrar "memorare"
```

A seleção deverá utilizar dados do conteúdo e regras do domínio.

Na V1, uma estratégia simples poderá utilizar:

1. tags em comum;
2. conteúdos publicados;
3. exclusão do conteúdo atual;
4. limite de resultados.

Exemplo:

```text
Salve Rainha
tags:
- oracoes-marianas
- nossa-senhora

↓

conteúdos relacionados:
- Ave-Maria
- Memorare
- Consagração a Nossa Senhora
```

A estratégia poderá evoluir posteriormente sem alteração da estrutura das páginas.

---

# 10. Descoberta de conteúdo

O usuário deve conseguir chegar a uma oração por diferentes caminhos:

```text
Home
  ↓
oração

Orações
  ↓
categoria/tag
  ↓
oração

Orações
  ↓
oração

oração
  ↓
conteúdo relacionado
  ↓
outra oração
```

O mesmo conteúdo poderá aparecer em múltiplos contextos.

Não deve existir dependência de uma única forma de navegação para encontrar uma oração.

---

# 11. Compartilhamento

A página individual de uma oração deverá prever compartilhamento.

O layout definido anteriormente contempla:

- WhatsApp;
- copiar link;
- outras opções de compartilhamento.

A funcionalidade deverá utilizar a URL atual da oração.

O componente de compartilhamento deverá ser independente do conteúdo da oração.

O conteúdo não deverá armazenar URLs de compartilhamento.

---

# 12. Estados de conteúdo

## 12.1 Conteúdo inexistente

Quando uma oração ou novena não existir, a aplicação deverá apresentar uma página `404`.

Exemplo:

```text
/oracoes/conteudo-que-nao-existe
```

Não deverá ocorrer erro técnico exposto ao usuário.

---

## 12.2 Conteúdo não publicado

Conteúdos com:

```json
"publicado": false
```

não devem ser acessíveis pelas rotas públicas.

A aplicação deverá tratar esse caso como conteúdo indisponível.

---

## 12.3 Tag sem conteúdo

Uma tag sem nenhum conteúdo publicado deverá apresentar um estado apropriado.

Exemplo:

```text
Nenhuma oração encontrada nesta categoria.
```

A aplicação não deve apresentar uma página quebrada ou vazia sem explicação.

---

# 13. URLs

As URLs públicas deverão seguir as seguintes características:

- minúsculas;
- legíveis;
- estáveis;
- sem espaços;
- sem caracteres desnecessários;
- baseadas em `slug`;
- independentes de detalhes internos de implementação.

Exemplos:

```text
/oracoes/ave-maria
/oracoes/salve-rainha
/novenas/nossa-senhora-aparecida
```

Evitar:

```text
/oracao?id=17
/content/prayer/17
/oracoes/123
```

A URL pública deve representar o conteúdo, e não seu identificador técnico interno.

---

# 14. Responsividade funcional

A aplicação será desenvolvida com abordagem **mobile-first**.

O conteúdo e a navegação devem permanecer funcionais em:

- smartphones;
- tablets;
- notebooks;
- desktops.

O Bootstrap será utilizado como principal ferramenta de layout e responsividade.

A interface não deve depender de interações exclusivas de mouse.

Exemplos:

- navegação acessível em telas pequenas;
- botões utilizáveis por toque;
- texto da oração legível;
- imagens adaptáveis;
- cards reorganizados conforme o viewport;
- compartilhamento utilizável em dispositivos móveis.

Detalhes puramente visuais serão tratados posteriormente e não fazem parte deste ADR.

---

# 15. Página individual de oração — fluxo funcional

O fluxo esperado é:

```text
Usuário acessa /oracoes/salve-rainha
        ↓
Next.js resolve o slug
        ↓
Repository obtém a oração
        ↓
Domain verifica publicação e regras
        ↓
Página apresenta o conteúdo
        ↓
Usuário pode:
    ├── voltar para Orações
    ├── acessar uma tag
    ├── compartilhar
    └── acessar oração relacionada
```

A página não deve buscar o JSON diretamente.

---

# 16. Home dinâmica

A Home deverá consumir seletores/regras do domínio.

Exemplos de funções previstas:

```ts
getFeaturedPrayers()
getRecentPrayers()
getPublishedPrayers()
getUpcomingNovenas()
getRelatedContent()
```

Os nomes são ilustrativos e poderão ser ajustados na implementação.

A principal decisão é que a Home **não conhecerá individualmente as orações**.

Em vez de:

```text
mostrar Ave-Maria
mostrar Salve Rainha
mostrar Pai-Nosso
```

a página deverá solicitar ao domínio algo como:

```text
orações em destaque
orações recentes
orações relacionadas
```

Isso permite adicionar novos conteúdos sem alterar a implementação da Home.

---

# 17. Regras de seleção

As regras de seleção pertencem ao domínio.

Exemplos:

```text
Presentation
    ↓
solicita "orações em destaque"
    ↓
Domain
    ↓
Repository
    ↓
dados
```

Não:

```text
Page
    ↓
lê JSON
    ↓
filtra
    ↓
ordena
    ↓
decide o que mostrar
```

Isso mantém as páginas responsáveis pela apresentação e não pela regra de negócio.

---

# 18. SEO funcional

As rotas de conteúdo deverão gerar metadados próprios.

Para uma oração:

```text
title
description
Open Graph
canonical
```

A origem desses dados será:

1. campos específicos de SEO, quando existentes;
2. fallback baseado nos dados da oração.

As páginas deverão possuir URLs canônicas e metadados coerentes com seu conteúdo.

Também deverão ser previstos:

```text
sitemap
robots
```

como parte da implementação de SEO da aplicação.

---

# 19. Princípios de UX funcional

A V1 deverá seguir estes princípios:

### 19.1 Clareza

O usuário deve saber:

- onde está;
- qual conteúdo está vendo;
- como voltar;
- onde encontrar outros conteúdos.

### 19.2 Baixa fricção

Uma oração deve ser acessível em poucos passos.

### 19.3 Consistência

Páginas do mesmo tipo devem possuir comportamento semelhante.

### 19.4 Conteúdo em primeiro lugar

A navegação e os componentes devem apoiar o acesso à oração, sem competir com ela.

### 19.5 Descoberta

O usuário deve encontrar conteúdos relacionados sem precisar conhecer previamente o nome da oração.

### 19.6 URLs compreensíveis

A URL deve fazer sentido para o usuário e para mecanismos de busca.

---

# 20. Fora do escopo deste ADR

Não fazem parte das decisões deste documento:

- login;
- cadastro;
- comentários;
- avaliações;
- favoritos;
- notificações;
- painel administrativo;
- pesquisa avançada;
- anúncios;
- Google Analytics;
- Firebase;
- Firestore;
- CMS;
- áudio;
- vídeo;
- personalização por usuário.

Esses itens poderão ser tratados em ADRs ou etapas futuras.

---

# 21. Critérios de aceitação

A estrutura será considerada adequada quando:

1. `/` funcionar como Home dinâmica.
2. `/oracoes` apresentar as orações publicadas.
3. `/oracoes/[slug]` apresentar uma oração individual.
4. Tags permitirem agrupamento de orações.
5. Breadcrumbs identificarem a posição atual.
6. Conteúdos relacionados forem selecionados por regras, e não por hardcode nas páginas.
7. Conteúdos não publicados não forem exibidos publicamente.
8. Slugs produzirem URLs legíveis.
9. URLs inexistentes apresentarem `404`.
10. A navegação funcionar em mobile e desktop.
11. A página individual permitir compartilhamento.
12. A Home não depender de nomes específicos de orações.
13. Novos conteúdos puderem ser adicionados sem alteração das páginas existentes.
14. As rotas de novenas estiverem preparadas para receber sua implementação quando o modelo de novena for definido.

---

# 22. Estrutura de rotas consolidada

```text
/
│
├── oracoes/
│   ├── page.tsx
│   │
│   ├── [slug]/
│   │   └── page.tsx
│   │
│   └── tag/
│       └── [tag]/
│           └── page.tsx
│
└── novenas/
    ├── page.tsx
    │
    └── [slug]/
        ├── page.tsx
        │
        └── dia/
            └── [day]/
                └── page.tsx
```

A implementação pode sofrer pequenos ajustes de organização de arquivos conforme as necessidades do Next.js, mas as URLs públicas acima são a referência arquitetural.

---

# 23. Decisão final deste ADR

O Ecce Homo utilizará URLs orientadas ao conteúdo, navegação simples e composição dinâmica da Home.

As páginas serão responsáveis pela apresentação.

As regras de seleção, ordenação, relacionamento e publicação pertencerão ao domínio.

A estrutura de novenas será reservada para uma etapa posterior, mantendo as rotas previstas sem antecipar sua modelagem.

O objetivo desta decisão é permitir que o site cresça em conteúdo sem exigir alterações constantes na estrutura das páginas.
