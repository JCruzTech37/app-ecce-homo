import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ambienteDeExecucao } from "@/lib/observabilidade/consultaFirestore";
import { cinzel, sourceSans3 } from "./fontes";
import "./tokens.css";
import "./design.css";

export const metadata: Metadata = {
  title: "Ecce Homo",
  description: "Projeto em desenvolvimento.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${cinzel.variable} ${sourceSans3.variable}`}
    >
      <body>
        {children}
        {ambienteDeExecucao() === "production" ? (
          <GoogleAnalytics gaId="G-DF9TGJMXR9" />
        ) : null}
      </body>
    </html>
  );
}
