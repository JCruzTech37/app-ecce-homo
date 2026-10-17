import assert from "node:assert/strict";
import test from "node:test";
import { repositorioOracoesFirestore } from "../repositorioOracoesFirestore";
import {
  ambienteDeExecucao,
  descreverOrigem,
  executarConsultaFirestore,
  type EventoConsultaFirestore,
} from "./consultaFirestore";

function relogio(...marcas: number[]): () => number {
  let indice = 0;

  return () => {
    const valor = marcas[Math.min(indice, marcas.length - 1)] ?? 0;
    indice += 1;
    return valor;
  };
}

test("descreverOrigem prefere o caminho e remove a consulta", () => {
  assert.equal(
    descreverOrigem({
      caminho: "/oracoes/ave-maria?busca=pai",
      rota: "/oracoes/[slug]",
    }),
    "/oracoes/ave-maria",
  );
});

test("descreverOrigem usa a rota quando não há caminho", () => {
  assert.equal(descreverOrigem({ rota: "/oracoes" }), "/oracoes");
  assert.equal(descreverOrigem({}), "fora-de-requisicao");
});

test("registra sucesso com os campos da consulta", async () => {
  const eventos: EventoConsultaFirestore[] = [];

  const valor = await executarConsultaFirestore(
    "listar-publicadas",
    async (medicao) => {
      medicao.documentos = 4;
      return { texto: "Salve, Rainha." };
    },
    {
      agora: relogio(10, 27.4),
      origem: () => "/oracoes?busca=rainha",
      ambiente: () => "production",
      registrar: (evento) => {
        eventos.push(evento);
      },
    },
  );

  assert.deepEqual(valor, { texto: "Salve, Rainha." });
  assert.equal(eventos.length, 1);
  assert.deepEqual(eventos[0], {
    evento: "firestore",
    operacao: "listar-publicadas",
    origem: "/oracoes",
    ambiente: "production",
    resultado: "sucesso",
    documentos: 4,
    duracaoMs: 17,
  });
  const serializado = JSON.stringify(eventos[0]);
  assert.equal(serializado.includes("Salve, Rainha."), false);
  assert.equal(serializado.includes("busca"), false);
});

test("registra o erro, informa documentos já recebidos e relança a mesma exceção", async () => {
  const eventos: EventoConsultaFirestore[] = [];
  const falha = new Error("Documento de oração inválido.");

  await assert.rejects(
    executarConsultaFirestore(
      "obter-por-slug",
      async (medicao) => {
        medicao.documentos = 1;
        throw falha;
      },
      {
        agora: relogio(0, 8),
        origem: () => "/oracoes/ave-maria",
        ambiente: () => "development",
        registrar: (evento) => {
          eventos.push(evento);
        },
      },
    ),
    (erro: unknown) => erro === falha,
  );

  assert.equal(eventos.length, 1);
  assert.equal(eventos[0]?.resultado, "erro");
  assert.equal(eventos[0]?.documentos, 1);
  assert.equal(eventos[0]?.duracaoMs, 8);
  assert.deepEqual(eventos[0]?.erro, {
    nome: "Error",
    mensagem: "Documento de oração inválido.",
  });
});

test("consulta que falha antes da resposta deixa documentos nulos", async () => {
  const eventos: EventoConsultaFirestore[] = [];

  await assert.rejects(
    executarConsultaFirestore(
      "listar-publicadas",
      async () => {
        throw new Error("rede indisponível");
      },
      {
        origem: () => "/",
        ambiente: () => "test",
        registrar: (evento) => {
          eventos.push(evento);
        },
      },
    ),
  );

  assert.equal(eventos[0]?.documentos, null);
  assert.equal(eventos[0]?.resultado, "erro");
});

test("falha do registro não altera o retorno da consulta", async () => {
  const valor = await executarConsultaFirestore(
    "listar-publicadas",
    async (medicao) => {
      medicao.documentos = 0;
      return "ok";
    },
    {
      registrar: () => {
        throw new Error("log indisponível");
      },
    },
  );

  assert.equal(valor, "ok");
});

test("escreve uma linha JSON e reserva console.error para falha", async () => {
  const informacoes: string[] = [];
  const erros: string[] = [];
  const infoOriginal = console.info;
  const erroOriginal = console.error;
  console.info = (linha?: unknown) => {
    informacoes.push(String(linha));
  };
  console.error = (linha?: unknown) => {
    erros.push(String(linha));
  };

  try {
    await executarConsultaFirestore(
      "listar-publicadas",
      async (medicao) => {
        medicao.documentos = 2;
        return [];
      },
      {
        agora: relogio(1, 4),
        origem: () => "/",
        ambiente: () => "production",
      },
    );

    await assert.rejects(
      executarConsultaFirestore(
        "obter-por-slug",
        async () => {
          throw new Error("falha");
        },
        {
          agora: relogio(1, 3),
          origem: () => "/oracoes/pai-nosso",
          ambiente: () => "development",
        },
      ),
    );
  } finally {
    console.info = infoOriginal;
    console.error = erroOriginal;
  }

  assert.equal(informacoes.length, 1);
  assert.equal(erros.length, 1);
  const sucesso = JSON.parse(informacoes[0] ?? "") as EventoConsultaFirestore;
  const falha = JSON.parse(erros[0] ?? "") as EventoConsultaFirestore;
  assert.equal(sucesso.evento, "firestore");
  assert.equal(sucesso.documentos, 2);
  assert.equal(sucesso.duracaoMs, 3);
  assert.equal(falha.resultado, "erro");
  assert.equal(falha.erro?.mensagem, "falha");
});

test("ambiente distingue desenvolvimento, produção e valor ausente", () => {
  assert.equal(ambienteDeExecucao("production"), "production");
  assert.equal(ambienteDeExecucao("development"), "development");
  assert.equal(ambienteDeExecucao("test"), "test");
  assert.equal(ambienteDeExecucao(undefined), "indefinido");
  assert.equal(ambienteDeExecucao("preview"), "indefinido");
});

test("slug inválido não registra consulta", async () => {
  const linhas: string[] = [];
  const infoOriginal = console.info;
  const erroOriginal = console.error;
  console.info = (linha?: unknown) => {
    linhas.push(String(linha));
  };
  console.error = (linha?: unknown) => {
    linhas.push(String(linha));
  };

  try {
    const oracao = await repositorioOracoesFirestore.obterPorSlug("Ave Maria");
    assert.equal(oracao, null);
  } finally {
    console.info = infoOriginal;
    console.error = erroOriginal;
  }

  assert.deepEqual(linhas, []);
});
