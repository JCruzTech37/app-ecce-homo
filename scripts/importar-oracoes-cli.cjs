/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

const resolverOriginal = Module._resolveFilename;

Module._resolveFilename = function (pedido, pai, principal, opcoes) {
  if (
    typeof pedido === "string" &&
    pedido.startsWith(".") &&
    pai &&
    typeof pai.filename === "string"
  ) {
    const candidato = path.resolve(path.dirname(pai.filename), pedido);

    if (fs.existsSync(`${candidato}.ts`)) {
      return resolverOriginal.call(
        this,
        `${candidato}.ts`,
        pai,
        principal,
        opcoes,
      );
    }
  }

  return resolverOriginal.call(this, pedido, pai, principal, opcoes);
};

require.extensions[".ts"] = function (modulo, arquivo) {
  const fonte = fs.readFileSync(arquivo, "utf8");
  const { outputText } = ts.transpileModule(fonte, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
    fileName: arquivo,
  });
  modulo._compile(outputText, arquivo);
};

const { executarImportacao } = require("./importar-oracoes.ts");

executarImportacao()
  .then((resultado) => {
    if (
      resultado &&
      Array.isArray(resultado.erros) &&
      resultado.erros.length > 0
    ) {
      process.exitCode = 1;
    }
  })
  .catch((erro) => {
    const mensagem = erro instanceof Error ? erro.message : String(erro);
    console.error(mensagem);
    process.exitCode = 1;
  });
