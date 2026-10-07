"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "@/app/bannerInicial.module.css";

const intervaloMs = 8000;
const transicaoMs = 600;

/**
 * Passos do ciclo: slide 2, slide 3, slide 2, slide 1.
 * O índice 1 (Ecce Homo) é o centro e reaparece entre os outros dois.
 */
const ciclo = [1, 2, 1, 0] as const;

const rotulos = ["São José", "Ecce Homo", "Nossa Senhora das Dores"] as const;

function classeBotao() {
  return "btn btn-primary btn-ver-oracoes";
}

export function CarrosselBannerInicial() {
  const [passo, setPasso] = useState(0);
  const [sobPonteiro, setSobPonteiro] = useState(false);
  const [comFoco, setComFoco] = useState(false);
  const [saindo, setSaindo] = useState<number | null>(null);
  const indicadores = useRef<Array<HTMLButtonElement | null>>([]);
  const indiceAtual = useRef<number>(ciclo[0]);
  const temporizador = useRef<number | null>(null);
  const indice = ciclo[passo];
  const pausado = sobPonteiro || comFoco;

  useEffect(() => {
    if (indiceAtual.current === indice) {
      return;
    }

    setSaindo(indiceAtual.current);
    indiceAtual.current = indice;

    if (temporizador.current !== null) {
      window.clearTimeout(temporizador.current);
    }

    temporizador.current = window.setTimeout(() => {
      setSaindo(null);
      temporizador.current = null;
    }, transicaoMs);
  }, [indice]);

  useEffect(() => {
    if (pausado) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const id = window.setInterval(() => {
      setPasso((atual) => (atual + 1) % ciclo.length);
    }, intervaloMs);

    return () => window.clearInterval(id);
  }, [pausado, passo]);

  function selecionar(destino: 0 | 1 | 2) {
    setPasso((atual) => {
      if (destino === 1) {
        if (atual === 1) {
          return 2;
        }
        if (atual === 3) {
          return 0;
        }
        return atual;
      }

      if (destino === 2) {
        return 1;
      }

      return 3;
    });
  }

  function aoTeclarIndicador(
    evento: React.KeyboardEvent<HTMLButtonElement>,
    atual: 0 | 1 | 2,
  ) {
    if (evento.key !== "ArrowRight" && evento.key !== "ArrowLeft") {
      return;
    }

    evento.preventDefault();
    const destino = (
      evento.key === "ArrowRight" ? (atual + 1) % 3 : (atual + 2) % 3
    ) as 0 | 1 | 2;
    selecionar(destino);
    indicadores.current[destino]?.focus();
  }

  function classeDoPainel(posicao: 0 | 1 | 2) {
    const ativo = indice === posicao;

    return [
      styles.painel,
      posicao === 2 ? styles.painelReferencia : styles.painelSobreposto,
      ativo ? styles.painelAtivo : "",
      saindo === posicao ? styles.painelSaindo : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  return (
    <section
      className={`${styles.banner} bg-light border-bottom`}
      aria-roledescription="carrossel"
      aria-label="Apresentação"
      data-slide={indice + 1}
      onMouseEnter={() => setSobPonteiro(true)}
      onMouseLeave={() => setSobPonteiro(false)}
      onFocus={() => setComFoco(true)}
      onBlur={(evento) => {
        if (!evento.currentTarget.contains(evento.relatedTarget)) {
          setComFoco(false);
        }
      }}
    >
      <div className={styles.palco}>
      <div
        className={classeDoPainel(0)}
        id="slide-sao-jose"
        role="tabpanel"
        aria-labelledby="indicador-slide-0"
        aria-hidden={indice !== 0}
        inert={indice !== 0}
      >
        <div className={`container py-5 ${styles.limite}`}>
          <div className="row align-items-center g-4">
            <div className={`col-12 col-lg-7 order-lg-2 ${styles.texto}`}>
              <h1 id="hero-sao-jose" className="display-6 fw-semibold">
                “São José foi chamado por Deus para servir diretamente a Pessoa
                e a missão de Jesus...”
              </h1>
              <p className="text-secondary mb-4">
                — São João Paulo II, Redemptoris Custos, 15 de agosto de 1989.
              </p>
              <p className="lead mb-2">
                Encontre orações para os diferentes momentos da sua vida.
              </p>
              <p className="mb-4">Reze, medite e fortaleça sua fé.</p>
              <Link href="/oracoes" className={classeBotao()}>
                Ver todas as orações
              </Link>
            </div>
            <div className="col-12 col-lg-5 order-lg-1">
              <div className={`${styles.imagem} ${styles.imagemEsquerda}`}>
                <Image
                  src="/images/sao-jose.jpg"
                  alt="São José"
                  fill
                  className="object-fit-cover"
                  sizes="(min-width: 992px) 46vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={classeDoPainel(1)}
        id="slide-ecce-homo"
        role="tabpanel"
        aria-labelledby="indicador-slide-1"
        aria-hidden={indice !== 1}
        inert={indice !== 1}
      >
        <div className={`container py-5 ${styles.limite} ${styles.ecce}`}>
          <div className="row align-items-center g-4">
            <div className={`col-12 col-lg-7 ${styles.texto} ${styles.composicao}`}>
              <p className={`text-secondary text-uppercase ${styles.apoio}`}>
                Oração · Formação · Tradição
              </p>
              <div className={styles.divisor} aria-hidden="true">
                <span className={styles.divisorLinha} />
                <svg className={styles.divisorFlor} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 1.2c.5 1.8 1.3 3 2.4 3.8C13.2 6.2 12.5 7.5 12 9c-.5-1.5-1.2-2.8-2.4-4C10.7 4.2 11.5 3 12 1.2zm.7 8.6c1.4-.1 2.6-.7 3.5-1.6.2 1.5-.3 2.9-1.3 3.9 1 .2 2 .1 2.9-.4-.8 1.4-2.2 2.2-3.7 2.4v1.1h1.8v1.4h-1.8V21h-2.2v-3.4H9.9v-1.4h1.8v-1.1c-1.5-.2-2.9-1-3.7-2.4.9.5 1.9.6 2.9.4-1-1-1.5-2.4-1.3-3.9.9.9 2.1 1.5 3.5 1.6z"
                  />
                </svg>
                <span className={styles.divisorLinha} />
              </div>
              <h1 id="hero-ecce-homo" className={styles.marca}>
                <Image
                  src="/images/logo-ecce-homo-sem-fundo.png"
                  alt="Ecce Homo. Ad maiorem Dei gloriam"
                  width={1983}
                  height={793}
                  className={styles.marcaImagem}
                  sizes="(min-width: 992px) 44vw, 88vw"
                />
              </h1>
              <p className={styles.pergunta}>
                “O que é a verdade?{" "}
                <span className={styles.perguntaRef}>(Jo 18, 38)”</span>
              </p>
              <Link href="/oracoes" className={classeBotao()}>
                Ver todas as orações
                <i className={`bi bi-arrow-right ${styles.seta}`} aria-hidden="true" />
              </Link>
            </div>
            <div className="col-12 col-lg-5">
              <div className={styles.imagem}>
                <Image
                  src="/images/bom-jesus-ecce-homo.jpg"
                  alt="Ecce Homo"
                  fill
                  className="object-fit-cover"
                  sizes="(min-width: 992px) 46vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={classeDoPainel(2)}
        id="slide-nossa-senhora"
        role="tabpanel"
        aria-labelledby="indicador-slide-2"
        aria-hidden={indice !== 2}
        inert={indice !== 2}
      >
        <div className={`container py-5 ${styles.limite}`}>
          <div className="row align-items-center g-4">
            <div className={`col-12 col-lg-7 ${styles.texto}`}>
              <h1 id="hero-titulo" className="display-6 fw-semibold">
                “...o culto mesmo a Maria nos conduz a Cristo.”
              </h1>
              <p className="text-secondary mb-4">
                — São João Paulo II, Homilia em Saragoça, 6 de novembro de 1982.
              </p>
              <p className="lead mb-2">
                Encontre orações para todos os momentos da sua vida.
              </p>
              <p className="mb-4">Reze, medite e fortaleça sua fé.</p>
              <Link href="/oracoes" className={classeBotao()}>
                Ver todas as orações
              </Link>
            </div>
            <div className="col-12 col-lg-5">
              <div className={styles.imagem}>
                <Image
                  src="/images/nossa-senhora-das-dores.jpg"
                  alt="Nossa Senhora das Dores"
                  fill
                  className="object-fit-cover"
                  sizes="(min-width: 992px) 46vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <div className={styles.indicadores} role="tablist" aria-label="Slides do banner">
        {rotulos.map((rotulo, posicao) => {
          const destino = posicao as 0 | 1 | 2;
          const selecionado = indice === destino;

          return (
            <button
              key={rotulo}
              ref={(elemento) => {
                indicadores.current[destino] = elemento;
              }}
              id={`indicador-slide-${destino}`}
              type="button"
              role="tab"
              className={
                selecionado
                  ? `${styles.indicador} ${styles.indicadorAtivo}`
                  : styles.indicador
              }
              aria-selected={selecionado}
              aria-controls={
                destino === 0
                  ? "slide-sao-jose"
                  : destino === 1
                    ? "slide-ecce-homo"
                    : "slide-nossa-senhora"
              }
              tabIndex={selecionado ? 0 : -1}
              onClick={() => selecionar(destino)}
              onKeyDown={(evento) => aoTeclarIndicador(evento, destino)}
            >
              <span className="visually-hidden">{rotulo}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
