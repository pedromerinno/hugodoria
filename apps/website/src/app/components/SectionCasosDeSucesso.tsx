import { useEffect, useRef, useState } from "react";
import svgPaths from "../../imports/svg-nx92b0rij3";
import { gsap } from "../../lib/gsap";

const TESTIMONIALS = [
  {
    quote:
      "Arcu congue dolor eget non mi blandit at bibendum. Morbi eget egestas id sed amet tortor at cursus. Dictum odio lacus quam suspendisse. Vulputate hendrerit vitae urna massa fusce ultrices odio.",
    name: "Nome do Cliente",
    role: "Função",
  },
  {
    quote:
      "Arcu congue dolor eget non mi blandit at bibendum. Morbi eget egestas id sed amet tortor at cursus. Dictum odio lacus quam suspendisse. Vulputate hendrerit vitae urna massa fusce ultrices odio.",
    name: "Nome do Cliente",
    role: "Função",
  },
  {
    quote:
      "Arcu congue dolor eget non mi blandit at bibendum. Morbi eget egestas id sed amet tortor at cursus. Dictum odio lacus quam suspendisse. Vulputate hendrerit vitae urna massa fusce ultrices odio.",
    name: "Nome do Cliente",
    role: "Função",
  },
  {
    quote:
      "Arcu congue dolor eget non mi blandit at bibendum. Morbi eget egestas id sed amet tortor at cursus. Dictum odio lacus quam suspendisse. Vulputate hendrerit vitae urna massa fusce ultrices odio.",
    name: "Nome do Cliente",
    role: "Função",
  },
  {
    quote:
      "Arcu congue dolor eget non mi blandit at bibendum. Morbi eget egestas id sed amet tortor at cursus. Dictum odio lacus quam suspendisse. Vulputate hendrerit vitae urna massa fusce ultrices odio.",
    name: "Nome do Cliente",
    role: "Função",
  },
  {
    quote:
      "Arcu congue dolor eget non mi blandit at bibendum. Morbi eget egestas id sed amet tortor at cursus. Dictum odio lacus quam suspendisse. Vulputate hendrerit vitae urna massa fusce ultrices odio.",
    name: "Nome do Cliente",
    role: "Função",
  },
] as const;

const CARDS_PER_PAGE = 2;
const TOTAL_PAGES = Math.ceil(TESTIMONIALS.length / CARDS_PER_PAGE);

function QuoteIcon() {
  return (
    <svg
      className="w-[40px] h-[34px] md:w-[55px] md:h-[47px]"
      viewBox="0 0 55 47"
      fill="none"
    >
      <path d={svgPaths.p3f3a4c80} fill="var(--color-accent-gold-light)" />
    </svg>
  );
}

function ArrowIcon({ flipped }: { flipped?: boolean }) {
  return (
    <span
      className="inline-flex text-navy/60 text-2xl leading-none tracking-[-0.04em]"
      style={{ transform: flipped ? "scaleX(-1)" : undefined }}
    >
      →
    </span>
  );
}

export default function SectionCasosDeSucesso() {
  const [page, setPage] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  const canPrev = page > 0;
  const canNext = page < TOTAL_PAGES - 1;

  const visibleCards = TESTIMONIALS.slice(
    page * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE + CARDS_PER_PAGE,
  );

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const items = root.querySelectorAll("[data-reveal]");
      gsap.set(items, { y: 40, autoAlpha: 0 });
      gsap.to(items, {
        y: 0,
        autoAlpha: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          end: "top 25%",
          scrub: 0.6,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll("[data-card]");
    gsap.fromTo(
      cards,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power2.out" },
    );
  }, [page]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{
        background: "var(--color-bg-cream)",
      }}
    >
      <div className="w-full px-6 md:px-12 lg:px-16 py-16 md:py-24 lg:py-28">
        {/* Header */}
        <div
          data-reveal
          className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-8 mb-12 md:mb-16"
        >
          <h2
            className="font-['Arimo',sans-serif] font-normal text-navy leading-[1.18] tracking-[-0.02em]"
            style={{ fontSize: "clamp(28px, 3.2vw, 40px)" }}
          >
            Casos de Sucesso
          </h2>
          <p
            className="font-['Arimo',sans-serif] font-normal text-navy/70 leading-[1.13] max-w-[380px]"
            style={{ fontSize: "clamp(16px, 1.2vw, 20px)" }}
          >
            Veja como transformamos vidas com nossos tratamentos inovadores e
            especializados em neurocirurgia.
          </p>
        </div>

        {/* Divider */}
        <div
          data-reveal
          className="w-full h-px bg-navy/[0.24] mb-10 md:mb-14"
        />

        {/* Testimonial cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
        >
          {visibleCards.map((t, i) => (
            <article
              key={`${page}-${i}`}
              data-card
              className="group relative flex flex-col justify-between rounded-2xl border border-navy/[0.08] bg-white p-8 md:p-10 lg:p-12 transition-all duration-400 hover:border-gold-light/30 hover:shadow-[0_8px_40px_-12px_rgba(26,41,63,0.08)]"
            >
              <div className="flex flex-col gap-6 md:gap-8">
                <QuoteIcon />
                <p
                  className="font-['Arimo',sans-serif] font-normal text-navy leading-[1.18] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(18px, 2vw, 32px)" }}
                >
                  {t.quote}
                </p>
              </div>
              <div className="flex items-center gap-3 mt-8 md:mt-10 pt-6 border-t border-navy/[0.08]">
                <div className="size-10 rounded-full bg-navy/[0.06] flex items-center justify-center">
                  <span className="font-['Geist',sans-serif] font-medium text-navy/40 text-sm">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span
                    className="font-['Arimo',sans-serif] font-normal text-navy leading-[1.3]"
                    style={{ fontSize: "clamp(14px, 1vw, 18px)" }}
                  >
                    {t.name}
                  </span>
                  <span
                    className="font-['Arimo',sans-serif] font-normal text-navy/40 leading-[1.3]"
                    style={{ fontSize: "clamp(12px, 0.9vw, 15px)" }}
                  >
                    {t.role}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Navigation */}
        <div
          data-reveal
          className="flex items-center justify-between mt-10 md:mt-14"
        >
          <span
            className="font-['Arimo',sans-serif] font-normal text-navy leading-[1.18] tracking-[-0.02em]"
            style={{ fontSize: "clamp(18px, 1.4vw, 24px)" }}
          >
            {String(page + 1).padStart(2, "0")} —{" "}
            {String(TOTAL_PAGES).padStart(2, "0")}
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => canPrev && setPage((p) => p - 1)}
              disabled={!canPrev}
              className="inline-flex items-center gap-3 rounded-full border border-navy px-5 py-3 font-['Arimo',sans-serif] font-normal text-navy transition-opacity duration-200 disabled:opacity-30"
              style={{ fontSize: "clamp(16px, 1.2vw, 24px)" }}
            >
              <ArrowIcon flipped />
              Voltar
            </button>
            <button
              type="button"
              onClick={() => canNext && setPage((p) => p + 1)}
              disabled={!canNext}
              className="inline-flex items-center gap-3 rounded-full border border-navy px-5 py-3 font-['Arimo',sans-serif] font-normal text-navy transition-opacity duration-200 disabled:opacity-30"
              style={{ fontSize: "clamp(16px, 1.2vw, 24px)" }}
            >
              Próximo
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
