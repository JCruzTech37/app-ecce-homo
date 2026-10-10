import styles from "@/components/jaculatoria.module.css";

export function Jaculatoria({ texto }: { texto: string }) {
  const conteudo = texto.trim();

  if (!conteudo) {
    return null;
  }

  return (
    <aside
      className={`${styles.bloco} bg-light rounded mb-0`}
      aria-label="Jaculatória"
    >
      <p className={`${styles.texto} fst-italic mb-0`}>{conteudo}</p>
    </aside>
  );
}
