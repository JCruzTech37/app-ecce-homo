import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ReferenciaOracao } from "./ReferenciaOracao";

function html(referencia: {
  icone?: string;
  nome: string;
  link: string;
}): string {
  return renderToStaticMarkup(
    createElement(ReferenciaOracao, { referencia }),
  );
}

test("referência completa tem rótulo, ícone e link em nova aba", () => {
  const marcacao = html({
    icone: "youtube",
    nome: "Comunidade Coração Sacerdotal",
    link: "https://exemplo.com",
  });

  assert.match(marcacao, /<strong>Referência:<\/strong>/);
  assert.match(marcacao, /class="bi bi-youtube me-1"/);
  assert.match(marcacao, /aria-hidden="true"/);
  assert.match(
    marcacao,
    /<a href="https:\/\/exemplo.com" target="_blank" rel="noopener noreferrer">Comunidade Coração Sacerdotal<\/a>/,
  );
  assert.equal(marcacao.includes("btn"), false);
});

test("referência sem ícone mantém o nome clicável", () => {
  const marcacao = html({
    nome: "Instituto Hesed",
    link: "https://hesed.example",
  });

  assert.match(marcacao, /<strong>Referência:<\/strong>/);
  assert.equal(marcacao.includes("<i"), false);
  assert.match(
    marcacao,
    /<a href="https:\/\/hesed.example" target="_blank" rel="noopener noreferrer">Instituto Hesed<\/a>/,
  );
});
