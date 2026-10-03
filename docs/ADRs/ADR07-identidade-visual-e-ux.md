# ADR07 — Identidade Visual, UX Visual e Design System

**Status:** Em definição
**Data:** 2026-09-28
**Projeto:** Ecce Homo

---

## 1. Contexto

O projeto Ecce Homo iniciou seu desenvolvimento priorizando a definição funcional da aplicação, sua arquitetura, organização dos conteúdos, navegação e regras de negócio.

A identidade visual e os detalhes de apresentação foram deliberadamente deixados para uma etapa posterior, permitindo que as decisões visuais fossem tomadas com a estrutura funcional já estabelecida.

A partir desta etapa, inicia-se a definição formal da identidade visual do projeto, incluindo:

* paleta de cores;
* hierarquia visual;
* tipografia;
* espaçamentos;
* bordas e raios;
* sombras;
* botões;
* links;
* badges;
* estados de interação;
* tratamento de imagens;
* componentes visuais;
* responsividade visual;
* tokens CSS;
* demais padrões necessários à consistência visual da aplicação.

Esta ADR será construída gradualmente. As decisões serão adicionadas conforme forem definidas e validadas visualmente.

O objetivo não é apenas estabelecer uma aparência estética, mas criar um **sistema visual coerente, reutilizável e sustentável**, que possa ser aplicado às diferentes áreas do Ecce Homo sem que cada página desenvolva sua própria identidade.

---

## 2. Direção visual

O Ecce Homo é um projeto católico, centrado em Jesus Cristo, que inicialmente disponibilizará orações e novenas e poderá futuramente incorporar outros conteúdos católicos.

A identidade visual deve refletir esse caráter religioso sem transformar o site em uma página institucional de uma paróquia, santuário, movimento ou confraria específica.

A referência visual inicial escolhida para o projeto é o **Santuário do Senhor Bom Jesus dos Perdões**, especialmente suas características arquitetônicas e ornamentais históricas.

O santuário apresenta elementos característicos de uma igreja histórica, incluindo:

* utilização marcante de dourado;
* presença de vermelho;
* ornamentos clássicos;
* elementos decorativos ricos;
* composição visual tradicional;
* contraste entre elementos claros, dourados e vermelhos.

Essas características serão utilizadas como **referência visual e decorativa**, e não como uma reprodução literal da identidade visual do santuário.

---

## 3. Princípios visuais

A identidade visual deverá observar os seguintes princípios:

### 3.1. Referência histórica

O design poderá utilizar elementos visuais inspirados na estética de igrejas históricas e na ornamentação do Santuário do Senhor Bom Jesus dos Perdões.

O objetivo é transmitir uma sensação de tradição, reverência e permanência.

### 3.2. Dourado e vermelho

O dourado e o vermelho serão elementos fundamentais da identidade visual.

O vermelho deverá funcionar como uma das principais cores de identidade e ação.

O dourado deverá ser utilizado principalmente como elemento de destaque e ornamentação, evitando que seja aplicado de maneira excessiva.

### 3.3. Reverência sem tristeza

A figura do Senhor Bom Jesus dos Perdões possui forte representação da Paixão de Cristo e apresenta uma expressão visual sofrida.

Essa característica deve ser respeitada na identidade do projeto.

Entretanto, o site não deverá utilizar uma estética predominantemente triste, sombria ou pesada.

A identidade deverá buscar equilíbrio entre:

* reverência;
* profundidade;
* tradição;
* solenidade;
* acolhimento;
* clareza;
* conforto visual.

### 3.4. Não utilizar uma estética excessivamente alegre

A identidade visual não deverá utilizar como característica predominante:

* cores excessivamente vibrantes;
* tons festivos;
* combinações visualmente infantis;
* estética excessivamente alegre;
* aparência semelhante a sites comerciais ou de entretenimento.

### 3.5. Não utilizar uma estética dark

O Ecce Homo não deverá assumir uma identidade visual dark.

Cores escuras poderão existir como elementos de contraste, textos ou componentes específicos, mas não deverão dominar a interface.

A utilização de cores escuras deverá preservar a sensação de profundidade e solenidade sem transmitir tristeza, luto ou peso visual.

### 3.6. Conforto visual

O conforto durante a leitura deverá ser uma preocupação fundamental.

O fundo das páginas não deverá utilizar branco puro (`#FFFFFF`) como padrão.

Também não se pretende simplesmente substituir o branco puro por um tom excessivamente claro ou frio que gere desconforto visual.

Os fundos deverão possuir tonalidade quente e suave, mantendo luminosidade suficiente para uma leitura confortável sem exigir que o usuário reduza o brilho da tela para utilizar o site.

---

# 4. Paleta de cores

Após análise das características visuais desejadas e comparação de diferentes alternativas, foi definida a **Paleta 3** como paleta oficial inicial do Ecce Homo.

A paleta combina tons claros e quentes para os fundos, vermelho profundo como identidade principal, dourado como elemento de destaque e um marrom muito escuro para textos.

| Cor       | Função                  |
| --------- | ----------------------- |
| `#EEE7DC` | Fundo principal         |
| `#DDD2C0` | Fundo secundário        |
| `#702126` | Cor primária / vermelho |
| `#4E181B` | Vermelho profundo       |
| `#A77C39` | Dourado / destaque      |
| `#302A26` | Texto principal         |

## 4.1. Fundo principal — `#EEE7DC`

Será utilizado como a cor predominante de fundo das páginas.

Sua função é substituir o branco puro como base da interface, proporcionando uma superfície clara, quente e menos agressiva visualmente.

Deverá ser considerada a cor padrão para áreas amplas da interface.

---

## 4.2. Fundo secundário — `#DDD2C0`

Será utilizado para criar diferenciação visual entre áreas da interface.

Poderá ser aplicado em:

* seções diferenciadas;
* áreas de apoio;
* cards;
* blocos de conteúdo;
* elementos de agrupamento;
* componentes que precisem se destacar do fundo principal.

A utilização deverá preservar a hierarquia visual sem criar excesso de blocos coloridos.

---

## 4.3. Cor primária — `#702126`

É a principal cor de identidade do Ecce Homo.

Representa o vermelho presente na referência visual do Santuário do Senhor Bom Jesus dos Perdões e deverá ser utilizada nos principais elementos de identidade e interação.

Poderá ser aplicada em:

* botões primários;
* links ou elementos de destaque;
* títulos ou elementos específicos;
* navegação;
* indicadores;
* elementos gráficos;
* estados selecionados.

A utilização deverá ser controlada para preservar seu caráter de destaque.

---

## 4.4. Vermelho profundo — `#4E181B`

É a variação escura da cor primária.

Sua função principal é fornecer maior contraste e profundidade à identidade vermelha.

Poderá ser utilizado em:

* estados `hover`;
* estados `active`;
* elementos que necessitem de maior contraste;
* detalhes da navegação;
* áreas de destaque mais intensas;
* elementos decorativos.

Não deverá ser utilizado como cor predominante de fundo de toda a aplicação.

---

## 4.5. Dourado — `#A77C39`

Representa os elementos dourados presentes na arquitetura e ornamentação do santuário utilizado como referência visual.

Será tratado como **cor de destaque e ornamentação**, e não como uma segunda cor primária.

Poderá ser utilizado em:

* detalhes decorativos;
* bordas;
* ícones;
* divisores;
* pequenos destaques;
* elementos relacionados à identidade visual;
* detalhes de componentes.

O uso do dourado deverá ser moderado para evitar uma aparência excessivamente ornamental ou carregada.

---

## 4.6. Texto principal — `#302A26`

Será utilizado como a cor padrão para textos.

A escolha de um tom marrom muito escuro, em vez de preto puro (`#000000`), mantém a temperatura quente da identidade visual e reduz o contraste excessivamente rígido do preto absoluto.

Deverá ser utilizado principalmente em:

* títulos;
* textos de conteúdo;
* descrições;
* navegação;
* informações auxiliares;
* conteúdo das orações.

---

# 5. Princípio de utilização da paleta

A paleta não deverá ser interpretada como uma obrigação de utilizar todas as seis cores em todos os componentes.

Cada cor possui uma função semântica específica.

A interface deverá priorizar:

1. `#EEE7DC` como superfície principal;
2. `#302A26` para conteúdo textual;
3. `#702126` para identidade e ações principais;
4. `#DDD2C0` para diferenciação de superfícies;
5. `#A77C39` para detalhes e ornamentação;
6. `#4E181B` para aprofundamento e estados de maior contraste.

A identidade deverá evitar o uso simultâneo e excessivo de vermelho e dourado em grandes áreas.

O dourado deverá permanecer predominantemente como **detalhe**, enquanto o vermelho deverá assumir o papel de **cor de identidade e interação**.

---

# 6. Evolução desta ADR

Esta ADR permanecerá em construção durante a etapa de refinamento visual.

As próximas decisões deverão ser incorporadas gradualmente, especialmente:

* tipografia;
* escala tipográfica;
* pesos de fonte;
* espaçamento;
* largura máxima de conteúdo;
* raios de borda;
* sombras;
* bordas;
* estilos de botões;
* estilos de links;
* badges;
* cards;
* navegação;
* estados `hover`, `focus` e `active`;
* tratamento de imagens;
* comportamento visual em dispositivos móveis;
* tokens CSS;
* relação entre Bootstrap e os tokens próprios do Ecce Homo.

Somente após essas decisões estarem suficientemente consolidadas deverá ser definida a estrutura final dos **tokens CSS**, que serão utilizados como referência para a implementação no projeto.

---

Sim. Eu registraria agora, mas deixando claro que **a escolha das famílias foi definida e a escala tipográfica detalhada ainda não**.

A seção pode ser adicionada à ADR07 assim:

---

# 7. Tipografia

A tipografia deverá fazer parte da mesma linguagem visual estabelecida para o projeto. A escolha das fontes deve manter coerência com a paleta de cores, a referência histórica do Santuário do Senhor Bom Jesus dos Perdões e o caráter católico do Ecce Homo.

O site terá quantidade significativa de conteúdo textual, especialmente orações, novenas e futuramente outros conteúdos de formação. Portanto, a legibilidade deverá prevalecer sobre características excessivamente ornamentais.

Foram estabelecidas duas famílias tipográficas principais:

* **Cinzel** — títulos e elementos de destaque;
* **Source Sans 3** — textos corridos e elementos de interface que exigem maior legibilidade.

As fontes deverão ser preferencialmente obtidas por meio do **Google Fonts**, facilitando sua utilização e manutenção no projeto.

---

## 7.1. Cinzel

A **Cinzel** será utilizada como fonte temática e de identidade tipográfica do Ecce Homo.

Sua utilização está alinhada à referência arquitetônica e histórica adotada para o projeto, especialmente às características monumentais e clássicas observadas no Santuário do Senhor Bom Jesus dos Perdões.

A Cinzel poderá ser utilizada nos três primeiros níveis da hierarquia de títulos:

* **H1**
* **H2**
* **H3**

Também poderá ser utilizada pontualmente em elementos de grande destaque quando houver justificativa visual.

A utilização da Cinzel não deverá se estender indiscriminadamente ao conteúdo corrido, pois sua função principal é estabelecer identidade, hierarquia e caráter visual.

---

## 7.2. Source Sans 3

A **Source Sans 3** será utilizada como fonte principal para leitura.

Sua função é proporcionar uma experiência confortável para conteúdos extensos, mantendo uma aparência contemporânea que equilibre o caráter histórico da Cinzel.

Será utilizada principalmente em:

* textos das orações;
* descrições;
* textos institucionais;
* conteúdos explicativos;
* navegação;
* botões;
* filtros;
* badges;
* demais elementos de interface.

A Source Sans 3 também poderá ser utilizada em níveis menores da hierarquia de títulos quando a necessidade de legibilidade ou a composição visual justificar sua utilização.

---

## 7.3. Relação entre as famílias

A relação entre as duas fontes deverá permanecer consistente em toda a aplicação.

A **Cinzel** representa o caráter histórico, monumental e temático da identidade visual.

A **Source Sans 3** representa a legibilidade, acessibilidade e contemporaneidade necessárias à utilização cotidiana do site.

A combinação deverá seguir o princípio:

> **Cinzel para identidade e hierarquia; Source Sans 3 para leitura e interface.**

Nenhuma das duas fontes deverá ser utilizada de maneira isolada a ponto de descaracterizar essa relação.

---

## 7.4. Hierarquia tipográfica

A hierarquia inicial definida é:

| Nível               | Fonte         | Função                       |
| ------------------- | ------------- | ---------------------------- |
| H1                  | Cinzel        | Título principal da página   |
| H2                  | Cinzel        | Títulos principais de seções |
| H3                  | Cinzel        | Subtítulos e subdivisões     |
| H4 em diante        | A definir     | Hierarquia secundária        |
| Texto               | Source Sans 3 | Conteúdo corrido             |
| Interface           | Source Sans 3 | Navegação e componentes      |
| Destaques especiais | A definir     | Aplicações específicas       |

Os tamanhos, pesos, `line-height`, `letter-spacing` e demais propriedades tipográficas ainda não estão definidos nesta etapa.

---

## 7.5. Mobile-first

A hierarquia tipográfica deverá ser definida considerando separadamente os contextos **mobile e desktop**.

Não será adotada uma redução automática dos tamanhos desktop como estratégia de responsividade.

A escala deverá considerar:

* legibilidade em telas pequenas;
* quantidade de texto por linha;
* comprimento dos títulos;
* quebra natural de títulos;
* altura das linhas;
* espaçamento entre elementos;
* tamanho adequado das áreas de interação;
* conforto durante a leitura prolongada.

Os valores específicos da escala tipográfica serão definidos posteriormente, durante a etapa de refinamento visual e criação dos tokens CSS.

---

### Estado atual

**Famílias tipográficas definidas:**

* **Cinzel:** H1, H2 e H3;
* **Source Sans 3:** textos corridos e interface, podendo também assumir níveis tipográficos adicionais quando necessário.

**Ainda pendente:**

* tamanhos;
* pesos;
* `line-height`;
* `letter-spacing`;
* escala mobile;
* escala desktop;
* H4 e níveis inferiores;
* aplicação específica em botões, badges, navegação e outros componentes.

Sim. Para esses quatro pontos, eu registraria decisões **convencionais de web design**, adaptadas à nossa paleta e tipografia, sem criar padrões excessivamente específicos.

## 8. Espaçamento

Será adotada uma escala de espaçamento consistente, baseada em múltiplos de **4px**, utilizando os valores mais comuns conforme a necessidade do componente.

Escala base:

| Token | Valor |
| ----- | ----: |
| `xs`  |   4px |
| `sm`  |   8px |
| `md`  |  16px |
| `lg`  |  24px |
| `xl`  |  32px |
| `2xl` |  48px |
| `3xl` |  64px |
| `4xl` |  96px |

A escala deverá ser utilizada para:

* margens;
* paddings;
* espaçamento entre elementos;
* espaçamento entre seções;
* composição de cards e componentes.

Valores intermediários deverão ser evitados sempre que um valor da escala atender adequadamente à necessidade.

---

## 9. Hierarquia visual

A hierarquia visual deverá ser clara e previsível, utilizando principalmente **tamanho, peso, espaçamento e contraste** para estabelecer níveis de importância.

### Desktop

| Elemento         | Fonte         | Tamanho | Peso |
| ---------------- | ------------- | ------: | ---: |
| H1               | Cinzel        |    40px |  600 |
| H2               | Cinzel        |    32px |  600 |
| H3               | Cinzel        |    24px |  600 |
| H4               | Source Sans 3 |    20px |  600 |
| Texto            | Source Sans 3 |    16px |  400 |
| Texto secundário | Source Sans 3 |    14px |  400 |
| Pequeno/auxiliar | Source Sans 3 |    12px |  400 |

### Mobile

| Elemento         | Fonte         | Tamanho | Peso |
| ---------------- | ------------- | ------: | ---: |
| H1               | Cinzel        |    32px |  600 |
| H2               | Cinzel        |    26px |  600 |
| H3               | Cinzel        |    22px |  600 |
| H4               | Source Sans 3 |    18px |  600 |
| Texto            | Source Sans 3 |    16px |  400 |
| Texto secundário | Source Sans 3 |    14px |  400 |
| Pequeno/auxiliar | Source Sans 3 |    12px |  400 |

O tamanho base de texto permanecerá em **16px**, inclusive no mobile, priorizando leitura confortável.

A redução entre desktop e mobile deverá preservar a hierarquia relativa entre os níveis, e não simplesmente reduzir todos os elementos proporcionalmente.

---

## 10. Componentes

Os componentes deverão seguir uma linguagem visual única em toda a aplicação.

### Cards

* Fundo: `#DDD2C0` ou variação adequada da superfície.
* Texto: `#302A26`.
* Títulos: Cinzel.
* Cantos: `8px`.
* Bordas: discretas, quando necessárias.
* Sombra: mínima ou inexistente por padrão.
* Imagens respeitando proporções definidas pelo componente.
* Espaçamento interno: baseado na escala de 4px.

Cards não deverão possuir excesso de ornamentos.

### Botões

**Primário**

* Fundo: `#702126`
* Texto: `#EEE7DC`
* Hover: `#4E181B`
* Border-radius: `6px`
* Altura adequada para interação confortável.

**Secundário**

* Fundo: transparente ou `#DDD2C0`
* Texto: `#702126`
* Borda: `#702126`
* Hover utilizando contraste moderado.

Botões deverão possuir aparência simples e consistente, evitando efeitos decorativos excessivos.

### Links

Links utilizarão prioritariamente `#702126`.

O estado `hover` poderá utilizar `#4E181B`.

Links não deverão depender exclusivamente de cor para comunicar sua função quando isso prejudicar acessibilidade ou compreensão.

### Badges

Badges deverão ser compactos e discretos.

* Fonte: Source Sans 3.
* Tamanho: aproximadamente `12px–14px`.
* Peso: `600`.
* Border-radius: `4px`.
* Cores derivadas da paleta conforme sua finalidade.

Badges não deverão competir visualmente com títulos ou chamadas principais.

### Inputs

* Fonte: Source Sans 3.
* Tamanho: `16px`.
* Fundo: `#EEE7DC`.
* Borda: `#DDD2C0`.
* Border-radius: `6px`.
* Focus utilizando `#702126`.

A prioridade será manter campos reconhecíveis, simples e confortáveis para uso em dispositivos móveis.

---

## 11. Bordas e cantos

A interface deverá utilizar **raios moderados**, evitando tanto componentes excessivamente arredondados quanto uma aparência completamente rígida.

Valores padrão:

| Uso               | Border-radius |
| ----------------- | ------------: |
| Campos e botões   |           6px |
| Cards             |           8px |
| Elementos maiores |           8px |
| Badges            |           4px |

`border-radius` muito elevado, como `999px`, será reservado para elementos que tenham comportamento explicitamente circular ou de pill.

As bordas deverão ser discretas e utilizadas principalmente para:

* separação;
* definição de limites;
* melhoria da leitura da estrutura;
* estados de interação.

A estética geral deverá permanecer mais próxima de uma interface editorial do que de uma interface excessivamente arredondada ou “app-like”.

---

## 12. Imagens e o espaço reservado

A imagem se adequa ao espaço definido pelo componente. O espaço não se adequa à imagem.

O componente define a área disponível, inclusive a proporção. A imagem ocupa toda essa área. Ela não altera a largura, a altura nem a estrutura do bloco para caber inteira.

Quando a proporção do arquivo for diferente da área reservada, o enquadramento corta o excedente. Não permanecem faixas vazias, cinzas ou de placeholder ao redor da imagem.

Essa regra vale para banners, cards e demais blocos que reservam um espaço visual antes de receber a imagem.
