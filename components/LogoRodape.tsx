"use client";

import Link from "next/link";
import { LogoMarca } from "@/components/LogoMarca";

export function LogoRodape() {
  return (
    <Link
      href="/"
      className="d-inline-block text-decoration-none mb-3"
      onClick={(evento) => {
        if (window.location.pathname === "/") {
          evento.preventDefault();
          window.scrollTo({ top: 0 });
        }
      }}
    >
      <LogoMarca />
    </Link>
  );
}
