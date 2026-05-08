import { useEffect } from "react";
import { initLenis, destroyLenis } from "../lib/lenis";

export function useLenis() {
  useEffect(() => {
    const lenis = initLenis();
    return () => {
      destroyLenis();
    };
  }, []);
}
