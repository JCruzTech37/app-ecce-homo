export const idListaOracoes = "lista-oracoes";

export const consultaViewportMobile = "(max-width: 991.98px)";

export function viewportMobile(): boolean {
  return window.matchMedia(consultaViewportMobile).matches;
}

export function hrefComListaOracoes(href: string): string {
  const semHash = href.split("#")[0];

  if (!viewportMobile()) {
    return semHash;
  }

  return `${semHash}#${idListaOracoes}`;
}

export function rolarParaListaOracoes(): void {
  if (!viewportMobile()) {
    return;
  }

  document.getElementById(idListaOracoes)?.scrollIntoView({ block: "start" });
}
