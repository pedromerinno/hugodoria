import { gsap } from "../../lib/gsap";

type SignatureDrawOptions = {
  start?: string;
  end?: string;
  scrub?: number | boolean;
  stagger?: number;
  strokeWidth?: number;
};

const DEFAULTS: Required<SignatureDrawOptions> = {
  start: "top 85%",
  end: "bottom 40%",
  scrub: 1.2,
  stagger: 0.08,
  strokeWidth: 1.2,
};

type SignatureTweens = {
  draw: gsap.core.Tween;
  entry: gsap.core.Tween;
};

export function createSignatureDraw(
  container: Element,
  options: SignatureDrawOptions = {}
): SignatureTweens | null {
  if (!container) return null;
  const opts = { ...DEFAULTS, ...options };

  const paths = Array.from(
    container.querySelectorAll("path")
  ) as SVGPathElement[];
  if (!paths.length) return null;

  paths.forEach((path) => {
    try {
      const length = path.getTotalLength();
      if (!Number.isFinite(length) || length === 0) return;
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        strokeWidth: opts.strokeWidth,
      });
    } catch {
      /* path without geometry */
    }
  });

  const draw = gsap.to(paths, {
    strokeDashoffset: 0,
    ease: "none",
    stagger: { each: opts.stagger, from: "start" },
    scrollTrigger: {
      trigger: container,
      start: opts.start,
      end: opts.end,
      scrub: opts.scrub,
    },
  });

  const entry = gsap.fromTo(
    container,
    { y: 24, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: { trigger: container, start: "top 88%", once: true },
    }
  );

  return { draw, entry };
}
