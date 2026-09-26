# ADR06 — Importação de Orações para o Firestore

## Status

Aceito.

## Contexto

O projeto Ecce Homo utiliza arquivos JSON em `data/prayers/` como fonte editorial para preparação e versionamento das orações.

O conteúdo publicado pela aplicação é armazenado no Firestore, na coleção:

`prayers`

A importação dos arquivos JSON para o Firestore é realizada pelo script:

`scripts/importar-oracoes.ts`

A primeira implementação desse processo foi validada com cinco orações:

- `ave-maria`
- `credo`
- `pai-nosso`
- `salve-rainha`
- `sub-tuum`

A importação foi validada como idempotente: uma nova execução não cria documentos duplicados.

## Decisão

O projeto manterá `scripts/importar-oracoes.ts` como ferramenta interna oficial para importar orações preparadas em `data/prayers/` para a coleção `prayers` do Firestore.

A coleção não será criada manualmente pelo desenvolvedor no Firebase Console. Ela será criada pelo próprio Firestore quando o primeiro documento for importado.

## Fonte dos dados

Os arquivos localizados em:

`data/prayers/*.json`

são a fonte editorial dos dados das orações.

O script deverá preservar os dados definidos pelo modelo `Prayer` estabelecido em `ADR03-modelo-de-conteudo-oracoes.md`.

O script não deve inventar ou alterar conteúdo editorial das orações.

## Identificação dos documentos

Cada documento da coleção `prayers` utilizará como ID o valor do campo `id` presente no respectivo JSON.

Exemplo:

```text
data/prayers/ave-maria.json
        ↓
prayers/ave-maria
````

O `id` deve ser único entre as orações.

O script não deve gerar IDs aleatórios para documentos de oração.

## Idempotência

A importação deverá ser idempotente.

Executar o script várias vezes com os mesmos JSONs não deve criar documentos duplicados.

Quando um documento já existir, sua identificação continuará sendo o mesmo `id`.

A operação de importação poderá atualizar os dados do documento correspondente ao JSON, mantendo a mesma identidade do documento.

## Datas de criação e atualização

As datas de persistência no Firestore serão controladas pelo script de importação.

### `createdAt`

`createdAt` representa a data/hora em que o documento foi criado no Firestore.

Quando o documento ainda não existir, o script deverá preencher `createdAt` automaticamente.

Em reimportações de um documento existente, `createdAt` deverá ser preservado e não substituído pela data da nova importação.

### `updatedAt`

`updatedAt` representa a última importação/atualização do documento.

A cada importação de um documento existente, o script deverá atualizar automaticamente `updatedAt`.

Dessa forma:

```text
Primeira importação:

createdAt = momento da criação
updatedAt = momento da criação


Nova importação:

createdAt = permanece igual
updatedAt = novo momento da importação

O desenvolvedor não precisa preencher manualmente essas datas para realizar uma importação.

## Modelo de conteúdo

O script deverá respeitar o modelo definido em:

`docs/ADRs/ADR03-modelo-de-conteudo-oracoes.md`

Os campos editoriais não devem ser transformados ou reinterpretados durante a importação.

O texto da oração continuará sendo texto simples, preservando suas quebras de linha.

Não será permitido inserir HTML no campo `texto` durante o processo de importação.

## Processo de importação

O fluxo oficial será:

```text
data/prayers/*.json
        ↓
scripts/importar-oracoes.ts
        ↓
Firebase Admin
        ↓
Firestore
        ↓
prayers/{id}
```

O script deverá:

1. localizar os JSONs de oração;
2. ler os arquivos;
3. validar minimamente sua estrutura conforme o modelo vigente;
4. determinar o ID através do campo `id`;
5. verificar/criar o documento correspondente;
6. preencher `createdAt` somente quando necessário;
7. atualizar `updatedAt` em cada importação;
8. persistir os dados no Firestore;
9. informar o resultado da operação.

## Segurança

A importação deverá utilizar a infraestrutura server-side já existente em `lib/firebase/admin.ts`.

A autenticação deverá continuar utilizando Application Default Credentials (ADC) no ambiente local.

O script não deverá:

* utilizar chave privada JSON de Service Account;
* utilizar `FIREBASE_PRIVATE_KEY`;
* utilizar `FIREBASE_CLIENT_EMAIL`;
* armazenar credenciais no código;
* armazenar credenciais nos JSONs de conteúdo.

## Proteção contra exclusões acidentais

A importação de um conjunto de JSONs não significa que documentos ausentes nos JSONs devam ser removidos do Firestore.

O script não deverá excluir automaticamente documentos da coleção `prayers` apenas porque seus respectivos JSONs não estão presentes na execução atual.

A exclusão de uma oração do Firestore deverá ser uma operação explícita e separada.

## Imagens

O campo `imagemVertical` continuará armazenando uma referência ao recurso de imagem conforme definido pelo modelo atual.

Neste estágio, as imagens permanecem no projeto em:

`public/images/oracoes/`

O processo de importação não fará upload de imagens para o Firebase Storage.

## Escopo

Este ADR trata exclusivamente da importação e sincronização dos dados de orações entre os JSONs locais e o Firestore.

Este ADR não define:

* interface administrativa;
* autenticação de usuários;
* edição de conteúdo pelo navegador;
* comentários;
* filtros;
* busca;
* paginação;
* publicação automática;
* Firebase Storage;
* importação de novenas;
* Repository utilizado pela aplicação para leitura das orações.

Esses assuntos deverão ser definidos separadamente quando necessário.

## Consequências

### Positivas

* O conteúdo pode ser preparado em quantidade diretamente nos arquivos JSON.
* Os JSONs permanecem versionáveis no Git.
* O processo de publicação para o Firestore é reproduzível.
* A importação pode ser executada várias vezes sem duplicação.
* `createdAt` e `updatedAt` deixam de depender de preenchimento manual.
* O Firestore passa a ter uma fonte de conteúdo consistente.
* O processo pode ser reutilizado para grandes lotes de orações.

### Negativas

* O conteúdo precisa ser preparado corretamente nos JSONs antes da importação.
* Alterações feitas diretamente no Firestore não são automaticamente refletidas nos JSONs.
* A ferramenta de importação é uma operação interna e não uma interface administrativa.

## Procedimento operacional

Para adicionar novas orações:

1. Criar os JSONs em `data/prayers/`.
2. Validar o conteúdo conforme `ADR03`.
3. Executar `scripts/importar-oracoes.ts`.
4. Confirmar a quantidade de documentos importados/atualizados.
5. Verificar eventuais erros reportados pelo script.

O script deve permanecer como ferramenta interna do projeto e poderá ser utilizado novamente sempre que uma nova quantidade de orações estiver preparada.

## Relação com outros ADRs

* `ADR03-modelo-de-conteudo-oracoes.md` — define o modelo dos dados importados.
* `ADR02-arquitetura.md` — define a separação entre apresentação, domínio, repositories e fonte de dados.
* `ADR05-padroes-de-desenvolvimento.md` — define os padrões técnicos utilizados pelo script e pela infraestrutura.

````

### Uma decisão que eu considero importante

Eu **manteria os `createdAt`/`updatedAt` nos JSONs por enquanto? Não**.

Como agora o script é o responsável por essas informações, podemos simplificar o conteúdo editorial e deixar:

```text
JSON
├── conteúdo editorial
├── id
├── slug
├── publicado
└── demais campos do Prayer

Script
├── createdAt
└── updatedAt
````

