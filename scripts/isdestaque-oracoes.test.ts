import assert from "node:assert/strict";
import test from "node:test";
import {
  type DocumentoDestaque,
  type LeitorDestaques,
  executarConsultaDestaques,
  formatarDestaques,
  selecionarTitulos,
} from "./isdestaque-oracoes";

test("lista um título por linha e o total no final", async () => {
  const linhas: string[] = [];
  const resultado = await executarConsultaDestaques({
    leitor: leitor([
      { titulo: "Salve Rainha" },
      { titulo: "Ave Maria" },
      { titulo: "Credo" },
    ]),
    abrirLeitor: firestoreFechado,
    registrar: (linha) => {
      linhas.push(linha);
    },
  });

  assert.deepEqual(linhas, ["Ave Maria", "Credo", "Salve Rainha", "total 3"]);
  assert.deepEqual(resultado, linhas);
});

test("sem destaques informa total zero", async () => {
  const linhas: string[] = [];
  const resultado = await executarConsultaDestaques({
    leitor: leitor([]),
    abrirLeitor: firestoreFechado,
    registrar: (linha) => {
      linhas.push(linha);
    },
  });

  assert.deepEqual(resultado, ["total 0"]);
  assert.deepEqual(linhas, ["total 0"]);
});

test("título ausente ou vazio não entra na lista nem no total", () => {
  const titulos = selecionarTitulos([
    { titulo: "Pai Nosso" },
    { titulo: "" },
    { titulo: "   " },
    { titulo: 1 },
    { titulo: null },
    { titulo: undefined },
    { titulo: false },
  ]);

  assert.deepEqual(titulos, ["Pai Nosso"]);
  assert.deepEqual(formatarDestaques(titulos), ["Pai Nosso", "total 1"]);
});

test("leitor injetado não abre o Firestore", async () => {
  let abriu = false;
  const resultado = await executarConsultaDestaques({
    leitor: leitor([{ titulo: "Ave Maria" }]),
    abrirLeitor: () => {
      abriu = true;
      throw new Error("Firestore não deveria ser aberto");
    },
    registrar: () => {},
  });

  assert.equal(abriu, false);
  assert.deepEqual(resultado, ["Ave Maria", "total 1"]);
});

function leitor(documentos: DocumentoDestaque[]): LeitorDestaques {
  return {
    async listar() {
      return documentos;
    },
  };
}

function firestoreFechado(): LeitorDestaques {
  throw new Error("Firestore não deveria ser aberto");
}
