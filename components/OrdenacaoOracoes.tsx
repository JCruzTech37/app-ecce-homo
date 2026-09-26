"use client";

import { useRouter } from "next/navigation";

const opcoes = [
  ["recentes", "Mais recentes"],
  ["antigas", "Mais antigas"],
  ["az", "De A a Z"],
  ["za", "De Z a A"],
] as const;

export function OrdenacaoOracoes({
  valor,
  busca,
}: {
  valor: string;
  busca: string;
}) {
  const router = useRouter();

  return (
    <label className="d-flex align-items-center gap-2 small mb-0">
      Ordenar por:
      <select
        className="form-select form-select-sm"
        value={valor}
        aria-label="Ordenar por"
        onChange={(evento) => {
          const params = new URLSearchParams();

          if (busca) {
            params.set("busca", busca);
          }

          if (evento.target.value !== "recentes") {
            params.set("ordem", evento.target.value);
          }

          const consulta = params.toString();
          router.push(consulta ? `/oracoes?${consulta}` : "/oracoes");
        }}
      >
        {opcoes.map(([id, rotulo]) => (
          <option key={id} value={id}>
            {rotulo}
          </option>
        ))}
      </select>
    </label>
  );
}
