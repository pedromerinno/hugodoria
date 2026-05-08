import { gsap, SplitText } from "../../lib/gsap";

type LineRevealOptions = {
  start?: string;
  end?: string;
  scrub?: number | boolean;
  stagger?: number;
  duration?: number;
  ease?: string;
  /** Line-height restored on the target (parents that apply leading-[0]
   *  collapse SplitText lines to zero height otherwise). */
  lineHeight?: string | number;
};

const DEFAULTS: Required<LineRevealOptions> = {
  start: "top 80%",
  end: "bottom 55%",
  scrub: true as unknown as number,
  stagger: 0.12,
  duration: 1.1,
  ease: "power3.out",
  lineHeight: 1.24,
};

type LineReveal = {
  tween: gsap.core.Tween;
  split: SplitText;
};

export function createLineReveal(
  target: HTMLElement,
  options: LineRevealOptions = {}
): LineReveal | null {
  if (target.dataset.lineReveal === "done") return null;
  const opts = { ...DEFAULTS, ...options };

  target.style.lineHeight = String(opts.lineHeight);

  const split = new SplitText(target, {
    type: "lines",
    mask: "lines",
    linesClass: "line-reveal__line",
  });

  if (!split.lines.length) {
    split.revert();
    return null;
  }

  split.lines.forEach((line) => {
    (line as HTMLElement).style.willChange = "transform";
    (line as HTMLElement).style.display = "inline-block";
  });

  const tween = gsap.fromTo(
    split.lines,
    { yPercent: 100 },
    {
      yPercent: 0,
      ease: opts.ease,
      duration: opts.duration,
      stagger: opts.stagger,
      scrollTrigger: {
        trigger: target,
        start: opts.start,
        end: opts.end,
        scrub: opts.scrub,
      },
    }
  );

  target.dataset.lineReveal = "done";
  return { tween, split };
}
