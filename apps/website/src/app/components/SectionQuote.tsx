import { useEffect, useRef } from "react";
import {
  ATTRIBUTION,
  QUOTE_TEXT,
  SIGNATURE_PATHS,
} from "./section-quote/data";
import { initQuoteAnimation } from "./section-quote/animations";

export default function SectionQuote() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const signatureRef = useRef<SVGSVGElement>(null);
  const attributionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const group = groupRef.current;
    const mark = markRef.current;
    const quote = quoteRef.current;
    const signature = signatureRef.current;
    const attribution = attributionRef.current;
    if (!section || !group || !mark || !quote || !signature || !attribution) return;
    return initQuoteAnimation({ section, group, mark, quote, signature, attribution });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", backgroundColor: "var(--color-bg-deep)" }}
      data-section="quote"
      data-component="quote"
    >
      <div
        ref={groupRef}
        className="absolute inset-0 flex flex-col items-center justify-center will-change-transform"
      >
        <span
          ref={markRef}
          className="block font-['Geist',sans-serif] font-bold text-[clamp(96px,10vw,138px)] leading-none tracking-[-0.04em] text-gold"
          style={{ marginBottom: "clamp(24px, 3vh, 40px)" }}
          aria-hidden="true"
        >
          &ldquo;
        </span>

        <p
          ref={quoteRef}
          className="mx-auto max-w-[min(1066px,88vw)] text-center font-['Geist',sans-serif] font-bold uppercase text-cream"
          style={{
            fontSize: "clamp(26px, 2.6vw, 44px)",
            lineHeight: 1.24,
            letterSpacing: "-0.04em",
          }}
        >
          {QUOTE_TEXT}
        </p>

        <svg
          ref={signatureRef}
          viewBox="0 0 182 111.023"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          className="mt-[clamp(32px,5vh,64px)]"
          style={{ width: "clamp(140px, 12vw, 200px)", height: "auto" }}
          aria-hidden="true"
        >
          {SIGNATURE_PATHS.map((d, i) => (
            <path key={i} d={d} stroke="var(--color-accent-gold)" strokeLinecap="round" fill="none" />
          ))}
        </svg>

        <p
          ref={attributionRef}
          className="mt-[clamp(16px,2.5vh,24px)] max-w-[433px] text-center font-['Arimo',sans-serif] text-[clamp(14px,1.1vw,18px)] leading-[1.32] text-cream/70"
        >
          {ATTRIBUTION}
        </p>
      </div>
    </section>
  );
}
