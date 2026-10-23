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

const referenciaCompleta = {
  icone: "youtube",
  nome: "Comunidade Coração Sacerdotal",
  link: "https://exemplo.com",
};

test("documento sem referencia continua igual", () => {
  const json = interpretarJson(nova, "salve-rainha");
  const firestore = interpretarFirestore(nova);

  assert.ok(json);
  assert.equal("referencia" in json, false);
  assert.equal("referencia" in firestore, false);
});

test("referencia completa é lida no JSON e no Firestore", () => {
  const documento = { ...nova, referencia: referenciaCompleta };
  const json = interpretarJson(documento, "salve-rainha");
  const firestore = interpretarFirestore(documento);

  assert.deepEqual(json?.referencia, referenciaCompleta);
  assert.deepEqual(firestore.referencia, referenciaCompleta);
});

test("referencia sem icone mantém nome e link", () => {
  const documento = {
    ...nova,
    referencia: {
      nome: " Instituto Hesed ",
      link: " https://hesed.example ",
    },
  };
  const oracao = interpretarFirestore(documento);

  assert.deepEqual(oracao.referencia, {
    nome: "Instituto Hesed",
    link: "https://hesed.example",
  });
  assert.equal(oracao.referencia?.icone, undefined);
});

test("referencia sem nome ou sem link válido não é exibida", () => {
  const semNome = interpretarFirestore({
    ...nova,
    referencia: { link: "https://exemplo.com" },
  });
  const semLink = interpretarFirestore({
    ...nova,
    referencia: { nome: "Padre Paulo Ricardo" },
  });
  const linkInvalido = interpretarJson(
    {
      ...nova,
      referencia: {
        nome: "Comunidade Shalom",
        link: "javascript:alert(1)",
      },
    },
    "salve-rainha",
  );
  const nomeVazio = interpretarJson(
    {
      ...nova,
      referencia: { nome: "   ", link: "https://exemplo.com" },
    },
    "salve-rainha",
  );

  const vazia = interpretarFirestore({ ...nova, referencia: {} });

  assert.equal(semNome.referencia, undefined);
  assert.equal(semLink.referencia, undefined);
  assert.equal(vazia.referencia, undefined);
  assert.ok(linkInvalido);
  assert.equal(linkInvalido.referencia, undefined);
  assert.ok(nomeVazio);
  assert.equal(nomeVazio.referencia, undefined);
});

test("aceita ícones sociais e os demais nomes já usados no site", () => {
  for (const icone of ["youtube", "instagram", "whatsapp", "link-45deg"]) {
    const oracao = interpretarFirestore({
      ...nova,
      referencia: {
        icone,
        nome: "Fonte",
        link: "https://exemplo.com",
      },
    });

    assert.equal(oracao.referencia?.icone, icone);
  }
});

test("icone fora do padrão não impede a referência", () => {
  const oracao = interpretarFirestore({
    ...nova,
    referencia: {
      icone: "YouTube",
      nome: "Padre Paulo Ricardo",
      link: "https://exemplo.com/oracao",
    },
  });

  assert.equal(oracao.referencia?.icone, undefined);
  assert.equal(oracao.referencia?.nome, "Padre Paulo Ricardo");
  assert.equal(oracao.referencia?.link, "https://exemplo.com/oracao");
});

test("referencia com tipo inválido rejeita o documento", () => {
  const invalida = { ...nova, referencia: { nome: 1, link: "https://exemplo.com" } };

  assert.throws(() => interpretarFirestore(invalida), /inválido/);
  assert.equal(interpretarJson(invalida, "salve-rainha"), null);
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
  assert.equal("referencia" in novo, false);

  const comReferencia = conteudoEditorial({
    ...nova,
    referencia: referenciaCompleta,
  });
  assert.deepEqual(comReferencia.referencia, referenciaCompleta);
});
