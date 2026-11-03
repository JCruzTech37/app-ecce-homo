import Link from "next/link";
import { FormularioBuscaOracao } from "@/components/FormularioBuscaOracao";
import { LogoMarca } from "@/components/LogoMarca";
import { MenuOracoes } from "@/components/MenuOracoes";
import { Rodape } from "@/components/Rodape";

export default function PaginaNovenas() {
  return (
    <>
      <header className="border-bottom bg-white">
        <div className="container py-3">
          <div className="row align-items-center g-3">
            <div className="col-12 col-lg-3">
              <Link href="/" className="text-decoration-none">
                <LogoMarca priority />
              </Link>
            </div>
            <nav
              aria-label="Principal"
              className="col-12 col-lg-5 d-flex flex-wrap justify-content-lg-center gap-3"
            >
              <Link href="/" className="link-secondary text-decoration-none">
                Início
              </Link>
              <MenuOracoes />
              <Link
                href="/sobre"
                className="link-secondary text-decoration-none"
              >
                Sobre
              </Link>
              <Link
                href="/sobre#contato"
                className="link-secondary text-decoration-none"
              >
                Contato
              </Link>
            </nav>
            <div className="col-12 col-lg-4">
              <FormularioBuscaOracao />
            </div>
          </div>
        </div>
      </header>

      <main />

      <Rodape />
    </>
  );
}
