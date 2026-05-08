import { useEffect, useRef } from "react";
import { CANVAS_H, CANVAS_W } from "./section-sobre/data";
import { SobreContent, SobreContentMobile } from "./section-sobre/parts";
import { initSobreAnimation } from "./section-sobre/animations";

export default function SectionSobre() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    return initSobreAnimation({ section, track });
  }, []);

  return (
    <>
      {/* Desktop: pinned horizontal canvas */}
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden hidden lg:block"
        style={{ height: "100vh", backgroundColor: "var(--color-bg-deep)" }}
        data-section="sobre"
        data-component="sobre"
      >
        <div
          ref={trackRef}
          className="absolute left-0 top-0 will-change-transform"
          style={{ width: CANVAS_W, height: CANVAS_H }}
        >
          <SobreContent />
        </div>
      </section>

      {/* Mobile/tablet: vertical stacked layout */}
      <section
        className="relative w-full lg:hidden"
        style={{ backgroundColor: "var(--color-bg-deep)" }}
        data-section="sobre"
        data-component="sobre-mobile"
      >
        <SobreContentMobile />
      </section>
    </>
  );
}
