"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

type Program = {
  index: string;
  total: string;
  title: string;
  bullets: string[];
  image: string;
  cta: string;
};

const programs: Program[] = [
  {
    index: "01",
    total: "/04",
    title: "Formação Avançada em Neurocirurgia",
    bullets: [
      "Currículo modular em microcirurgia e neurovascular",
      "Mentoria clínica com casos reais discutidos em grupo",
      "Sessões dedicadas de anatomia e raciocínio cirúrgico",
      "Certificação alinhada às boas práticas internacionais",
    ],
    image: "/assets/program-1-brain.png",
    cta: "#programa-1",
  },
  {
    index: "02",
    total: "/04",
    title: "Imersões e Hands-on",
    bullets: [
      "Laboratório anatômico com peças cadavéricas e modelos 3D",
      "Turmas reduzidas com acompanhamento individualizado",
      "Treinamento prático em técnicas microcirúrgicas",
      "Observação direta de procedimentos em centro cirúrgico",
    ],
    image: "/assets/program-2-handson.png",
    cta: "#programa-2",
  },
  {
    index: "03",
    total: "/04",
    title: "Educação Continuada",
    bullets: [
      "Atualizações periódicas em técnicas e evidências",
      "Encontros ao vivo com discussão de casos complexos",
      "Biblioteca de aulas e protocolos sempre atualizados",
      "Comunidade ativa para troca entre pares",
    ],
    image: "/assets/program-3-xray.png",
    cta: "#programa-3",
  },
  {
    index: "04",
    total: "/04",
    title: "Conteúdo Científico e Atualizações",
    bullets: [
      "Revisões críticas de artigos de alto impacto",
      "Publicações originais produzidas pelo Neurosurgic",
      "Curadoria editorial dos principais avanços da área",
      "Acervo digital de aulas e materiais técnicos",
    ],
    image: "/assets/program-4-microscope.png",
    cta: "#programa-4",
  },
];

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-[14px]">
      <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
        <div className="h-[7.33px] w-[7.33px] rounded-full bg-bullet" />
      </div>
      {/* /50 reprovava em WCAG AA sobre o fundo ink (~3.2:1). /75 leva
          para ~4.7:1 e mantém a hierarquia visual em relação aos títulos
          em branco puro acima. */}
      <p className="m-0 text-[14px] font-normal leading-[1.5] tracking-tighterDisplay text-white/75 sm:text-[16px]">
        {children}
      </p>
    </div>
  );
}

export default function Pillars() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<Array<HTMLElement | null>>([]);
  const borderRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Pausa o conic-gradient infinito quando o card está fora da viewport.
  // Em mobile, especialmente, evita que 4 animações simultâneas drenem
  // a GPU enquanto o usuário lê outra parte da página.
  useEffect(() => {
    const nodes = borderRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          (e.target as HTMLElement).classList.toggle("is-visible", e.isIntersecting);
        }
      },
      { rootMargin: "10% 0px", threshold: 0 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const timeline = timelineRef.current;
    const dot = dotRef.current;
    const fill = fillRef.current;
    if (!timeline || !dot || !fill) return;

    // O timeline vertical (dot + fill + active-article-fade) só faz
    // sentido na coluna paralela visível em desktop. No mobile os cards
    // viram uma pilha vertical e "apagar" os não-ativos rebaixava cards
    // que o usuário ainda estava lendo na rolagem natural — leitura
    // sequencial > destaque do ativo. Bind direto ao matchMedia para que
    // resize entre breakpoints reaplique a regra.
    const desktop = window.matchMedia("(min-width: 1024px)");
    let rafId = 0;
    let attached = false;

    const resetArticles = () => {
      const articles = articlesRef.current;
      for (let i = 0; i < articles.length; i++) {
        const el = articles[i];
        if (!el) continue;
        el.style.opacity = "1";
      }
    };

    const update = () => {
      rafId = 0;
      const rect = timeline.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const anchor = vh * 0.5;
      const progress = Math.max(
        0,
        Math.min(1, (anchor - rect.top) / rect.height)
      );
      const y = progress * rect.height;

      dot.style.transform = `translate3d(-50%, calc(-50% + ${y}px), 0)`;
      fill.style.height = `${y}px`;

      // Active article focus — closest center to viewport anchor wins
      let activeIndex = 0;
      let minDist = Infinity;
      const articles = articlesRef.current;
      for (let i = 0; i < articles.length; i++) {
        const el = articles[i];
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const dist = Math.abs(center - anchor);
        if (dist < minDist) {
          minDist = dist;
          activeIndex = i;
        }
      }
      for (let i = 0; i < articles.length; i++) {
        const el = articles[i];
        if (!el) continue;
        el.style.opacity = i === activeIndex ? "1" : "0.4";
      }
    };

    const schedule = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    const attach = () => {
      if (attached) return;
      attached = true;
      update();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
    };

    const detach = () => {
      if (!attached) return;
      attached = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resetArticles();
    };

    const apply = () => {
      if (desktop.matches) attach();
      else detach();
    };

    apply();
    desktop.addEventListener("change", apply);

    return () => {
      desktop.removeEventListener("change", apply);
      detach();
    };
  }, []);

  return (
    <section id="programas" className="w-full bg-sand pb-[24px]">
      <div className="w-full px-4 sm:px-6 lg:px-[15px]">
        <div className="relative w-full overflow-hidden rounded-[24px] border border-white/10 bg-ink">
          {/* Glow background — soft whitish-blue highlights */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(70% 55% at 22% 8%, rgba(200,215,255,0.12) 0%, rgba(11,12,34,0) 65%), radial-gradient(55% 45% at 82% 28%, rgba(220,230,255,0.08) 0%, rgba(11,12,34,0) 70%), radial-gradient(50% 40% at 75% 68%, rgba(200,215,255,0.07) 0%, rgba(11,12,34,0) 70%), radial-gradient(50% 40% at 18% 92%, rgba(220,230,255,0.06) 0%, rgba(11,12,34,0) 70%)",
            }}
          />


          {/* Content */}
          <div className="relative mx-auto max-w-[1600px] px-6 pb-16 pt-12 sm:px-10 sm:pb-20 sm:pt-16 lg:px-[111px] lg:pb-[160px] lg:pt-[100px]">
            {/* Header */}
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
              <div>
                <p className="m-0 font-roboto text-[14px] font-normal leading-[1.3] text-sky">
                  Conheça
                </p>
                <h2 className="mt-2 font-display text-[36px] font-normal leading-[1.15] tracking-tightDisplay text-white sm:text-[44px] lg:text-[48px]">
                  Programas principais
                </h2>
              </div>
              <div className="flex flex-col gap-5 lg:max-w-[320px] lg:items-end lg:text-right">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 font-roboto text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75 backdrop-blur-md">
                  <span aria-hidden className="h-[6px] w-[6px] rounded-full bg-bullet" />
                  04 Programas
                </span>

                <p className="m-0 font-display text-[15px] leading-[1.6] text-white/70 sm:text-[16px]">
                  Estruturada para reduzir incertezas, aumentar confiança e
                  garantir previsibilidade.
                </p>

                <Link
                  href="#todos-programas"
                  className="group inline-flex h-[52px] items-center gap-[10px] rounded-full border border-white/15 bg-white/[0.04] px-[22px] text-[14px] font-semibold text-white backdrop-blur-md transition-all duration-300 ease-out hover:border-white/30 hover:bg-white/[0.08]"
                >
                  <span>Ver todos os programas</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden
                    className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
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
              </div>
            </div>

            {/* Programs grid */}
            <div ref={timelineRef} className="relative mt-[64px] lg:mt-[100px]">
              {/* Vertical timeline base (desktop) */}
              <div
                aria-hidden
                className="absolute top-0 hidden h-full w-px bg-white/10 lg:block"
                style={{ left: "calc(50% + 16px)" }}
              />

              {/* Filled portion — grows with scroll progress */}
              <div
                ref={fillRef}
                aria-hidden
                className="absolute top-0 hidden w-px bg-gradient-to-b from-sky/0 via-sky/40 to-sky/80 lg:block"
                style={{ left: "calc(50% + 16px)", height: 0, willChange: "height" }}
              />

              {/* Tracking dot — follows scroll progress */}
              <div
                ref={dotRef}
                aria-hidden
                className="absolute top-0 z-10 hidden h-[27px] w-[27px] items-center justify-center rounded-full border border-white/0 bg-white/10 shadow-[0_0_24px_rgba(141,190,255,0.35)] backdrop-blur-md lg:flex"
                style={{
                  left: "calc(50% + 16px)",
                  transform: "translate3d(-50%, -50%, 0)",
                  willChange: "transform",
                }}
              >
                <div className="h-[11px] w-[11px] rounded-[2px] bg-bullet" />
              </div>

              <div className="flex flex-col gap-16 lg:gap-[78px]">
                {programs.map((program, i) => (
                  <article
                    key={program.index}
                    ref={(el) => {
                      articlesRef.current[i] = el;
                    }}
                    className="relative flex flex-col gap-8 transition-opacity duration-500 ease-out lg:grid lg:grid-cols-2 lg:items-start lg:gap-[48px]"
                    style={{ willChange: "opacity" }}
                  >
                    {/* Text content — always left */}
                    <div className="flex flex-col gap-8 lg:pr-[16px]">
                      <div className="flex items-end gap-[7px] font-display font-normal">
                        <span className="text-[40px] leading-none text-white/80">
                          {program.index}
                        </span>
                        <span className="text-[20px] leading-[1.4] text-white/40">
                          {program.total}
                        </span>
                      </div>

                      <h3 className="max-w-[396px] bg-gradient-to-r from-white from-[68%] to-white/60 bg-clip-text font-display text-[28px] font-medium leading-[1.16] tracking-tightDisplay text-transparent sm:text-[34px] lg:text-[40px] lg:tracking-tighterDisplay">
                        {program.title}
                      </h3>

                      <ul className="flex max-w-[320px] flex-col gap-[19px]">
                        {program.bullets.map((b, j) => (
                          <li key={j} className="list-none">
                            <Bullet>{b}</Bullet>
                          </li>
                        ))}
                      </ul>

                      <div>
                        <Link
                          href={program.cta}
                          className="inline-flex h-[51px] w-[182px] items-center justify-center rounded-full bg-primary text-[15px] font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.99]"
                        >
                          Saiba Mais
                        </Link>
                      </div>
                    </div>

                    {/* Image card — animated conic border + halftone dots */}
                    <div className="relative w-full lg:flex lg:justify-end">
                      <div
                        ref={(el) => {
                          borderRefs.current[i] = el;
                        }}
                        className="animated-border relative aspect-[482/514] w-full max-w-[420px] rounded-[16px] p-[1.5px] lg:max-w-[482px]"
                        style={{
                          animationDelay: `${i * -1.5}s`,
                        }}
                      >
                        <div className="relative h-full w-full overflow-hidden rounded-[14.5px] bg-ink">
                          {/* Halftone dots inside card */}
                          <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0"
                            style={{
                              backgroundImage:
                                "radial-gradient(circle, rgba(180,200,255,0.18) 0.9px, transparent 1.2px)",
                              backgroundSize: "8px 8px",
                              maskImage:
                                "radial-gradient(ellipse 70% 25% at 50% 58%, black 0%, rgba(0,0,0,0.5) 60%, transparent 100%)",
                              WebkitMaskImage:
                                "radial-gradient(ellipse 70% 25% at 50% 58%, black 0%, rgba(0,0,0,0.5) 60%, transparent 100%)",
                            }}
                          />
                          <Image
                            src={program.image}
                            alt={program.title}
                            fill
                            sizes="(min-width: 1024px) 482px, (min-width: 640px) 420px, 100vw"
                            className="relative object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
