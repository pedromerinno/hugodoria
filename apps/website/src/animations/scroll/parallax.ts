import { gsap } from "../../lib/gsap";

type ParallaxOptions = {
  /** Total y-distance (px) the target travels across the scroll range. */
  distance?: number;
  start?: string;
  end?: string;
  scrub?: number | boolean;
};

const DEFAULTS: Required<ParallaxOptions> = {
  distance: 100,
  start: "top bottom",
  end: "bottom top",
  scrub: true as unknown as number,
};

export function createParallax(
  target: Element,
  options: ParallaxOptions = {}
): gsap.core.Tween | null {
  if (!target) return null;
  const opts = { ...DEFAULTS, ...options };
  const half = opts.distance / 2;

  return gsap.fromTo(
    target,
    { y: half },
    {
      y: -half,
      ease: "none",
      scrollTrigger: {
        trigger: target,
        start: opts.start,
        end: opts.end,
        scrub: opts.scrub,
        invalidateOnRefresh: true,
      },
    }
  );
}
