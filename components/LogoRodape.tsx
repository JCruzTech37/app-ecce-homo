"use client";

import Link from "next/link";

export function LogoRodape() {
  return (
    <Link
      href="/"
      className="d-block fs-5 fw-semibold text-primary text-decoration-none mb-1"
      onClick={(evento) => {
        if (window.location.pathname === "/") {
          evento.preventDefault();
          window.scrollTo({ top: 0 });
        }
      }}
    >
      Ecce Homo
    </Link>
  );
}
