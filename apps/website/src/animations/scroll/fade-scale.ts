import { gsap } from "../../lib/gsap";

type FadeScaleOptions = {
  fromScale?: number;
  duration?: number;
  ease?: string;
  start?: string;
};

const DEFAULTS: Required<FadeScaleOptions> = {
  fromScale: 0.96,
  duration: 1.4,
  ease: "expo.out",
  start: "top 85%",
};

export function createFadeScale(
  target: Element,
  options: FadeScaleOptions = {}
): gsap.core.Tween | null {
  if (!target) return null;
  const opts = { ...DEFAULTS, ...options };

  return gsap.fromTo(
    target,
    { opacity: 0, scale: opts.fromScale },
    {
      opacity: 1,
      scale: 1,
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
