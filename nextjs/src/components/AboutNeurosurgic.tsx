"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MuxPlayer from "@mux/mux-player-react/lazy";
import type MuxPlayerElement from "@mux/mux-player";

// Mux playback. Set NEXT_PUBLIC_MUX_PLAYBACK_ID in .env.local once the
// asset is uploaded. While empty, the section renders a static poster
// so we never ship a broken <video> tag.
const MUX_PLAYBACK_ID = process.env.NEXT_PUBLIC_MUX_PLAYBACK_ID ?? "";
const VIDEO_POSTER = "/assets/lib-2.webp";

// ── Play indicator (idle state) ───────────────────────────────────
// Big, inviting affordance shown over the poster while the video is
// not yet playing. Clicking forces playback even before scroll-trigger
// (useful in mobile / reduced-motion contexts).
type PlayBadgeProps = {
  onClick?: () => void;
  visible: boolean;
};

function PlayBadge({ onClick, visible }: PlayBadgeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Reproduzir vídeo institucional"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={[
        "group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        "flex h-[68px] w-[68px] items-center justify-center rounded-full",
        "bg-white/95 backdrop-blur-md",
        "shadow-[0_18px_44px_rgba(0,21,255,0.24)]",
        "transition-all duration-300 ease-out",
        "hover:scale-[1.06] active:scale-[0.96]",
        visible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none scale-90",
      ].join(" ")}
    >
      {/* Soft pulsing ring — draws the eye without being noisy */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-white/40 animate-ping"
        style={{ animationDuration: "2.4s" }}
      />
      <svg
        width="20"
        height="24"
        viewBox="0 0 28 32"
        fill="none"
        className="relative ml-[2px] transition-transform duration-300 group-hover:translate-x-[1px]"
      >
        <path d="M2 2 L26 16 L2 30 Z" fill="#0015ff" />
      </svg>
    </button>
  );
}

// ── Mute toggle (active state) ────────────────────────────────────
// Anchored top-right of the video once playback starts. Pill shape
// with a label keeps the affordance obvious without competing with
// the video.
type MuteToggleProps = {
  muted: boolean;
  onClick: () => void;
  visible: boolean;
};

function MuteToggle({ muted, onClick, visible }: MuteToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={muted ? "Ativar áudio" : "Silenciar"}
      aria-pressed={!muted}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={[
        "absolute top-4 right-4 lg:top-6 lg:right-6",
        "flex h-[30px] items-center gap-1.5 rounded-full",
        "bg-black/55 backdrop-blur-md pl-2.5 pr-3 text-white",
        "text-[11px] font-medium tracking-tight leading-none",
        "shadow-[0_6px_18px_rgba(0,0,0,0.22)]",
        "ring-1 ring-white/15",
        "transition-all duration-300 ease-out",
        "hover:bg-black/70 active:scale-[0.97]",
        visible
          ? "opacity-100 pointer-events-auto translate-y-0"
          : "opacity-0 pointer-events-none -translate-y-2",
      ].join(" ")}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5 9v6h3l5 4V5L8 9H5z"
          fill="currentColor"
        />
        {muted ? (
          <path
            d="M16 9l5 6M21 9l-5 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ) : (
          <path
            d="M16 8.5a5 5 0 0 1 0 7M19 6a8 8 0 0 1 0 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        )}
      </svg>
      <span>{muted ? "Ativar som" : "Silenciar"}</span>
    </button>
  );
}

type VideoPaneProps = {
  playerRef: React.RefObject<MuxPlayerElement | null>;
  muted: boolean;
};

function VideoPane({ playerRef, muted }: VideoPaneProps) {
  // No playback ID yet → render only the poster. Removes the runtime
  // 404 and keeps the visual rhythm intact while the asset is provisioned.
  if (!MUX_PLAYBACK_ID) {
    return (
      <Image
        src={VIDEO_POSTER}
        alt=""
        fill
        sizes="(min-width: 1024px) 480px, 50vw"
        className="object-cover"
      />
    );
  }

  return (
    <MuxPlayer
      // Mux's React types still use the legacy non-nullable RefObject;
      // ours is the React 19 RefObject<T | null>. The runtime contract
      // is identical, so we cast at the boundary.
      ref={playerRef as unknown as React.Ref<MuxPlayerElement>}
      streamType="on-demand"
      playbackId={MUX_PLAYBACK_ID}
      poster={VIDEO_POSTER}
      // No autoPlay — playback is driven imperatively from the parent
      // (full-width on desktop, in-view on mobile).
      loop
      muted={muted}
      playsInline
      preload="metadata"
      nohotkeys
      defaultHiddenCaptions
      title="Vídeo institucional Neurosurgic"
      // Hide the default Mux chrome — our custom AudioBadge handles
      // mute/unmute over the video. The CSS-variable keys are typed by
      // Mux as a templated index signature; `as any` keeps it terse.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style={{
        "--controls": "none",
        "--media-object-fit": "cover",
        width: "100%",
        height: "100%",
        aspectRatio: "auto",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any}
    />
  );
}

export default function AboutNeurosurgic() {
  const sectionRef = useRef<HTMLElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const fadeOutRef = useRef<HTMLDivElement>(null);
  const mobileWrapRef = useRef<HTMLDivElement>(null);
  const desktopVideoRef = useRef<MuxPlayerElement | null>(null);
  const mobileVideoRef = useRef<MuxPlayerElement | null>(null);
  // Two independent triggers — desktop: scroll-driven fullscreen state;
  // mobile: in-view via IntersectionObserver. Splitting them avoids a
  // dropped state when the user resizes between breakpoints.
  const [desktopActive, setDesktopActive] = useState(false);
  const [mobileActive, setMobileActive] = useState(false);
  // Start UNMUTED — we'll attempt audio playback first and fall back
  // to muted only if the browser's autoplay policy rejects it.
  const [muted, setMuted] = useState(false);

  // Imperative play/pause — the source of truth is the *Active state.
  useEffect(() => {
    if (!MUX_PLAYBACK_ID) return;

    const sync = async (
      player: MuxPlayerElement | null,
      active: boolean
    ) => {
      if (!player) return;
      if (!active) {
        player.pause();
        return;
      }

      // Try with audio first.
      player.muted = false;
      try {
        await player.play();
        setMuted(false);
        return;
      } catch {
        /* Browser blocked unmuted autoplay — fall back below. */
      }

      // Fallback: same play, muted. The "Ativar som" badge will be
      // visible so the user can opt in with one click.
      player.muted = true;
      setMuted(true);
      try {
        await player.play();
      } catch {
        /* Even muted autoplay can fail in extreme cases — ignore. */
      }
    };

    sync(desktopVideoRef.current, desktopActive);
    sync(mobileVideoRef.current, mobileActive);
  }, [desktopActive, mobileActive]);

  const toggleMuted = () => {
    if (!MUX_PLAYBACK_ID) return;
    setMuted((prev) => {
      const next = !prev;
      [desktopVideoRef.current, mobileVideoRef.current].forEach((player) => {
        if (player) player.muted = next;
      });
      return next;
    });
  };

  // Browsers only grant unmuted autoplay after a real input gesture —
  // scroll alone never counts. If the scroll-trigger fires before the
  // user has clicked/typed anywhere, sync() falls back to muted. The
  // moment the user produces their first gesture, we lift the mute on
  // any currently-running player; the user's intent to engage with the
  // page is read as intent to hear the video. Fires once, then aborts.
  useEffect(() => {
    if (!MUX_PLAYBACK_ID) return;
    const ac = new AbortController();
    const handle = () => {
      ac.abort();
      let didUnmute = false;
      [desktopVideoRef.current, mobileVideoRef.current].forEach((player) => {
        if (!player) return;
        if (!player.paused && player.muted) {
          player.muted = false;
          didUnmute = true;
        }
      });
      if (didUnmute) setMuted(false);
    };
    window.addEventListener("pointerdown", handle, { signal: ac.signal });
    window.addEventListener("keydown", handle, { signal: ac.signal });
    return () => ac.abort();
  }, []);

  const requestPlay = (which: "desktop" | "mobile") => {
    if (which === "desktop") setDesktopActive(true);
    else setMobileActive(true);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const section = sectionRef.current;
      const thumb = thumbRef.current;
      const fadeOut = fadeOutRef.current;
      if (!section || !thumb || !fadeOut) return;

      // ── Strategy ────────────────────────────────────────────────────
      // Pin the section while a single timeline plays:
      //   1) decorative content fades + lifts away
      //   2) the thumb translates + scales from its corner spot to
      //      viewport-centered fullscreen
      //
      // Using transforms only (no position:fixed swap, no z-index
      // tricks) means there's no teleport, no leftover element
      // covering the next section, and the math is independent of the
      // user's current scroll position. When the pin releases the
      // thumb is naturally carried out with the section.

      // Targets are computed lazily so they refresh on resize.
      let dx = 0;
      let dy = 0;
      let ds = 1;

      const compute = () => {
        // Read the natural rect (clear our own transforms first).
        gsap.set(thumb, {
          clearProps: "transform,scale,x,y,xPercent,yPercent",
        });

        const scrollY = window.scrollY;
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const thumbRect = thumb.getBoundingClientRect();
        const sectionRect = section.getBoundingClientRect();

        // Pin engages when section.top hits viewport.top
        // (start: "top top"). At that moment, viewport.top = sectionDocTop,
        // so the thumb's viewport y-position equals its document offset
        // within the section — independent of current scroll.
        const sectionDocTop = sectionRect.top + scrollY;
        const thumbDocTop = thumbRect.top + scrollY;
        const thumbVpTop = thumbDocTop - sectionDocTop;
        const thumbVpLeft = thumbRect.left;

        dx = vw / 2 - (thumbVpLeft + thumbRect.width / 2);
        dy = vh / 2 - (thumbVpTop + thumbRect.height / 2);
        ds = vw / thumbRect.width;
      };

      // Scroll budget split:
      //   end: "+=240%" → ~2.4× viewport of scroll while pinned
      //   • 0  → 0.5  : decorative content fades out + thumb scales up
      //   • 0.5 → 1.0 : HOLD — video stays fullscreen, user reads/watches
      // The hold is a no-op tween; it only exists to consume scroll
      // distance so the pin doesn't release the moment scale completes.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=240%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: compute,
          onUpdate: (self) => {
            // Activate playback once we're inside the hold phase.
            // Hysteresis (0.50 in / 0.42 out) prevents flicker if the
            // user scrubs back-and-forth around the boundary.
            const p = self.progress;
            setDesktopActive((prev) => {
              if (!prev && p >= 0.5) return true;
              if (prev && p <= 0.42) return false;
              return prev;
            });
          },
          // Once the user scrolls past the pinned section (or all the way
          // back above it), the timeline stops updating — but our state
          // would stay "active" and the player would keep audio running
          // off-screen. These two callbacks force a hard pause whenever
          // the trigger is no longer in range.
          onLeave: () => setDesktopActive(false),
          onLeaveBack: () => setDesktopActive(false),
        },
      });

      // Phase 1 — Decorative content lifts & fades (first 30% of the pin).
      tl.to(
        fadeOut.children,
        {
          yPercent: -25,
          opacity: 0,
          ease: "power2.in",
          duration: 0.3,
          stagger: 0.025,
        },
        0
      );

      // Phase 2 — Thumb translates + scales to viewport center.
      // Lands at 0.5 of the timeline so we still have the second half
      // for the hold.
      tl.to(
        thumb,
        {
          x: () => dx,
          y: () => dy,
          scale: () => ds,
          borderRadius: 0,
          ease: "none",
          duration: 0.5,
        },
        0
      );

      // Phase 3 — HOLD. Empty tween that consumes the remaining 0.5 of
      // the timeline so the pin keeps the fullscreen video on screen
      // while the user scrolls through ~120% of viewport height.
      tl.to({}, { duration: 0.5 }, 0.5);

      compute();
      ScrollTrigger.refresh();
    });

    return () => mm.revert();
  }, []);

  // Mobile: trigger playback once the small video tile is visible.
  // The desktop scroll-pin handles its own state above, so we only
  // attach the observer on the mobile wrapper.
  useEffect(() => {
    if (!MUX_PLAYBACK_ID) return;
    const node = mobileWrapRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setMobileActive(true);
        } else if (entry.intersectionRatio < 0.1) {
          setMobileActive(false);
        }
      },
      { threshold: [0, 0.1, 0.5, 1] }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="institucional"
      ref={sectionRef}
      className="relative isolate w-full bg-sand pt-[48px] pb-[80px] lg:pt-[40px] lg:pb-[120px]"
    >
      <div className="w-full px-4 sm:px-6 lg:px-[60px]">
        {/* Mobile / tablet stack */}
        <div className="flex flex-col items-center gap-8 lg:hidden">
          <span className="inline-flex h-[38px] items-center rounded-full bg-chip px-5 text-[14px] font-normal text-primary">
            O que é a Neurosurgic
          </span>

          <h2 className="max-w-[480px] text-center font-display text-[34px] font-normal leading-[1.15] tracking-tightDisplay text-primary sm:text-[40px]">
            Ensino como extensão do{" "}
            <span className="bg-legado-grad bg-clip-text text-transparent">
              legado
            </span>
          </h2>

          <p className="max-w-[420px] text-center font-display text-[14px] leading-[22px] text-primary sm:text-[16px] sm:leading-[24px]">
            A Neurosurgic nasce para formar, aprofundar e expandir o
            conhecimento em neurocirurgia, conectando ciência, prática e futuro.
          </p>

          <Link
            href="#inscricao"
            className="flex h-[48px] items-center gap-[8px] rounded-full bg-primarySoft px-6 text-[14px] font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.99]"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
            >
              <path
                d="M7 1.5v11M1.5 7h11"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <span>Inscrever-se</span>
          </Link>

          {/* Mobile media stack — empilhamos em telas pequenas (<sm) porque
              foto-retrato + vídeo-paisagem lado a lado criava uma "escada"
              visual. A partir de sm voltamos ao grid 2-col mas com aspect
              ratios harmonizados (4/5 para a foto + video preserva proporção
              compatível ao 16/9 mas com presença visual equivalente). */}
          <div className="flex w-full max-w-[640px] flex-col gap-3 pt-2 sm:grid sm:grid-cols-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] sm:aspect-[290/362]">
              <Image
                src="/assets/lib-1.webp"
                alt=""
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div
              ref={mobileWrapRef}
              className="relative aspect-video w-full overflow-hidden rounded-[20px] bg-ink/5"
            >
              <VideoPane playerRef={mobileVideoRef} muted={muted} />
              {MUX_PLAYBACK_ID && (
                <>
                  <PlayBadge
                    onClick={() => requestPlay("mobile")}
                    visible={!mobileActive}
                  />
                  <MuteToggle
                    muted={muted}
                    onClick={toggleMuted}
                    visible={mobileActive}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Desktop — fiel ao Figma */}
        <div className="relative hidden h-[940px] w-full lg:block">
          {/* Group of elements that scroll-away during the video reveal */}
          <div ref={fadeOutRef} className="contents">
            {/* Image 1 — top-left medium */}
            <div className="absolute left-0 top-[64px] h-[232px] w-[367px] overflow-hidden rounded-[24px]">
              <Image
                src="/assets/lib-3.webp"
                alt=""
                fill
                sizes="367px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/5" />
            </div>

            {/* Image 2 — top-right medium */}
            <div className="absolute right-[34px] top-[72px] h-[224px] w-[270px] overflow-hidden rounded-[24px]">
              <Image
                src="/assets/lib-2.webp"
                alt=""
                fill
                sizes="270px"
                className="object-cover"
              />
            </div>

            {/* Image 4 — bottom-left small */}
            <div className="absolute left-[76px] top-[591px] h-[217px] w-[290px] overflow-hidden rounded-[24px]">
              <Image
                src="/assets/lib-1.webp"
                alt=""
                fill
                sizes="290px"
                className="object-cover"
              />
            </div>

            {/* Centered content */}
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center pt-[40px]">
              <span className="inline-flex h-[38px] items-center rounded-full bg-chip px-5 text-[14px] font-normal text-primary">
                O que é a Neurosurgic
              </span>

              <h2 className="mt-[56px] max-w-[760px] text-center font-display text-[64px] font-normal leading-[1.08] tracking-tighterDisplay text-primary xl:text-[72px]">
                Ensino como extensão do{" "}
                <span className="bg-legado-grad bg-clip-text text-transparent">
                  legado
                </span>
              </h2>

              <p className="mt-[28px] max-w-[460px] text-center font-display text-[18px] leading-[1.55] text-primary">
                A Neurosurgic nasce para formar, aprofundar e expandir o
                conhecimento em neurocirurgia, conectando ciência, prática e
                futuro.
              </p>

              <Link
                href="#inscricao"
                className="mt-[32px] flex h-[48px] items-center gap-[8px] rounded-full bg-primarySoft px-6 text-[14px] font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.99]"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M7 1.5v11M1.5 7h11"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Inscrever-se</span>
              </Link>
            </div>
          </div>

          {/* Video — middle-right large, scroll-grows to full-width.
              Aspect-ratio 16:9 (480 × 270). z-30 sits ABOVE the
              centered text (z-10) so the growing video covers it,
              but is contained within the section's `isolate` stacking
              context — Pillars (next sibling) still covers cleanly
              when the user scrolls past. */}
          <div
            ref={thumbRef}
            className="absolute right-[8px] top-[648px] z-30 h-[270px] w-[480px] origin-center overflow-hidden rounded-[24px] bg-ink/5"
            style={{ willChange: "transform, border-radius" }}
          >
            <VideoPane playerRef={desktopVideoRef} muted={muted} />
            {MUX_PLAYBACK_ID && (
              <>
                <PlayBadge
                  onClick={() => requestPlay("desktop")}
                  visible={!desktopActive}
                />
                <MuteToggle
                  muted={muted}
                  onClick={toggleMuted}
                  visible={desktopActive}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
