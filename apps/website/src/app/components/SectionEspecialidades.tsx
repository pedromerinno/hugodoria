import { useEffect, useRef } from "react";
import {
  CANVAS_H,
  CARD_START_X,
  CARD_STEP_X,
  CARD_Y_DOWN,
  CARD_Y_UP,
  HEADER_W,
  TRACK_W,
  cards,
} from "./section-especialidades/data";
import {
  Card,
  CardMobile,
  Header,
  HeaderMobile,
} from "./section-especialidades/parts";
import { initEspecialidadesAnimation } from "./section-especialidades/animations";

export default function SectionEspecialidades() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const track = trackRef.current;
    const headerWrap = headerWrapRef.current;
    if (!section || !content || !track || !headerWrap) return;
    return initEspecialidadesAnimation({ section, content, track, headerWrap });
  }, []);

  return (
    <>
      {/* Desktop: pinned horizontal scroll of cards */}
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-navy hidden lg:block"
        style={{ height: "100vh" }}
        data-section="especialidades"
        data-component="especialidades"
      >
        <div ref={contentRef} className="absolute inset-0 will-change-transform">
          <div
            ref={headerWrapRef}
            className="pointer-events-none absolute left-0 top-0 z-10"
            style={{ width: HEADER_W, height: CANVAS_H }}
          >
            <Header />
          </div>

          <div
            ref={trackRef}
            className="absolute left-0 top-0 will-change-transform"
            style={{ width: TRACK_W, height: CANVAS_H }}
          >
            {cards.map((card, i) => (
              <Card
                key={i}
                x={CARD_START_X + i * CARD_STEP_X}
                y={i % 2 === 0 ? CARD_Y_UP : CARD_Y_DOWN}
                card={card}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute bottom-[28px] right-[40px] z-20 flex items-center gap-[10px] font-['Geist_Mono',sans-serif] text-[11px] uppercase tracking-[0.22em] text-cream/50">
            <span>Scroll</span>
            <span className="h-px w-[48px] bg-white/30" />
            <span>→</span>
          </div>
        </div>
      </section>

      {/* Mobile/tablet: vertical stacked card list */}
      <section
        className="relative w-full bg-navy lg:hidden"
        data-section="especialidades"
        data-component="especialidades-mobile"
      >
        <div className="flex flex-col gap-12 py-16">
          <HeaderMobile />
          <div className="flex flex-col gap-4 px-6">
            {cards.map((card) => (
              <CardMobile key={card.slug} card={card} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
