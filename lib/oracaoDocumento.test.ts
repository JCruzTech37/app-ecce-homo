import assert from "node:assert/strict";
import test from "node:test";
import { interpretarOracao as interpretarFirestore } from "./repositorioOracoesFirestore";
import { interpretarOracao as interpretarJson } from "./repositorioOracoesJson";
import { conteudoEditorial } from "../scripts/conteudoOracao";

const nova = {
  id: "salve-rainha",
  slug: "salve-rainha",
  titulo: "Salve Rainha",
  texto: "Salve, Rainha.",
  jaculatoria: "Santa Maria, rogai por nós.",
  tags: ["oracoes-marianas"],
  publicado: true,
  createdAt: "2026-09-24T00:00:00.000Z",
  updatedAt: "2026-09-24T00:00:00.000Z",
};

const legada = {
  ...nova,
  imagemVertical: "/images/oracoes/salve-rainha.webp",
  textoAlternativo: "Nossa Senhora coroada",
};

test("JSON novo é lido sem imagem individual", () => {
  const oracao = interpretarJson(nova, "salve-rainha");

  assert.ok(oracao);
  assert.equal(oracao.jaculatoria, "Santa Maria, rogai por nós.");
  assert.equal("imagemVertical" in oracao, false);
  assert.equal("textoAlternativo" in oracao, false);
});

test("JSON legado com imagem continua sendo lido", () => {
  const oracao = interpretarJson(legada, "salve-rainha");

  assert.ok(oracao);
  assert.equal(oracao.titulo, "Salve Rainha");
  assert.equal("imagemVertical" in oracao, false);
  assert.equal("textoAlternativo" in oracao, false);
});

test("JSON sem jaculatória é rejeitado", () => {
  const semJaculatoria: Record<string, unknown> = { ...nova };
  delete semJaculatoria.jaculatoria;

  assert.equal(interpretarJson(semJaculatoria, "salve-rainha"), null);
});

test("documento Firestore novo é lido sem imagem individual", () => {
  const oracao = interpretarFirestore(nova);

  assert.equal(oracao.slug, "salve-rainha");
  assert.equal("imagemVertical" in oracao, false);
});

test("documento Firestore legado com imagem continua sendo lido", () => {
  const oracao = interpretarFirestore(legada);

  assert.equal(oracao.jaculatoria, "Santa Maria, rogai por nós.");
  assert.equal("imagemVertical" in oracao, false);
  assert.equal("textoAlternativo" in oracao, false);
});

test("documento Firestore sem jaculatória é rejeitado", () => {
  const semJaculatoria: Record<string, unknown> = { ...nova };
  delete semJaculatoria.jaculatoria;

  assert.throws(() => interpretarFirestore(semJaculatoria), /inválido/);
});

test("importação aceita JSON novo e preserva campo legado sem exigi-lo", () => {
  const novo = conteudoEditorial(nova);
  const antigo = conteudoEditorial(legada);

  assert.equal("imagemVertical" in novo, false);
  assert.equal("textoAlternativo" in novo, false);
  assert.equal(antigo.imagemVertical, "/images/oracoes/salve-rainha.webp");
  assert.equal(antigo.textoAlternativo, "Nossa Senhora coroada");
  assert.equal("createdAt" in novo, false);
  assert.equal("createdAt" in antigo, false);
});
