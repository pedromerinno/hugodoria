import { gsap } from "../../lib/gsap";

type LineDrawOptions = {
  duration?: number;
  ease?: string;
  start?: string;
};

const DEFAULTS: Required<LineDrawOptions> = {
  duration: 1.2,
  ease: "power3.out",
  start: "top 90%",
};

export function createLineDraw(
  target: Element,
  options: LineDrawOptions = {}
): gsap.core.Tween | null {
  if (!target) return null;
  const opts = { ...DEFAULTS, ...options };

  return gsap.fromTo(
    target,
    { scaleX: 0, transformOrigin: "left center" },
    {
      scaleX: 1,
      duration: opts.duration,
      ease: opts.ease,
      scrollTrigger: {
        trigger: target,
        start: opts.start,
        once: true,
      },
    }
  );
}
