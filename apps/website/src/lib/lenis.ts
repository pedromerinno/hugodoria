import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

let lenis: Lenis | null = null;
let lenisTicker: ((time: number) => void) | null = null;

const isTouchOnly =
  typeof window !== "undefined" &&
  "ontouchstart" in window &&
  !window.matchMedia("(pointer: fine)").matches;

export function initLenis(): Lenis | null {
  if (lenis) return lenis;

  if (isTouchOnly) return null;

  lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  lenisTicker = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(lenisTicker);
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function getLenis(): Lenis | null {
  return lenis;
}

export function scrollToTop(immediate = true): void {
  if (!lenis) {
    window.scrollTo(0, 0);
    return;
  }
  lenis.scrollTo(0, { immediate, force: true });
}

export function destroyLenis(): void {
  if (lenisTicker) {
    gsap.ticker.remove(lenisTicker);
    lenisTicker = null;
  }
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}
