# ADR03 — Modelo de Conteúdo: Orações

**Status:** Aprovado  
**Data:** 2026-09-24  
**Projeto:** Ecce Homo

---

## 1. Contexto

O Ecce Homo será iniciado como uma plataforma católica de orações e novenas.

Embora a V1 contemple os dois tipos de conteúdo, a modelagem será feita de forma incremental. Este documento define exclusivamente o modelo de conteúdo de **orações**.

A modelagem de novenas será definida em um documento próprio quando essa parte do projeto for iniciada.

O objetivo é manter o modelo de oração simples, claro e suficiente para:

- exibir uma oração individual;
- exibir orações em listas e cards;
- classificar uma oração em múltiplas categorias;
- alimentar seções dinâmicas da Home;
- gerar metadados de SEO;
- permitir evolução futura sem acoplar o conteúdo à apresentação visual.

---

## 2. Decisão

Uma oração será representada por um objeto `Prayer`, armazenado inicialmente em JSON.

O modelo será dividido conceitualmente em:

```text
Prayer
├── Identidade
├── Conteúdo
├── Apresentação editorial
├── Classificação
└── Controle técnico
```

A estrutura não utilizará, neste momento, um sistema genérico de blocos (`content[]`).

Para o conteúdo textual de uma oração será utilizado um único campo `texto`, preservando quebras de linha. A camada de apresentação será responsável por transformar esse texto em HTML adequado.

As frases utilizadas no header e no footer global do site não fazem parte de `Prayer`.

---

# 3. Estrutura do modelo

## 3.1 Identidade

### `id` — obrigatório

Identificador interno e estável da oração.

```json
"id": "salve-rainha"
```

Regras:

- deve ser único;
- deve permanecer estável depois que o conteúdo for publicado;
- deve utilizar uma representação simples e previsível;
- não deve depender do título exibido.

### `slug` — obrigatório

Identificador utilizado na URL pública.

```json
"slug": "salve-rainha"
```

Resultará em:

```text
/oracoes/salve-rainha
```

Regras:

- deve ser único entre as orações;
- deve ser legível;
- deve ser estável;
- deve ser compatível com URL;
- deve utilizar letras minúsculas, números e hífens;
- alterações de slug após publicação devem ser evitadas.

---

# 4. Conteúdo

## 4.1 `titulo` — obrigatório

Nome principal da oração.

```json
"titulo": "Salve Rainha"
```

Utilização:

- título da página;
- título de cards;
- listagens;
- navegação;
- base para geração automática de metadados.

## 4.2 `descricao` — opcional

Resumo curto da oração.

```json
"descricao": "Uma das mais tradicionais orações marianas da Igreja Católica."
```

Utilização:

- cards;
- listagens;
- Home;
- conteúdos relacionados;
- descrição da página;
- base para SEO quando não houver uma descrição específica.

A descrição não deve reproduzir integralmente o texto da oração.

## 4.3 `texto` — obrigatório

Texto integral da oração.

```json
"texto": "Salve, Rainha, Mãe de misericórdia,\nvida, doçura e esperança nossa, salve!\n\nA vós bradamos, os degredados filhos de Eva;\na vós suspiramos, gemendo e chorando\nneste vale de lágrimas.\n\nAmém."
```

Regras:

- deve ser texto puro;
- pode conter quebras de linha;
- não deve conter HTML;
- não deve conter classes CSS ou informações de apresentação;
- a interpretação visual das quebras de linha será responsabilidade dos componentes React.

Não será utilizado, neste momento:

```json
"texto": "<p>Salve, Rainha...</p>"
```

A separação entre conteúdo e apresentação deve ser preservada.

---

# 5. Apresentação editorial

Esses campos representam informações editoriais associadas à oração que serão utilizadas pelos componentes da página.

## 5.1 `imagemVertical` — obrigatório

Referência da imagem principal vertical associada à oração.

```json
"imagemVertical": "/images/oracoes/salve-rainha.webp"
```

A imagem será utilizada principalmente na apresentação desktop da oração.

O campo armazena uma referência ao recurso, não os dados binários da imagem.

## 5.2 `textoAlternativo` — obrigatório

Texto alternativo da imagem principal.

```json
"textoAlternativo": "Nossa Senhora coroada, com as mãos postas em oração"
```

Objetivos:

- acessibilidade;
- descrição semântica da imagem;
- utilização pelo atributo `alt` do elemento `<img>`.

O texto deve descrever objetivamente o conteúdo visual relevante da imagem.

## 5.3 `jaculatoria` — obrigatório

Texto curto associado à imagem principal, apresentado pelo componente visual da oração.

```json
"jaculatoria": "Santa Maria, Mãe de Deus, rogai por nós."
```

A apresentação desse conteúdo pertence ao componente React. O JSON deve armazenar somente o texto.

## 5.4 `fraseSanto` — opcional

Frase, oração ou trecho atribuído a um santo ou outra fonte religiosa que acompanhe visualmente a oração.

```json
"fraseSanto": "Nunca se ouviu dizer que algum daqueles que tenha recorrido à vossa proteção, implorado a vossa assistência e reclamado o vosso socorro tenha sido abandonado."
```

O campo é opcional porque nem toda oração necessariamente terá uma frase complementar.

## 5.5 `fraseSantoAutor` — opcional

Autor da `fraseSanto`.

```json
"fraseSantoAutor": "São Bernardo de Claraval"
```

Deve ser utilizado em conjunto com `fraseSanto`.

Se `fraseSanto` não existir, `fraseSantoAutor` também não deve ser preenchido.

---

# 6. Classificação

## 6.1 `tags` — obrigatório

Lista de identificadores de classificação associados à oração.

```json
"tags": [
  "oracoes-marianas",
  "nossa-senhora",
  "oracoes-tradicionais"
]
```

Uma oração pode possuir múltiplas tags.

As tags serão utilizadas para:

- categorias;
- filtros;
- listagens;
- conteúdos relacionados;
- seleção de conteúdo para seções da Home;
- futuras funcionalidades de busca.

Os valores armazenados serão identificadores técnicos (`slug`), e não os nomes de apresentação.

Exemplo recomendado:

```json
"tags": [
  "oracoes-marianas"
]
```

Não:

```json
"tags": [
  "Orações Marianas"
]
```

A taxonomia visual poderá posteriormente associar um nome de apresentação a cada tag.

---

# 7. Controle técnico

## 7.1 `publicado` — obrigatório

Indica se a oração pode ser apresentada publicamente.

```json
"publicado": true
```

Valores:

```text
true  → conteúdo disponível publicamente
false → conteúdo não disponível publicamente
```

O domínio da aplicação deve impedir que conteúdos não publicados apareçam nas páginas públicas.

## 7.2 `createdAt` — obrigatório

Data de criação do conteúdo.

```json
"createdAt": "2026-09-24"
```

Formato:

```text
YYYY-MM-DD
```

## 7.3 `updatedAt` — obrigatório

Data da última alteração do conteúdo.

```json
"updatedAt": "2026-09-24"
```

Formato:

```text
YYYY-MM-DD
```

Deve ser atualizada sempre que houver alteração relevante no conteúdo.

---

# 8. SEO

## 8.1 `seoTitle` — opcional

Título específico para mecanismos de busca e metadados da página.

```json
"seoTitle": "Salve Rainha — Oração Católica"
```

Quando não informado, a aplicação poderá gerar automaticamente um título a partir de `titulo`.

Exemplo:

```text
Salve Rainha | Ecce Homo
```

## 8.2 `seoDescription` — opcional

Descrição específica para mecanismos de busca.

```json
"seoDescription": "Reze a oração Salve Rainha, uma das tradicionais orações marianas da Igreja Católica."
```

Quando não informado, a aplicação poderá utilizar `descricao` como fallback.

---

# 9. Campos fora do modelo de oração

As frases utilizadas no header e footer gerais do site **não pertencem ao objeto `Prayer`**.

Por exemplo, frases como:

```text
"Maria sempre nos conduz a Jesus."
"São João Paulo II"
```

ou:

```text
"Tudo por Jesus, nada sem Maria."
"São Luís Maria Grignion de Montfort"
```

não devem ser repetidas em cada oração.

Esses elementos pertencem à configuração ou composição geral do site e serão tratados separadamente.

Essa decisão evita duplicação de conteúdo e permite alterar elementos globais sem modificar todos os registros de oração.

---

# 10. Exemplo completo

```json
{
  "id": "salve-rainha",
  "slug": "salve-rainha",

  "titulo": "Salve Rainha",
  "descricao": "Uma das mais tradicionais orações marianas da Igreja Católica.",

  "texto": "Salve, Rainha, Mãe de misericórdia,\nvida, doçura e esperança nossa, salve!\n\nA vós bradamos, os degredados filhos de Eva;\na vós suspiramos, gemendo e chorando\nneste vale de lágrimas.\n\nEia, pois, advogada nossa,\nesses vossos olhos misericordiosos a nós volvei;\ne depois deste desterro, mostrai-nos Jesus,\nbendito fruto do vosso ventre.\n\nÓ clemente, ó piedosa, ó doce sempre Virgem Maria!\n\nR. Rogai por nós, Santa Mãe de Deus,\npara que sejamos dignos das promessas de Cristo.\n\nAmém.",

  "imagemVertical": "/images/oracoes/salve-rainha.webp",
  "textoAlternativo": "Nossa Senhora coroada, com as mãos postas em oração",

  "jaculatoria": "Santa Maria, Mãe de Deus, rogai por nós.",

  "fraseSanto": "Nunca se ouviu dizer que algum daqueles que tenha recorrido à vossa proteção, implorado a vossa assistência e reclamado o vosso socorro tenha sido abandonado.",
  "fraseSantoAutor": "São Bernardo de Claraval",

  "tags": [
    "oracoes-marianas",
    "nossa-senhora",
    "oracoes-tradicionais"
  ],

  "publicado": true,

  "createdAt": "2026-09-24",
  "updatedAt": "2026-09-24",

  "seoTitle": "Salve Rainha — Oração Católica",
  "seoDescription": "Reze a oração Salve Rainha, uma das tradicionais orações marianas da Igreja Católica."
}
```

---

# 11. Resumo dos campos

| Campo | Obrigatório | Finalidade |
|---|---:|---|
| `id` | Sim | Identificador interno |
| `slug` | Sim | URL pública |
| `titulo` | Sim | Nome da oração |
| `descricao` | Não | Resumo curto |
| `texto` | Sim | Texto integral |
| `imagemVertical` | Sim | Imagem principal |
| `textoAlternativo` | Sim | Acessibilidade da imagem |
| `jaculatoria` | Sim | Texto associado à imagem |
| `fraseSanto` | Não | Frase/trecho complementar |
| `fraseSantoAutor` | Não | Autor da frase |
| `tags` | Sim | Classificação |
| `publicado` | Sim | Estado de publicação |
| `createdAt` | Sim | Data de criação |
| `updatedAt` | Sim | Data de atualização |
| `seoTitle` | Não | Título SEO específico |
| `seoDescription` | Não | Descrição SEO específica |

---

# 12. Validações mínimas

O modelo deverá ser validado para garantir, no mínimo:

- `id` preenchido;
- `slug` preenchido;
- `slug` único;
- `titulo` preenchido;
- `texto` preenchido;
- `imagemVertical` preenchida;
- `textoAlternativo` preenchido;
- `jaculatoria` preenchida;
- `tags` existente e contendo identificadores válidos;
- `publicado` booleano;
- `createdAt` em formato válido;
- `updatedAt` em formato válido;
- `fraseSantoAutor` somente quando `fraseSanto` estiver presente;
- `seoTitle` e `seoDescription` opcionais.

A estratégia exata de validação — somente TypeScript, schema validation ou combinação das duas — será definida posteriormente na etapa de implementação.

---

# 13. Organização dos arquivos JSON

A estrutura inicial prevista para o conteúdo é:

```text
src/
└── data/
    └── prayers/
        ├── ave-maria.json
        ├── salve-rainha.json
        ├── pai-nosso.json
        └── ...
```

Cada oração será um arquivo JSON independente.

Isso facilita:

- criação de novas orações;
- manutenção editorial;
- versionamento no Git;
- revisão individual de conteúdo;
- futura migração para outra fonte de dados.

A camada de Repository será responsável por localizar e carregar esses arquivos. Componentes React e páginas não deverão importar os JSON diretamente.

---

# 14. Evolução futura

Este modelo foi deliberadamente mantido simples.

Não fazem parte deste ADR:

- novenas;
- dias de novena;
- artigos;
- catequeses;
- santos;
- liturgia;
- áudio;
- vídeo;
- comentários;
- favoritos;
- usuários;
- CMS;
- Firestore;
- sistema administrativo.

A inclusão dessas funcionalidades deverá ocorrer em decisões/modelos próprios, preservando a separação entre os diferentes tipos de conteúdo.

O modelo de `Prayer` também não deve ser alterado apenas para antecipar necessidades que ainda não existem.

---

# 15. Critérios de aceitação

O modelo será considerado adequado para a V1 quando for possível:

1. Criar uma nova oração adicionando apenas o conteúdo necessário.
2. Exibir a oração em sua página individual.
3. Exibir a oração em listas e cards.
4. Classificar uma oração em múltiplas tags.
5. Selecionar orações por tag.
6. Exibir imagem e texto alternativo.
7. Exibir ou ocultar a frase complementar de santo.
8. Controlar se a oração está publicada.
9. Gerar metadados SEO automaticamente quando os campos específicos não forem informados.
10. Permitir que a camada de apresentação seja alterada sem alterar a estrutura fundamental do conteúdo.
11. Permitir futuramente substituir o JSON por outra fonte de dados através da camada de Repository.

---

## 16. Decisão final deste ADR

Para a primeira implementação do Ecce Homo, `Prayer` será um modelo de conteúdo simples, estruturado e independente da interface.

A oração não utilizará um sistema genérico de blocos neste momento.

As frases globais do header e footer ficarão fora do modelo de oração.

Novenas serão modeladas separadamente quando essa etapa do projeto for iniciada.
