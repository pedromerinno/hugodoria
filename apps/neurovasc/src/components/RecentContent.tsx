"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Card = {
  image: string;
  tag: string;
  date: string;
  title: string;
  href: string;
};

const cards: Card[] = [
  {
    image: "/assets/lib-1.webp",
    tag: "Aula",
    date: "Fev 2026",
    title: "Anatomia funcional da medula espinhal — revisão completa",
    href: "#biblioteca",
  },
  {
    image: "/assets/lib-2.webp",
    tag: "Caso clínico",
    date: "Fev 2026",
    title: "Microcirurgia de aneurismas da artéria cerebral média",
    href: "#biblioteca",
  },
  {
    image: "/assets/lib-3.webp",
    tag: "Webinar",
    date: "Jan 2026",
    title: "Abordagens cirúrgicas à base do crânio",
    href: "#biblioteca",
  },
  {
    image: "/assets/lib-1.webp",
    tag: "Aula",
    date: "Jan 2026",
    title: "Neuralgia do trigêmeo: avaliação e descompressão microvascular",
    href: "#biblioteca",
  },
  {
    image: "/assets/lib-2.webp",
    tag: "Imersão",
    date: "Dez 2025",
    title: "Tumores hipofisários — manejo endoscópico transesfenoidal",
    href: "#biblioteca",
  },
  {
    image: "/assets/lib-3.webp",
    tag: "Artigo",
    date: "Dez 2025",
    title: "Espasmo hemifacial — princípios da técnica de Jannetta",
    href: "#biblioteca",
  },
];

// Aspect-ratio targets for the thumb morph
const ASPECT_WIDE = 384 / 199; // ~1.93 — landscape (lateral state)
const ASPECT_SQUARE = 1; // square (spotlight state)

// Timing
const ADVANCE_INTERVAL = 3500; // ms — how often the active card changes
const TRANSITION_MS = 600; // ms — slide + aspect-ratio morph duration
const SWIPE_THRESHOLD = 40; // px — distância mínima para contar como swipe

const TOTAL = cards.length;
// Rendered 3x so the active position is always surrounded by neighbours
// on both sides — peeks never disappear during the silent loop snap.
const trackItems: Card[] = [...cards, ...cards, ...cards];

export default function RecentContent() {
  // Start in the middle group → always have peeks on both sides
  const [index, setIndex] = useState(TOTAL);
  const [animated, setAnimated] = useState(true);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  // Quando o usuário interage por touch, seguramos o auto-advance por
  // alguns segundos antes de retomar — equivalente ao "hover pause" do desktop.
  const interactionResumeRef = useRef<number | null>(null);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => i + 1);
    }, ADVANCE_INTERVAL);
    return () => clearInterval(id);
  }, [paused]);

  // When we drift past the middle group, silently snap back to the
  // equivalent middle position — visually identical, invisible to the user
  useEffect(() => {
    if (index >= TOTAL * 2 || index < 0) {
      const t = setTimeout(
        () => {
          setAnimated(false);
          setIndex((i) => {
            if (i >= TOTAL * 2) return i - TOTAL;
            if (i < 0) return i + TOTAL;
            return i;
          });
          // Re-enable transition on the *next* paint, after the snap commits
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setAnimated(true));
          });
        },
        TRANSITION_MS
      );
      return () => clearTimeout(t);
    }
  }, [index]);

  const pauseTemporarily = (ms = 5000) => {
    setPaused(true);
    if (interactionResumeRef.current) {
      window.clearTimeout(interactionResumeRef.current);
    }
    interactionResumeRef.current = window.setTimeout(() => {
      setPaused(false);
      interactionResumeRef.current = null;
    }, ms);
  };

  // ── Touch handling ────────────────────────────────────────────────
  // Convivemos com o auto-advance: o primeiro toque pausa o intervalo,
  // o swipe horizontal avança/recua um índice, e o auto retoma após
  // ~5s de inatividade. Comparamos deltaX vs deltaY para não roubar
  // a rolagem vertical do usuário.
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartXRef.current = t.clientX;
    touchStartYRef.current = t.clientY;
    pauseTemporarily(8000);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const startX = touchStartXRef.current;
    const startY = touchStartYRef.current;
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    if (startX == null || startY == null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dy) > Math.abs(dx)) return;
    if (dx < 0) setIndex((i) => i + 1);
    else setIndex((i) => i - 1);
  };

  // Posição dentro do grupo do meio (0..TOTAL-1) — usada para a barra de dots.
  const dotIndex = ((index % TOTAL) + TOTAL) % TOTAL;

  return (
    <section
      id="biblioteca"
      className="w-full bg-sand pt-[64px] pb-[100px] sm:pt-[80px] lg:pt-[95px] lg:pb-[160px]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-[112px]">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div>
            <p className="m-0 font-roboto text-[14px] font-normal leading-[1.3] text-sky">
              Biblioteca
            </p>
            <h2 className="mt-2 font-display text-[36px] font-normal leading-[1.15] tracking-tightDisplay text-primary sm:text-[44px] lg:text-[48px]">
              Conteúdos recentes
            </h2>
          </div>

          <Link
            href="#trajetoria-detalhes"
            className="inline-flex h-[56px] w-fit items-center gap-[8px] rounded-full border border-primary/30 bg-primary px-[26px] text-[14px] font-semibold text-sand transition-transform hover:scale-[1.02] active:scale-[0.99]"
          >
            <Image
              src="/assets/icon-chat.svg"
              alt=""
              width={24}
              height={24}
              className="block h-[24px] w-[24px]"
            />
            <span>Conhecer trajetória</span>
          </Link>
        </div>
      </div>

      {/* Full-bleed carousel viewport — escapa do container para ganhar largura
          e mostrar mais peeks. O active continua centralizado via CSS. */}
      <div
        className="recent-carousel-vp relative mt-12 overflow-hidden lg:mt-[80px]"
        role="region"
        aria-roledescription="carousel"
        aria-label="Conteúdos recentes da biblioteca"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={trackRef}
          className="flex items-start gap-[var(--card-gap)]"
          style={{
            transform: `translate3d(calc(-1 * ${index} * (var(--card-w) + var(--card-gap))), 0, 0)`,
            transition: animated
              ? `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
              : "none",
            willChange: "transform",
          }}
        >
          {trackItems.map((card, i) => {
            const isActive = i === index;
            return (
              <Link
                key={i}
                href={card.href}
                aria-label={card.title}
                aria-hidden={!isActive}
                tabIndex={isActive ? 0 : -1}
                className="flex shrink-0 flex-col gap-4 outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-sand rounded-[16px]"
                style={{ width: "var(--card-w)" }}
              >
                <div
                  className="relative w-full overflow-hidden rounded-[16px] border border-primary/10 bg-primary/5 shadow-[0_24px_60px_-30px_rgba(0,21,255,0.25)]"
                  style={{
                    aspectRatio: isActive ? ASPECT_SQUARE : ASPECT_WIDE,
                    transition: `aspect-ratio ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                  }}
                >
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 384px, (min-width: 640px) 320px, 280px"
                    className="object-cover"
                  />
                </div>

                <div className="flex items-center gap-2 px-1">
                  <span className="inline-flex h-[24px] items-center justify-center rounded-full bg-white px-[10px] text-[11px] font-semibold uppercase tracking-[0.55px] text-primary">
                    {card.tag}
                  </span>
                  <span className="font-display text-[12px] font-normal leading-[18px] text-primary">
                    {card.date}
                  </span>
                </div>

                <h3 className="m-0 px-1 font-display text-[16px] font-medium leading-[1.4] text-primary">
                  {card.title}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Carousel pagination — só faz sentido visualmente quando o
          carrossel é o único elemento na "tela mental" do usuário, ou
          seja, mobile/tablet. Em desktop a presença dos peeks já comunica
          a ideia de "há mais", e dots ficariam soltos. */}
      <div className="mt-6 flex items-center justify-center gap-2 lg:hidden">
        {cards.map((c, i) => {
          const isActive = i === dotIndex;
          return (
            <button
              key={c.title}
              type="button"
              aria-label={`Ir para o conteúdo ${i + 1} de ${TOTAL}: ${c.title}`}
              aria-current={isActive}
              onClick={() => {
                pauseTemporarily(8000);
                // Salta para o índice equivalente *no grupo do meio*, evitando
                // animar TOTAL slides — preserva sensação de carrossel discreto.
                setIndex(TOTAL + i);
              }}
              className={[
                "h-[6px] rounded-full transition-all duration-300",
                isActive ? "w-[24px] bg-primary" : "w-[6px] bg-primary/25",
              ].join(" ")}
            />
          );
        })}
      </div>
    </section>
  );
}
