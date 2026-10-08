import type { ReactNode } from "react";
import styles from "@/components/citacaoBiblica.module.css";

type CitacaoBiblicaProps = {
  children: ReactNode;
  referencia: string;
};

export function CitacaoBiblica({ children, referencia }: CitacaoBiblicaProps) {
  return (
    <blockquote className={`${styles.citacao} rounded mb-0`}>
      <i className="bi bi-quote fs-3 text-secondary" aria-hidden="true" />
      <p className="fst-italic mb-3">{children}</p>
      <footer className="blockquote-footer mb-0">{referencia}</footer>
    </blockquote>
  );
}
