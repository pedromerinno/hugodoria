import { gsap } from "../../lib/gsap";

type FadeUpOptions = {
  y?: number;
  duration?: number;
  ease?: string;
  start?: string;
  delay?: number;
  once?: boolean;
};

const DEFAULTS: Required<FadeUpOptions> = {
  y: 40,
  duration: 0.9,
  ease: "power3.out",
  start: "top 88%",
  delay: 0,
  once: true,
};

export function createFadeUp(
  target: Element,
  options: FadeUpOptions = {}
): gsap.core.Tween | null {
  if (!target) return null;
  const opts = { ...DEFAULTS, ...options };

  return gsap.fromTo(
    target,
    { y: opts.y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: opts.duration,
      delay: opts.delay,
      ease: opts.ease,
      scrollTrigger: {
        trigger: target,
        start: opts.start,
        once: opts.once,
      },
    }
  );
}
