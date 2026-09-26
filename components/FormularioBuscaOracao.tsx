"use client";

import { useRouter } from "next/navigation";
import type { FormEvent, KeyboardEvent } from "react";
import { hrefOracoes } from "@/lib/hrefOracoes";

export function FormularioBuscaOracao({
  valor = "",
  ordem,
  categoria,
  placeholder = "Busque uma oração...",
  rotuloCampo = "Busque uma oração",
  rotuloBotao = "Buscar",
  classeBotao = "btn btn-primary",
  classeFormulario,
}: {
  valor?: string;
  ordem?: string;
  categoria?: string;
  placeholder?: string;
  rotuloCampo?: string;
  rotuloBotao?: string;
  classeBotao?: string;
  classeFormulario?: string;
}) {
  const router = useRouter();

  function aoPressionarEnter(evento: KeyboardEvent<HTMLInputElement>) {
    if (evento.key !== "Enter") {
      return;
    }

    evento.preventDefault();
    evento.currentTarget.form?.requestSubmit();
  }

  function pesquisar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const dados = new FormData(evento.currentTarget);
    const texto = String(dados.get("busca") ?? "").trim().slice(0, 50);
    router.push(hrefOracoes({ busca: texto, ordem, categoria }));
  }

  return (
    <form className={classeFormulario} onSubmit={pesquisar}>
      <div className="input-group">
        <input
          key={valor}
          type="search"
          name="busca"
          className="form-control"
          placeholder={placeholder}
          aria-label={rotuloCampo}
          maxLength={50}
          defaultValue={valor}
          onKeyDown={aoPressionarEnter}
        />
        <button type="submit" className={classeBotao} aria-label={rotuloBotao}>
          <i className="bi bi-search" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
