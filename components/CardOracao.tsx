import Link from "next/link";
import styles from "@/components/cardOracao.module.css";
import { BadgeCategoria } from "@/components/BadgeCategoria";
import { tagsExibidasNoCard } from "@/domain/destaques";

export function CardOracao({
  titulo,
  descricao,
  tags,
  href,
}: {
  titulo: string;
  descricao?: string;
  tags: string[];
  href: string;
}) {
  return (
    <article className="card h-100">
      <div className="card-body d-flex flex-column p-4">
        <h3 className="h6 card-title">{titulo}</h3>
        {descricao ? (
          <p className={`card-text small ${styles.descricao}`}>{descricao}</p>
        ) : null}
        <p className="d-flex flex-wrap gap-1 mb-3">
          {tagsExibidasNoCard(tags, 4).map((tag, indice) => (
            <BadgeCategoria key={`${tag}-${indice}`} tag={tag} />
          ))}
        </p>
        <Link href={href} className="mt-auto">
          Ler oração
        </Link>
      </div>
    </article>
  );
}
