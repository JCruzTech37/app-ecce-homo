# Ecce Homo

Projeto em desenvolvimento.

login do projeto
gcloud auth application-default login

rodar o projeto
npm run dev

## Importar orações

A importação é manual e não faz parte do funcionamento do site. Ela envia para a coleção `prayers` apenas os JSON novos.

1. Coloque os arquivos em `data/prayers/`.
2. Execute:

```bash
FIREBASE_PROJECT_ID=ecce-homo-d948d npm run importar:oracoes
```

3. Confira o resumo: inseridos, ignorados por id, conflitos de slug e erros.
4. Depois de confirmar a importação, remova os JSON de `data/prayers/`.

A importação não invalida o cache do site. Uma oração nova pode demorar até a expiração do cache, de 1 hora, para aparecer publicamente.

## Orações em destaque

Consulta somente leitura. Lista os títulos das orações com `is_destaque` igual a `true` na coleção `prayers`. Nada é gravado nem alterado.

```bash
FIREBASE_PROJECT_ID=ecce-homo-d948d npm run isdestaque:oracoes
```

A saída mostra um título por linha, em ordem alfabética, e o total na última linha. Sem destaques, o resultado é `total 0`.
