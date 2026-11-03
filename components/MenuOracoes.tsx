"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import styles from "@/components/menuOracoes.module.css";

export function itemDoSubmenuAtivo(
  caminho: string | null,
  href: string,
): boolean {
  if (!caminho) {
    return false;
  }

  return caminho === href || caminho.startsWith(`${href}/`);
}

export function MenuOracoes({ destaque = false }: { destaque?: boolean }) {
  const [aberto, setAberto] = useState(false);
  const idSubmenu = useId();
  const item = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aberto) {
      return;
    }

    function fecharAoClicarFora(evento: MouseEvent) {
      const alvo = evento.target;

      if (!(alvo instanceof Node) || !item.current?.contains(alvo)) {
        setAberto(false);
      }
    }

    function fecharAoEscapar(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        setAberto(false);
      }
    }

    document.addEventListener("click", fecharAoClicarFora);
    document.addEventListener("keydown", fecharAoEscapar);

    return () => {
      document.removeEventListener("click", fecharAoClicarFora);
      document.removeEventListener("keydown", fecharAoEscapar);
    };
  }, [aberto]);

  const caminho = usePathname();
  const classeGatilho = destaque
    ? "link-primary fw-semibold"
    : "link-secondary";

  return (
    <div className="dropdown" ref={item}>
      <button
        type="button"
        className={`${styles.gatilho} dropdown-toggle bg-transparent border-0 p-0 text-decoration-none ${classeGatilho}`}
        aria-expanded={aberto}
        aria-controls={idSubmenu}
        onClick={() => setAberto((atual) => !atual)}
      >
        Orações
      </button>
      <ul
        id={idSubmenu}
        className={`${styles.submenu} dropdown-menu${aberto ? " show" : ""}`}
        aria-label="Orações"
      >
        <li>
          <Link
            href="/oracoes"
            className={classeDoItem(itemDoSubmenuAtivo(caminho, "/oracoes"))}
            aria-current={
              itemDoSubmenuAtivo(caminho, "/oracoes") ? "true" : undefined
            }
            onClick={() => setAberto(false)}
          >
            Lista de orações
          </Link>
        </li>
        <li>
          <Link
            href="/novenas"
            className={classeDoItem(itemDoSubmenuAtivo(caminho, "/novenas"))}
            aria-current={
              itemDoSubmenuAtivo(caminho, "/novenas") ? "true" : undefined
            }
            onClick={() => setAberto(false)}
          >
            Novenas
          </Link>
        </li>
      </ul>
    </div>
  );
}

function classeDoItem(atual: boolean): string {
  return `${styles.texto} d-block text-decoration-none py-2 px-2 border-start border-3 ${
    atual
      ? "border-primary bg-primary-subtle"
      : `border-light text-body ${styles.item}`
  }`;
}
