import { gsap, ScrollTrigger, SplitText } from "../../../lib/gsap";

type Refs = {
  section: HTMLElement;
  group: HTMLElement;
  mark: HTMLElement;
  quote: HTMLElement;
  signature: SVGSVGElement;
  attribution: HTMLElement;
};

export function initQuoteAnimation(refs: Refs) {
  const { section, group, mark, quote, signature } = refs;

  const ctx = gsap.context(() => {
    const split = new SplitText(quote, {
      type: "lines",
      mask: "lines",
      linesClass: "quote-line",
    });

    const paths = Array.from(
      signature.querySelectorAll("path")
    ) as SVGPathElement[];

    paths.forEach((p) => {
      try {
        const len = p.getTotalLength();
        if (Number.isFinite(len) && len > 0) {
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        }
      } catch {
        /* path without geometry */
      }
    });

    gsap.set(group, { y: 120, autoAlpha: 0 });
    gsap.set(split.lines, { yPercent: 110 });
    gsap.set(mark, {
      scale: 0.4,
      autoAlpha: 0,
      y: -60,
      transformOrigin: "center bottom",
    });

    // Pre-pin: group rises and fades in so it's fully present before pin.
    gsap.to(group, {
      y: 0,
      autoAlpha: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        end: "top 35%",
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    // Pinned timeline: bg round-trips blue → dark → blue so the section never
    // shows a seam against the preceding/following navy sections. Quote
    // lines and signature reveal while held in the dark middle.
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: isDesktop ? "+=1600" : "bottom top",
        pin: isDesktop,
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });

    const bgDark = getComputedStyle(section).getPropertyValue("--color-bg-darkest").trim() || "#0a0e1a";
    const bgDeep = getComputedStyle(section).getPropertyValue("--color-bg-deep").trim() || "#101828";

    tl
      .to(section, { backgroundColor: bgDark, duration: 0.6 }, 0)
      .to(
        mark,
        {
          scale: 1,
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.6)",
        },
        0.2
      )
      .to(
        split.lines,
        { yPercent: 0, duration: 1, stagger: 0.12, ease: "power3.out" },
        0.6
      )
      .to(
        paths,
        { strokeDashoffset: 0, duration: 1.2, stagger: 0.06, ease: "none" },
        ">-0.1"
      )
      .to(
        split.lines,
        { yPercent: -110, duration: 1, stagger: 0.08, ease: "power3.in" },
        "+=0.4"
      )
      .to(
        paths,
        { autoAlpha: 0, duration: 0.6, stagger: 0.04, ease: "none" },
        "<"
      )
      .to(
        mark,
        {
          scale: 0.4,
          autoAlpha: 0,
          y: -60,
          duration: 0.7,
          ease: "power3.in",
        },
        "<"
      )
      .to(
        group,
        {
          y: -120,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.in",
        },
        "<0.1"
      )
      .to(
        section,
        { backgroundColor: bgDeep, duration: 0.8 },
        "<0.2"
      );
  }, section);

  return () => ctx.revert();
}
