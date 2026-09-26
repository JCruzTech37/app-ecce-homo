"use client";

import { useRouter } from "next/navigation";
import { hrefOracoes } from "@/lib/hrefOracoes";

const opcoes = [
  ["recentes", "Mais recentes"],
  ["antigas", "Mais antigas"],
  ["az", "De A a Z"],
  ["za", "De Z a A"],
] as const;

export function OrdenacaoOracoes({
  valor,
  busca,
  categoria,
}: {
  valor: string;
  busca: string;
  categoria?: string;
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
          router.push(
            hrefOracoes({
              busca,
              ordem: evento.target.value,
              categoria,
            }),
          );
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
