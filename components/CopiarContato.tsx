"use client";

import { useState } from "react";
import styles from "@/components/copiarContato.module.css";

const email = "contato@portaleccehomo.com.br";

export function CopiarContato() {
  const [rotulo, setRotulo] = useState("Copiar contato");

  async function copiar() {
    try {
      await navigator.clipboard.writeText(email);
      setRotulo("Copiado!");
    } catch {
      setRotulo("Erro ao copiar");
    }

    window.setTimeout(() => setRotulo("Copiar contato"), 2000);
  }

  return (
    <div>
      <a href={`mailto:${email}`} className={styles.email}>
        {email}
      </a>
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={() => {
          void copiar();
        }}
      >
        <i className="bi bi-clipboard me-2" aria-hidden="true" />
        {rotulo}
      </button>
    </div>
  );
}
