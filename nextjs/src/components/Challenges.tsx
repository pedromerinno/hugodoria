"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SpiderCursor } from "@/components/ui/spider-cursor";

// Decide em runtime se o canvas animado vale o custo. Em devices touch
// (sem cursor real) o efeito perde o sentido — e mesmo em desktop, se o
// usuário pediu reduced-motion, respeitamos a preferência e devolvemos
// um fundo sólido. A decisão acontece no mount para não causar hydration
// mismatch (SSR sempre renderiza o canvas; o cliente desliga se preciso).
function useShouldRenderSpider() {
  const [render, setRender] = useState(true);
  useEffect(() => {
    const noCursor = window.matchMedia("(hover: none)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (noCursor || reduced) setRender(false);
  }, []);
  return render;
}

export default function Challenges() {
  const renderSpider = useShouldRenderSpider();

  return (
    <section id="desafios" className="w-full bg-sand pb-[24px]">
      <div className="w-full px-4 sm:px-6 lg:px-[15px]">
        <div className="relative isolate w-full overflow-hidden rounded-[24px] bg-primary text-white">
          {/* Animated ambient background — apenas onde faz sentido */}
          {renderSpider && (
            <div className="pointer-events-none absolute inset-0">
              <SpiderCursor
                backgroundColor="#0015ff"
                strokeColor="rgba(210, 225, 255, 0.85)"
                spiderCount={2}
              />
            </div>
          )}

          {/* Soft vignette for legibility on top of the canvas */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/45 via-primary/0 to-primary/60"
          />

          {/* Container — alinha banner + conteúdo no mesmo eixo das demais seções */}
          <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-[64px] px-6 pt-[80px] pb-[100px] sm:gap-[80px] sm:px-10 sm:pt-[120px] sm:pb-[140px] lg:gap-[100px] lg:px-[112px] lg:pt-[140px] lg:pb-[160px]">
            {/* Texto + CTAs */}
            <div className="flex flex-col gap-6 sm:gap-8">
              <span className="font-roboto text-[14px] font-normal uppercase leading-[1.3] tracking-[0.18em] text-skyLight">
                Desafios
              </span>

              <h2 className="m-0 max-w-[980px] font-display text-[40px] font-normal leading-[1.05] tracking-tighterDisplay text-white sm:text-[56px] lg:text-[88px]">
                Desafios neurocirúrgicos para afiar o pensamento clínico.
              </h2>

              <p className="m-0 max-w-[640px] font-display text-[16px] font-normal leading-[1.55] text-white/80 sm:text-[18px]">
                Casos reais, decisões cirúrgicas e raciocínio anatômico — uma
                trilha interativa para você praticar, todo mês, ao lado da
                comunidade Neurosurgic.
              </p>

              <div className="mt-2 flex flex-col gap-3 sm:mt-4 sm:flex-row sm:items-center">
                <Link
                  href="#inscricao"
                  className="inline-flex h-[56px] w-fit items-center gap-[10px] rounded-full bg-white px-[26px] text-[14px] font-semibold text-primary transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.99]"
                >
                  <span>Quero participar</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M3.5 8h9M9 4.5L12.5 8 9 11.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>

                <Link
                  href="#biblioteca"
                  className="inline-flex h-[56px] w-fit items-center gap-[10px] rounded-full border border-white/20 bg-white/[0.04] px-[26px] text-[14px] font-medium text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/10"
                >
                  <span>Saber mais</span>
                </Link>
              </div>
            </div>

            {/* Banner visual da seção — agora dentro do container, com cantos suaves */}
            <div className="relative w-full overflow-hidden rounded-[20px] ring-1 ring-white/10 sm:rounded-[24px] lg:rounded-[28px]">
              <div className="relative aspect-[1440/798] w-full">
                <Image
                  src="/assets/challenges-banner.webp"
                  alt="NeuroSurgical Challenges"
                  fill
                  sizes="(min-width: 1440px) 1216px, (min-width: 1024px) calc(100vw - 224px), (min-width: 640px) calc(100vw - 48px), calc(100vw - 32px)"
                  className="object-cover"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
