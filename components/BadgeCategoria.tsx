import Link from "next/link";
import { categoriaDestaque, nomeCategoriaDestaque } from "@/domain/destaques";
import { hrefOracoes } from "@/lib/hrefOracoes";

export function BadgeCategoria({ tag }: { tag: string }) {
  const destaque = tag === categoriaDestaque;

  return (
    <Link
      href={hrefOracoes({ categoria: tag })}
      className={`badge rounded-pill text-decoration-none fw-normal ${
        destaque ? "text-bg-warning" : "text-bg-primary"
      }`}
    >
      {destaque ? nomeCategoriaDestaque : tag}
    </Link>
  );
}
