import { useEffect, useRef } from "react";
import imgMedicalRoom from "@/assets/e25bc4f66b4a426ccf342bc9c87ec2d3e73f4b1a.png";
import { gsap } from "../../lib/gsap";

const STATS = [
  { value: "+ 20", label: "Anos de Experiência" },
  { value: "+100", label: "Artigos Publicados" },
  { value: "+ 9,500", label: "Casos de Sucesso" },
] as const;

export default function SectionSobreMim() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const items = root.querySelectorAll("[data-reveal]");
      gsap.set(items, { y: 48, autoAlpha: 0 });
      gsap.to(items, {
        y: 0,
        autoAlpha: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          end: "top 20%",
          scrub: 0.8,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background: "var(--color-bg-cream)",
      }}
    >
      {/* Title */}
      <div className="px-6 md:px-12 lg:px-16 pt-16 md:pt-24 lg:pt-32">
        <h2
          data-reveal
          className="mx-auto max-w-[790px] text-center font-['Geist',sans-serif] font-medium text-navy leading-[1.24] tracking-[-0.04em]"
          style={{ fontSize: "clamp(32px, 4vw, 64px)" }}
        >
          Melhor Neurocirurgia
          <br />e Cuidados Neurológicos
        </h2>
      </div>

      {/* Content grid: photo left, text+stats right — full width */}
      <div className="mt-12 md:mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-2 items-stretch pb-16 md:pb-24 lg:pb-32">
        {/* Photo */}
        <div
          data-reveal
          className="relative aspect-[815/980] md:aspect-auto w-full overflow-hidden bg-[rgba(88,88,88,0.1)]"
        >
          <img
            src={imgMedicalRoom}
            alt="Consultório Dr. Hugo Doria"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Text + Stats */}
        <div className="flex flex-col justify-between gap-12 md:gap-16 px-6 md:px-12 lg:px-16 py-10 md:py-16">
          <p
            data-reveal
            className="font-['Arimo',sans-serif] font-normal text-navy leading-[1.18] tracking-[-0.02em]"
            style={{ fontSize: "clamp(22px, 2.5vw, 40px)" }}
          >
            Confie em mim, para proporcionar o melhor tratamento e transformar
            sua vida com excelência e dedicação, de forma humana e exclusiva,
            meu maior compromisso com meus pacientes e suas familias.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gold-light/20 rounded-2xl overflow-hidden">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                data-reveal
                className="group relative flex flex-col items-center text-center gap-2 md:gap-3 bg-white px-3 py-7 sm:px-4 sm:py-8 md:px-6 md:py-10 lg:py-12"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-b from-navy/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  aria-hidden
                />
                <span
                  className="relative font-['Geist',sans-serif] font-semibold text-navy leading-[1] tracking-[-0.04em]"
                  style={{ fontSize: "clamp(28px, 2.2vw, 40px)" }}
                >
                  {stat.value}
                </span>
                <div className="relative w-8 h-px bg-gold-light mt-1 mb-1" />
                <span
                  className="relative font-['Geist',sans-serif] font-normal text-navy/50 leading-[1.4] tracking-[0.02em] uppercase"
                  style={{ fontSize: "clamp(12px, 0.8vw, 13px)" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
