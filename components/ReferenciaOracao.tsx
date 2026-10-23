import type { ReferenciaOracao as DadosReferencia } from "@/types/oracao";

export function ReferenciaOracao({
  referencia,
}: {
  referencia: DadosReferencia;
}) {
  return (
    <p className="mt-5 mb-4">
      <strong>Referência:</strong>{" "}
      {referencia.icone ? (
        <i
          className={`bi bi-${referencia.icone} me-1`}
          aria-hidden="true"
        />
      ) : null}
      <a href={referencia.link} target="_blank" rel="noopener noreferrer">
        {referencia.nome}
      </a>
    </p>
  );
}
