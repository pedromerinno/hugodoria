"use client";

import { useEffect, useRef } from "react";

type SpiderCursorProps = {
  className?: string;
  backgroundColor?: string;
  strokeColor?: string;
  spiderCount?: number;
  pointCount?: number;
};

type SpiderPoint = {
  x: number;
  y: number;
  len: number;
  r: number;
};

export function SpiderCursor({
  className = "",
  backgroundColor = "#071181",
  strokeColor = "rgba(255,255,255,0.85)",
  spiderCount = 2,
  pointCount = 240,
}: SpiderCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { sin, cos, PI, hypot, min, max } = Math;
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    let w = 0;
    let h = 0;
    let rafId = 0;
    let isVisible = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const rnd = (x = 1, dx = 0) => Math.random() * x + dx;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const noise = (nx: number, ny: number, t = 101) => {
      const w0 =
        sin(0.3 * nx + 1.4 * t + 2.0 + 2.5 * sin(0.4 * ny + -1.3 * t + 1.0));
      const w1 =
        sin(0.2 * ny + 1.5 * t + 2.8 + 2.3 * sin(0.5 * nx + -1.2 * t + 0.5));
      return w0 + w1;
    };

    const many = <T,>(n: number, f: (i: number) => T): T[] =>
      Array.from({ length: n }, (_, i) => f(i));

    const drawCircle = (cx: number, cy: number, cr: number) => {
      ctx.beginPath();
      ctx.ellipse(cx, cy, cr, cr, 0, 0, PI * 2);
      ctx.fill();
    };

    const drawLine = (x0: number, y0: number, x1: number, y1: number) => {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      const segments = 28;
      for (let s = 0; s < segments; s++) {
        const t = (s + 1) / segments;
        const lx = lerp(x0, x1, t);
        const ly = lerp(y0, y1, t);
        const k = noise(lx / 5 + x0, ly / 5 + y0) * 2;
        ctx.lineTo(lx + k, ly + k);
      }
      ctx.stroke();
    };

    const spawn = (idx: number, total: number) => {
      const ringPoints = many(9, (i) => ({
        x: cos((i / 9) * PI * 2),
        y: sin((i / 9) * PI * 2),
      }));

      const pts: SpiderPoint[] = many(pointCount, () => ({
        x: rnd(w),
        y: rnd(h),
        len: 0,
        r: 0,
      }));

      // Distribute spiders along a horizontal band so they appear immediately
      // as visible, predictable presences when the section enters the viewport.
      const homeX = w * (0.25 + (0.5 * (idx + 0.5)) / total);
      const homeY = h * (0.45 + 0.1 * Math.random());

      const seed = rnd(100);
      let tx = homeX;
      let ty = homeY;
      let x = homeX;
      let y = homeY;
      const kx = rnd(0.5, 0.5);
      const ky = rnd(0.5, 0.5);
      const walkRadius = { x: rnd(50, 50), y: rnd(50, 50) };
      const r = w / rnd(100, 150);

      const paintPt = (p: SpiderPoint) => {
        if (p.len) {
          for (const rp of ringPoints) {
            drawLine(
              lerp(x + rp.x * r, p.x, p.len * p.len),
              lerp(y + rp.y * r, p.y, p.len * p.len),
              x + rp.x * r,
              y + rp.y * r,
            );
          }
        }
        drawCircle(p.x, p.y, p.r);
      };

      return {
        follow(nx: number, ny: number) {
          // Clamp the follow target to canvas bounds (with a tiny margin) so
          // the spider never drifts off-screen while the user is browsing
          // other sections.
          const m = w * 0.04;
          tx = max(-m, min(w + m, nx));
          ty = max(-m, min(h + m, ny));
        },
        idle() {
          // When the cursor is far from the canvas, ease the target back to
          // the spider's home position so it keeps a calm, organic walk.
          tx = lerp(tx, homeX, 0.04);
          ty = lerp(ty, homeY, 0.04);
        },
        tick(t: number) {
          const selfMoveX = cos(t * kx + seed) * walkRadius.x;
          const selfMoveY = sin(t * ky + seed) * walkRadius.y;
          const fx = tx + selfMoveX;
          const fy = ty + selfMoveY;

          x += min(w / 100, (fx - x) / 10);
          y += min(w / 100, (fy - y) / 10);

          let active = 0;
          for (const p of pts) {
            const dx = p.x - x;
            const dy = p.y - y;
            const len = hypot(dx, dy);
            let pr = min(2, w / len / 5);
            const increasing = len < w / 10 && active < 8;
            if (increasing) active++;
            const dir = increasing ? 0.1 : -0.1;
            if (increasing) pr *= 1.5;
            p.r = pr;
            p.len = max(0, min(p.len + dir, 1));
            paintPt(p);
          }
        },
      };
    };

    let spiders = many(spiderCount, (i) => spawn(i, spiderCount));

    const handlePointerMove = (e: PointerEvent) => {
      if (!isVisible) return;
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const margin = 120;
      const inside =
        px >= -margin &&
        px <= w + margin &&
        py >= -margin &&
        py <= h + margin;
      if (inside) {
        for (const s of spiders) s.follow(px, py);
      } else {
        for (const s of spiders) s.idle();
      }
    };

    const ro = new ResizeObserver(() => {
      resize();
      spiders = many(spiderCount, (i) => spawn(i, spiderCount));
    });
    ro.observe(canvas);

    const anim = (t: number) => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = strokeColor;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 0.7;
      const seconds = t / 1000;
      for (const s of spiders) s.tick(seconds);
      rafId = requestAnimationFrame(anim);
    };

    const start = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(anim);
    };

    const stop = () => {
      if (!rafId) return;
      cancelAnimationFrame(rafId);
      rafId = 0;
    };

    // Only run the animation while the section is (or is about to be) in
    // view. Starting 240px ahead means the canvas is already in steady-state
    // by the time the user scrolls into the section.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const next = entry.isIntersecting;
          if (next === isVisible) continue;
          isVisible = next;
          if (isVisible) start();
          else stop();
        }
      },
      { rootMargin: "240px 0px" },
    );
    io.observe(canvas);

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [backgroundColor, strokeColor, spiderCount, pointCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`block h-full w-full ${className}`}
    />
  );
}
