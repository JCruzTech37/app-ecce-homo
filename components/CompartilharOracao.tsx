"use client";

import { useEffect, useRef, useState } from "react";

const tempoFeedback = 2000;

function useFeedback(rotuloNormal: string) {
  const [rotulo, setRotulo] = useState(rotuloNormal);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  function mostrar(proximo: string) {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    setRotulo(proximo);
    timer.current = setTimeout(() => {
      setRotulo(rotuloNormal);
      timer.current = null;
    }, tempoFeedback);
  }

  return { rotulo, mostrar };
}

function urlDaPagina(): string {
  return `${window.location.origin}${window.location.pathname}`;
}

async function copiarTexto(texto: string, mostrar: (rotulo: string) => void) {
  try {
    await navigator.clipboard.writeText(texto);
    mostrar("Copiado!");
  } catch {
    mostrar("Erro ao copiar");
  }
}

export function CompartilharOracao({
  titulo,
  texto,
}: {
  titulo: string;
  texto: string;
}) {
  const link = useFeedback("Copiar link");
  const oracao = useFeedback("Copiar oração");
  const [hrefWhatsApp, setHrefWhatsApp] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    const mensagem = `${titulo}\n\n${urlDaPagina()}`;
    setHrefWhatsApp(`https://wa.me/?text=${encodeURIComponent(mensagem)}`);
  }, [titulo]);

  return (
    <div className="d-flex flex-column flex-sm-row flex-wrap gap-2 mb-4">
      <a
        className="btn btn-success"
        href={hrefWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(evento) => {
          if (!hrefWhatsApp) {
            evento.preventDefault();
          }
        }}
      >
        <i className="bi bi-whatsapp me-2" aria-hidden="true" />
        WhatsApp
      </a>
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={() => {
          void copiarTexto(urlDaPagina(), link.mostrar);
        }}
      >
        <i className="bi bi-link-45deg me-2" aria-hidden="true" />
        {link.rotulo}
      </button>
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={() => {
          void copiarTexto(`${titulo}\n\n${texto}`, oracao.mostrar);
        }}
      >
        <i className="bi bi-clipboard me-2" aria-hidden="true" />
        {oracao.rotulo}
      </button>
    </div>
  );
}
