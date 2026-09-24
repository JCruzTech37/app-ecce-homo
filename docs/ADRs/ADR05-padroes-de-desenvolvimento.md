# ADR05 — Padrões de Desenvolvimento

**Status:** Proposto  
**Data:** 2026-09-24  
**Projeto:** Ecce Homo

---

## 1. Contexto

Este documento define as convenções práticas que serão utilizadas durante o desenvolvimento do Ecce Homo.

O objetivo é estabelecer padrões simples e consistentes para que o projeto:

- utilize cada tecnologia de acordo com sua finalidade;
- evite gambiarras e soluções artificiais;
- permaneça legível para manutenção futura;
- mantenha as responsabilidades de cada camada bem definidas;
- facilite a evolução do projeto;
- permita que o desenvolvimento seja realizado com o mínimo possível de decisões repetitivas.

Estas regras devem orientar principalmente o desenvolvimento da V1.

Não serão criadas abstrações ou estruturas apenas para antecipar problemas que ainda não existem.

---

# 2. Princípios gerais

O desenvolvimento seguirá os seguintes princípios:

1. Utilizar as tecnologias escolhidas de acordo com suas capacidades e convenções naturais.
2. Não introduzir gambiarras para contornar uma decisão arquitetural.
3. Preferir soluções simples quando o problema também for simples.
4. Separar responsabilidades quando a abstração justificar essa separação.
5. Evitar abstração prematura.
6. Manter o código legível para manutenção manual.
7. Reaproveitar componentes quando isso reduzir duplicação sem criar complexidade desnecessária.
8. Manter as regras de negócio fora da apresentação.
9. Priorizar desempenho sem introduzir complexidade desproporcional ao estágio atual do projeto.
10. Não implementar antecipadamente funcionalidades futuras que ainda não possuem necessidade concreta.

---

# 3. TypeScript

O projeto utiliza TypeScript como linguagem principal.

O TypeScript deverá ser utilizado de forma efetiva, e não apenas como uma camada superficial sobre JavaScript.

## 3.1 `any`

O uso de `any` não será permitido.

Não deverão ser utilizadas soluções como:

```ts
const dados: any = ...
```

ou:

```ts
function processar(valor: any) {
  // ...
}
```

Quando um tipo não puder ser determinado, o problema deverá ser resolvido através de:

- tipagem adequada;
- tipos genéricos;
- union types;
- tipos derivados;
- validação de dados;
- refinamento de tipos;
- ou outra solução idiomática do TypeScript.

O objetivo é manter a segurança de tipos durante todo o fluxo da aplicação.

---

## 3.2 Tipagem estrita

O projeto deverá utilizar as configurações estritas recomendadas pelo TypeScript.

A tipagem deve ser considerada parte da arquitetura, e não apenas uma ferramenta de auxílio ao editor.

---

# 4. Convenções de nomenclatura

Os nomes do código deverão ser preferencialmente escritos em **português**, mantendo consistência com o domínio do projeto.

A escolha tem como objetivo permitir que o próprio responsável pelo projeto compreenda a finalidade de arquivos, funções, variáveis e estruturas apenas pelo nome.

Exemplos:

```ts
buscarOracao()
listarOracoes()
oracaoPublicada
fraseSanto
imagemVertical
```

em vez de:

```ts
getPrayer()
listPrayers()
publishedPrayer
saintQuote
verticalImage
```

## 4.1 Convenções técnicas

Será utilizada a convenção natural da tecnologia.

Exemplos:

```text
Componentes React → PascalCase
Funções → camelCase
Variáveis → camelCase
Propriedades → camelCase
Tipos → PascalCase
Arquivos de componentes → PascalCase
```

Exemplo:

```text
PrayerCard.tsx
```

poderá existir como nome técnico do componente, enquanto o domínio interno permanece em português:

```ts
interface OracaoCardProps {
  oracao: Oracao
}
```

A convenção exata deve acompanhar as práticas naturais do TypeScript, React e Next.js, sem criar padrões artificiais.

---

# 5. Organização e reutilização de componentes

Componentes visuais devem ser reutilizados sempre que isso representar uma abstração real.

Exemplos de componentes potencialmente reutilizáveis:

- modal;
- header;
- sidebar;
- banner;
- card;
- breadcrumb;
- botão;
- seção;
- container de conteúdo.

## 5.1 Componentes genéricos

Quando existir um componente visual recorrente, ele deverá preferencialmente receber conteúdo e propriedades através de parâmetros.

Exemplo conceitual:

```tsx
<Modal titulo="Compartilhar">
  ...
</Modal>
```

O objetivo é evitar:

```text
ModalCompartilhar
ModalConfirmacao
ModalAviso
ModalOutro
```

quando todos possuem essencialmente a mesma estrutura visual.

---

## 5.2 Quando criar um componente específico

Um novo componente específico poderá ser criado quando a quantidade de regras, comportamento ou estrutura própria justificar sua separação.

Exemplo:

```text
Modal
```

pode ser genérico.

Porém, se um determinado tipo de modal possuir regras muito específicas, comportamento próprio e estrutura substancialmente diferente, poderá existir um componente separado.

A regra é:

> Reutilizar quando a abstração simplifica. Separar quando a reutilização começa a criar complexidade.

O mesmo princípio se aplica a:

- headers;
- sidebars;
- banners;
- cards;
- menus;
- seções;
- elementos de conteúdo.

---

# 6. Nível de abstração

A organização do código seguirá uma relação entre abstração e proximidade:

```text
Quanto mais abstrato
        ↓
mais separado e reutilizável

Quanto mais específico
        ↓
mais próximo do contexto de uso
```

Portanto:

### Elementos altamente reutilizáveis

Devem possuir localização e responsabilidade próprias.

Exemplo:

```text
components/
└── navigation/
    └── Breadcrumb.tsx
```

### Elementos específicos de uma página

Podem permanecer próximos do contexto em que são utilizados, evitando criar dezenas de pequenos arquivos sem necessidade.

Não será adotada uma regra de separar absolutamente tudo em componentes individuais.

---

# 7. Server Components e Client Components

Server Components serão o padrão.

Client Components deverão ser utilizados somente quando houver necessidade real de recursos do cliente.

Exemplos de situações que podem justificar `use client`:

- estado local;
- eventos interativos;
- APIs do navegador;
- funcionalidades que dependam de execução no cliente.

Não utilizar:

```tsx
"use client"
```

apenas por conveniência.

A preferência será:

```text
Server Component
    ↓
Client Component somente onde necessário
```

Essa regra mantém a quantidade de JavaScript enviado ao navegador sob controle e aproveita o modelo do Next.js.

---

# 8. Imports e aliases

O projeto utilizará os mecanismos de importação e aliases oferecidos pelo TypeScript e Next.js.

O alias configurado para o projeto:

```text
@/*
```

deverá ser utilizado de forma natural.

Exemplo:

```ts
import { OracaoCard } from "@/components/oracao/OracaoCard";
```

Não serão criadas convenções artificiais de importação.

Imports relativos continuarão sendo aceitáveis quando forem a opção mais natural dentro de um contexto local.

A regra geral é utilizar a solução que mantenha o código mais legível e compatível com as convenções da tecnologia.

---

# 9. ESLint e formatação

O projeto utilizará as ferramentas padrão recomendadas pelo ecossistema Next.js/TypeScript.

O objetivo é permitir que o ambiente de desenvolvimento, incluindo o Cursor, consiga aplicar automaticamente as correções de formatação e linting quando possível.

As ferramentas deverão:

- detectar problemas comuns;
- manter formatação consistente;
- evitar divergências de estilo;
- reduzir trabalho manual;
- permitir execução automática após o desenvolvimento de código.

Não serão criadas regras personalizadas sem necessidade.

A configuração deve permanecer próxima do padrão recomendado pelas ferramentas utilizadas.

---

# 10. CSS e Bootstrap

O Bootstrap será a base do layout e da responsividade do projeto.

Durante a primeira etapa de desenvolvimento, deverá ser utilizado **o Bootstrap da forma mais pura possível**.

Isso significa priorizar:

- grid;
- containers;
- breakpoints;
- spacing utilities;
- flex utilities;
- componentes;
- classes responsivas;
- demais utilitários fornecidos pelo Bootstrap.

Não será criado inicialmente um sistema paralelo de layout.

---

## 10.1 CSS customizado

CSS customizado será utilizado quando necessário, mas não será a primeira ferramenta para resolver problemas que o Bootstrap já resolve adequadamente.

A intenção é preservar a possibilidade de, posteriormente, substituir a aparência visual sem precisar reconstruir a estrutura funcional.

A arquitetura visual prevista é:

```text
Bootstrap
    ↓
estrutura e responsividade
    ↓
CSS customizado
    ↓
identidade visual
```

No futuro, o CSS customizado será responsável principalmente por:

- cores;
- tipografia;
- tamanhos;
- espaçamentos específicos;
- ornamentos;
- identidade visual;
- ajustes finos de apresentação.

O Bootstrap continuará funcionando como base estrutural e responsável pela responsividade.

---

## 10.2 Objetivo da abordagem

A V1 não deverá ter aparência final de Bootstrap puro.

Entretanto, durante a implementação estrutural, não será prioridade remover visualmente a aparência padrão do Bootstrap.

A prioridade inicial é:

```text
funcionamento
→ estrutura
→ responsividade
→ conteúdo
→ refinamento visual
```

A estilização aprofundada ocorrerá posteriormente, sem necessidade de reconstrução estrutural.

---

# 11. Tratamento de erros e logs

Erros devem ser tratados de forma adequada à sua natureza.

## 11.1 Erros esperados

Situações como conteúdo inexistente devem utilizar os mecanismos padrão do Next.js.

Exemplo:

```text
oração inexistente
        ↓
404
```

A página deverá apresentar uma experiência padrão de mercado, clara e amigável.

---

## 11.2 Erros graves

Falhas inesperadas deverão possuir tratamento de erro e registro adequado.

O terminal não deverá ser poluído por mensagens repetitivas ou informações irrelevantes.

O objetivo é:

```text
Terminal
├── informação necessária
├── contexto suficiente
└── erro detalhado quando necessário
```

e não:

```text
Terminal
├── dezenas de logs
├── mensagens repetidas
├── dumps desnecessários
└── erro difícil de localizar
```

Os logs deverão permitir identificar:

- o que falhou;
- onde falhou;
- contexto suficiente para investigação;
- erro original quando relevante.

A estratégia específica de logging poderá evoluir quando a aplicação passar a utilizar infraestrutura de backend persistente.

---

# 12. Validação de dados

Os dados provenientes dos arquivos JSON deverão possuir validação em runtime.

A validação deverá garantir, no mínimo, que a estrutura recebida corresponde ao modelo esperado antes de ser utilizada pelo domínio ou pela apresentação.

A estratégia deverá ser adequada ao futuro cenário em que a mesma aplicação possa consumir dados provenientes de um banco de dados.

A preferência será por uma abordagem baseada em schema.

Exemplo conceitual:

```text
Fonte de dados
      ↓
Schema
      ↓
dados validados
      ↓
Repository
      ↓
Domain
      ↓
Presentation
```

O schema deverá validar especialmente:

- campos obrigatórios;
- tipos;
- estruturas de arrays;
- valores esperados;
- relações simples entre campos quando necessário.

A biblioteca específica poderá ser definida durante a implementação, priorizando uma solução simples, madura e compatível com TypeScript.

A validação não deve duplicar desnecessariamente a tipagem estática.

---

# 13. Funções assíncronas e responsabilidades

Funções assíncronas deverão respeitar as responsabilidades definidas na arquitetura.

A regra geral será:

```text
Presentation
    ↓
Domain
    ↓
Repository
    ↓
Data source
```

Uma página não deverá assumir responsabilidades do Repository.

Um Repository não deverá assumir regras de apresentação.

O domínio não deverá conhecer React ou Bootstrap.

O fato de uma função ser `async` não altera sua responsabilidade arquitetural.

---

# 14. HTML semântico

Na V1, a regra de acessibilidade adotada será:

> Utilizar HTML semântico corretamente.

Deverão ser utilizados elementos HTML de acordo com sua finalidade.

Exemplos:

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
<h1>
<h2>
<p>
<button>
<a>
```

Não deverão ser utilizados elementos genéricos, como `<div>`, para substituir elementos semânticos quando houver um elemento HTML apropriado.

Uma iniciativa específica e aprofundada de acessibilidade poderá ser realizada futuramente em uma versão dedicada.

Esta decisão não impede boas práticas básicas de HTML durante a V1.

---

# 15. Imagens

O tratamento de imagens seguirá as práticas padrão recomendadas atualmente pelo Next.js.

A aplicação deverá utilizar `next/image` quando apropriado.

O objetivo é aproveitar recursos como:

- otimização;
- dimensionamento;
- carregamento adequado;
- formatos modernos quando suportados;
- controle de imagens responsivas.

Não serão criados mecanismos próprios de otimização de imagens.

As decisões específicas de tamanho, qualidade e art direction serão tomadas conforme os componentes forem implementados.

---

# 16. Datas e horários

Datas e horários deverão seguir formatos padronizados e compatíveis com sistemas de persistência de dados.

Não serão criados formatos proprietários.

Para valores que representam somente uma data editorial, será utilizado:

```text
YYYY-MM-DD
```

Exemplo:

```text
2026-09-24
```

Para valores que representam data e horário, deverá ser utilizado um formato baseado em ISO 8601, com timezone explícito quando necessário.

Exemplo:

```text
2026-09-24T15:30:00Z
```

A aplicação deverá evitar armazenar datas em formatos dependentes de localização ou apresentação.

A formatação para o usuário será responsabilidade da camada de apresentação.

---

# 17. Git

O Git será utilizado como sistema de versionamento.

A estratégia de trabalho adotada será baseada em **Git Flow**.

A responsabilidade pela criação, organização e manutenção dos commits pertence ao responsável pelo projeto.

Não será criado neste ADR um manual de mensagens de commit ou convenções pessoais de commit.

O objetivo deste documento é registrar apenas que o fluxo de versionamento do projeto seguirá Git Flow.

---

# 18. Testes automatizados

A V1 não terá uma estratégia formal de testes automatizados como requisito obrigatório.

O projeto possui inicialmente pouca lógica de negócio e pouca interação complexa do usuário.

O comportamento da aplicação será validado durante o desenvolvimento e pelo uso direto da aplicação.

Isso não impede a criação de testes quando uma parte do sistema passar a possuir complexidade suficiente para justificar sua automação.

A regra é:

> Testar quando o custo do teste for justificado pela complexidade ou pelo risco da funcionalidade.

Não serão criados testes apenas para aumentar cobertura artificialmente.

---

# 19. Performance

Performance é um requisito do projeto desde a V1.

A aplicação deverá priorizar carregamentos rápidos e baixo custo de execução.

Serão aplicadas inicialmente medidas que não adicionem complexidade desnecessária.

Principais práticas:

- Server Components por padrão;
- evitar JavaScript no cliente sem necessidade;
- utilizar `next/image`;
- evitar dependências desnecessárias;
- utilizar Bootstrap sem carregar soluções paralelas desnecessárias;
- evitar processamento redundante;
- manter dados e componentes com responsabilidades bem definidas;
- utilizar os mecanismos de cache/renderização do Next.js de forma adequada;
- carregar apenas o necessário para cada página.

Não será criado inicialmente um sistema complexo de otimização, monitoramento ou infraestrutura de performance.

A regra é:

```text
ganho de performance simples → aplicar na V1
ganho pequeno + grande complexidade → postergar
```

---

# 20. Dados sensíveis e ambiente

Dados sensíveis nunca deverão ser versionados no Git.

Isso inclui, entre outros:

- chaves privadas;
- tokens;
- credenciais;
- senhas;
- secrets;
- credenciais de serviços externos.

Arquivos de ambiente locais deverão permanecer fora do versionamento quando contiverem informações sensíveis.

Quando necessário, deverá existir um arquivo de exemplo sem valores secretos, como:

```text
.env.example
```

O código não deverá conter credenciais diretamente.

---

# 21. Dependências

Novas dependências deverão ser adicionadas somente quando houver justificativa.

Antes de introduzir uma biblioteca para determinada função, deverá ser verificado se:

1. a própria plataforma já resolve o problema;
2. o Next.js já oferece a funcionalidade;
3. o React já oferece a funcionalidade;
4. o Bootstrap já oferece a funcionalidade;
5. o TypeScript já oferece recursos suficientes.

A preferência será sempre pela solução nativa ou já existente no stack quando ela for adequada.

---

# 22. Abstrações futuras

Não serão criadas abstrações antecipadamente apenas porque determinada funcionalidade poderá existir no futuro.

Exemplo:

Não criar agora:

```text
AbstractContentRepository
GenericContentManager
UniversalContentRenderer
```

apenas porque futuramente poderão existir artigos, santos, liturgia etc.

A abstração deve surgir quando houver uma necessidade concreta.

A arquitetura, entretanto, deverá continuar respeitando as separações já definidas nos ADRs anteriores para permitir evolução posterior.

---

# 23. Critérios de aceitação

Os padrões deste ADR serão considerados atendidos quando:

1. O código utilizar TypeScript sem `any`.
2. Os nomes do domínio forem predominantemente em português.
3. As convenções de nomenclatura seguirem as práticas naturais de TypeScript, React e Next.js.
4. Componentes visuais reutilizáveis forem priorizados.
5. Componentes específicos forem separados somente quando a complexidade justificar.
6. Server Components forem o padrão.
7. `use client` existir somente quando houver necessidade real.
8. Imports e aliases utilizarem os mecanismos naturais do projeto.
9. ESLint e formatação permanecerem próximos dos padrões recomendados pelo ecossistema.
10. Bootstrap for a base estrutural e responsiva da V1.
11. CSS customizado puder ser incorporado posteriormente sem reconstrução da estrutura.
12. Erros inesperados forem registrados sem poluição desnecessária do terminal.
13. Conteúdo inexistente utilizar o tratamento padrão de `404`.
14. Dados forem validados antes de entrar no fluxo da aplicação.
15. As responsabilidades entre Presentation, Domain e Repository forem preservadas.
16. HTML semântico for utilizado na construção das páginas.
17. Imagens utilizarem o mecanismo padrão do Next.js quando apropriado.
18. Datas seguirem formatos padronizados.
19. O fluxo de versionamento seguir Git Flow.
20. Não existirem secrets ou dados sensíveis versionados.
21. Medidas simples de performance forem aplicadas desde a V1.
22. Não sejam introduzidas abstrações ou dependências sem necessidade concreta.

---

# 24. Decisão final deste ADR

O Ecce Homo adotará padrões de desenvolvimento simples, idiomáticos e orientados pelas capacidades naturais das tecnologias escolhidas.

O projeto priorizará:

```text
TypeScript estrito
        ↓
componentes reutilizáveis
        ↓
responsabilidades bem separadas
        ↓
Server Components por padrão
        ↓
Bootstrap como base estrutural
        ↓
CSS customizado posteriormente
        ↓
HTML semântico
        ↓
validação de dados
        ↓
performance desde a V1
```

A regra central é evitar tanto a gambiarra quanto a abstração desnecessária.

O código deverá permanecer simples de entender, simples de manter e preparado para evoluir quando uma necessidade real surgir.
