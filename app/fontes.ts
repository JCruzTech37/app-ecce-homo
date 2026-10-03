import { Cinzel, Source_Sans_3 } from "next/font/google";

/** Cinzel nos títulos (H1–H3). Só o peso 600 está definido. */
export const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "600",
  style: "normal",
  display: "swap",
  preload: true,
  variable: "--fonte-cinzel-carregada",
});

/** Source Sans 3 em texto e interface. Pesos 400 e 600; itálico na descrição. */
export const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
  variable: "--fonte-source-sans-3-carregada",
});
