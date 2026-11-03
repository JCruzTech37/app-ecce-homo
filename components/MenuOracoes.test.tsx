import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { itemDoSubmenuAtivo, MenuOracoes } from "./MenuOracoes";

function html(destaque = false): string {
  return renderToStaticMarkup(createElement(MenuOracoes, { destaque }));
}

test("Orações é um botão com submenu e não leva à listagem", () => {
  const marcacao = html();

  assert.match(marcacao, /<button[^>]*>Orações<\/button>/);
  assert.doesNotMatch(marcacao, /<a[^>]*>Orações<\/a>/);
  assert.match(marcacao, /aria-expanded="false"/);
  assert.equal(marcacao.includes("dropdown-menu show"), false);
  assert.match(marcacao, /href="\/oracoes"/);
  assert.match(marcacao, /Lista de orações/);
  assert.match(marcacao, /href="\/novenas"/);
  assert.match(marcacao, />Novenas</);
});

test("o item atual do menu de orações permanece em destaque", () => {
  assert.match(html(true), /fw-semibold/);
  assert.equal(html().includes("fw-semibold"), false);
});

test("sem página atual, os itens do submenu ficam sem destaque", () => {
  const marcacao = html();

  assert.equal(marcacao.includes("border-primary"), false);
  assert.equal(marcacao.includes("bg-primary-subtle"), false);
  assert.equal(marcacao.includes('aria-current="true"'), false);
  assert.match(marcacao, /border-light text-body/);
});

test("o submenu destaca a página de orações ou de novenas", () => {
  assert.equal(itemDoSubmenuAtivo("/oracoes", "/oracoes"), true);
  assert.equal(itemDoSubmenuAtivo("/oracoes/ave-maria", "/oracoes"), true);
  assert.equal(itemDoSubmenuAtivo("/novenas", "/novenas"), true);
  assert.equal(itemDoSubmenuAtivo("/novenas/aparecida", "/novenas"), true);
  assert.equal(itemDoSubmenuAtivo("/oracoes", "/novenas"), false);
  assert.equal(itemDoSubmenuAtivo("/sobre", "/oracoes"), false);
  assert.equal(itemDoSubmenuAtivo(null, "/oracoes"), false);
});
