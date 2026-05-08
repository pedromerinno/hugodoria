import { gsap } from "../../../lib/gsap";
import { CANVAS_H, HEADER_W, TRACK_W } from "./data";

type Refs = {
  section: HTMLElement;
  content: HTMLElement;
  track: HTMLElement;
  headerWrap: HTMLElement;
};

export function initEspecialidadesAnimation({
  section,
  content,
  track,
  headerWrap,
}: Refs) {
  const getScale = () => {
    const byHeight = window.innerHeight / CANVAS_H;
    const byWidth = window.innerWidth / HEADER_W;
    return Math.min(byHeight, byWidth);
  };
  const getDistance = () =>
    Math.max(0, TRACK_W * getScale() - window.innerWidth);

  const applyScale = () => {
    const s = getScale();
    gsap.set(headerWrap, { scale: s, transformOrigin: "top left" });
    gsap.set(track, { scale: s, transformOrigin: "top left" });
  };
  applyScale();

  // Entrance: the whole content slides up from below the section.
  // Short travel (40%) and early end so it's at rest before pin kicks in.
  gsap.set(content, { yPercent: 40, autoAlpha: 0 });
  gsap.to(content, {
    yPercent: 0,
    autoAlpha: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: section,
      start: "top 90%",
      end: "top 40%",
      scrub: 0.6,
      invalidateOnRefresh: true,
    },
  });

  const mm = gsap.matchMedia();
  mm.add("(min-width: 1024px)", () => {
    gsap.to(track, {
      x: () => `-${getDistance()}`,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${getDistance()}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });
  });

  window.addEventListener("resize", applyScale);

  return () => {
    window.removeEventListener("resize", applyScale);
    mm.revert();
  };
}
