import { useEffect, useRef, useCallback } from "react";
import svgPaths from "../../imports/svg-nx92b0rij3";
import { gsap, ScrollTrigger } from "../../lib/gsap";

const FRAME_COUNT = 194;

function buildFramePath(index: number) {
  return `/sequence/HD_BG_Menor_${String(index).padStart(5, "0")}.jpg`;
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const scale = Math.max(cw / iw, ch / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
}

export default function SectionBrain() {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = framesRef.current[index];
    if (!img || !img.complete || !img.naturalWidth) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCover(ctx, img, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    const trigger = triggerRef.current;
    const canvas = canvasRef.current;
    if (!trigger || !canvas) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = Math.round(window.innerWidth * dpr);
      const h = Math.round(window.innerHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      renderFrame(currentFrameRef.current);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const MOBILE_STEP = 4;
    const mobileFrameCount = Math.ceil(FRAME_COUNT / MOBILE_STEP);
    const totalFrames = isDesktop ? FRAME_COUNT : mobileFrameCount;

    const images: HTMLImageElement[] = [];
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const srcIdx = isDesktop ? i : Math.min(i * MOBILE_STEP, FRAME_COUNT - 1);
      img.src = buildFramePath(srcIdx);
      if (i === 0) img.onload = () => renderFrame(0);
      images.push(img);
    }
    framesRef.current = images;

    const textEls = trigger.querySelectorAll("[data-brain-text]");
    const overlayEl = trigger.querySelector("[data-brain-overlay]");

    const lastFrame = totalFrames - 1;

    const gsapCtx = gsap.context(() => {
      const frameObj = { value: 0 };
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: "top top",
          end: isDesktop ? "+=400%" : "+=250%",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        frameObj,
        {
          value: lastFrame,
          ease: "none",
          duration: 0.6,
          onUpdate() {
            const idx = Math.round(frameObj.value);
            if (idx !== currentFrameRef.current) {
              currentFrameRef.current = idx;
              renderFrame(idx);
            }
          },
        },
        0,
      );

      if (overlayEl) {
        tl.fromTo(
          overlayEl,
          { opacity: 0 },
          { opacity: 1, ease: "none", duration: 0.15 },
          0.45,
        );
      }

      tl.fromTo(
        textEls[0] || [],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out", duration: 0.15 },
        0.55,
      );
      tl.fromTo(
        textEls[1] || [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out", duration: 0.15 },
        0.65,
      );
      tl.fromTo(
        textEls[2] || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out", duration: 0.15 },
        0.75,
      );
    }, trigger);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      gsapCtx.revert();
    };
  }, [renderFrame]);

  return (
    <div ref={triggerRef} className="relative w-full h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
        aria-hidden
      />

      {/* Gradient overlay for text readability */}
      <div
        data-brain-overlay
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{
          background:
            "linear-gradient(to top, rgba(18,33,54,0.85) 0%, rgba(18,33,54,0.4) 40%, transparent 70%)",
        }}
      />

      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center justify-end w-full h-full px-6 pb-16 md:pb-24 lg:pb-28">
        <h2
          data-brain-text
          className="text-center font-['Arimo',sans-serif] font-normal text-cream leading-[1.18] tracking-[-0.02em] max-w-[612px] opacity-0"
          style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}
        >
          Cuidados Essenciais para Sua Saúde Neurológica
        </h2>

        <p
          data-brain-text
          className="mt-5 md:mt-6 text-center font-['Arimo',sans-serif] font-normal text-cream/70 leading-[1.32] max-w-[612px] opacity-0"
          style={{ fontSize: "clamp(16px, 1.6vw, 20px)" }}
        >
          Experimente tratamentos neurológicos de excelência mundial, associados
          ao cuidado humanizado, exclusivo e personalizado que são a marca
          registrada do Dr. Hugo Doria.
        </p>

        <a
          data-brain-text
          href="https://wa.me/5511999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 md:mt-10 inline-flex items-center gap-2.5 rounded-full bg-gold-light px-7 py-4 text-cream font-['Roboto',sans-serif] font-medium transition-all duration-300 hover:bg-gold-hover hover:shadow-lg hover:shadow-gold-light/20 opacity-0"
          style={{ fontSize: "clamp(15px, 1.2vw, 18px)" }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 30.62 30.62"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.78"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6.38 26.79H24.24" />
            <path d={svgPaths.p14c86900} />
            <path d={svgPaths.p1c9dbf00} />
            <path d={svgPaths.p1de39ce6} />
            <path d={svgPaths.p392b0b00} />
          </svg>
          Entre em Contato
        </a>
      </div>
    </div>
  );
}
