import { categoriaDestaque, nomeCategoriaDestaque } from "@/domain/destaques";

export function BadgeCategoria({ tag }: { tag: string }) {
  const destaque = tag === categoriaDestaque;

  return (
    <span
      className={`badge rounded-pill fw-normal ${
        destaque ? "text-bg-warning" : "text-bg-primary"
      }`}
    >
      {destaque ? nomeCategoriaDestaque : tag}
    </span>
  );
}
