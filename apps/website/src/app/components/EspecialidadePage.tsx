import { useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { findCardBySlug, cards } from "./section-especialidades/data";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import Footer from "./Footer";

export default function EspecialidadePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const card = slug ? findCardBySlug(slug) : undefined;
  const pageRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);

  const currentIndex = cards.findIndex((c) => c.slug === slug);
  const prevCard = currentIndex > 0 ? cards[currentIndex - 1] : null;
  const nextCard =
    currentIndex < cards.length - 1 ? cards[currentIndex + 1] : null;
  const displayIndex = String(currentIndex + 1).padStart(2, "0");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const root = pageRef.current;
    if (!root || !card) return;

    const ctx = gsap.context(() => {
      // Hero parallax
      const heroImg = heroImgRef.current;
      if (heroImg) {
        gsap.to(heroImg, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: heroImg.closest("[data-hero-wrap]"),
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }

      // Hero title reveal (word-by-word clip)
      const titleEl = root.querySelector<HTMLElement>("[data-hero-title]");
      if (titleEl) {
        const text = titleEl.textContent ?? "";
        titleEl.innerHTML = "";
        const wordSpans: HTMLSpanElement[] = [];
        text.split(/(\s+)/).forEach((token) => {
          if (!token) return;
          if (/^\s+$/.test(token)) {
            titleEl.appendChild(document.createTextNode(token));
            return;
          }
          const outer = document.createElement("span");
          outer.style.display = "inline-block";
          outer.style.overflow = "hidden";
          outer.style.verticalAlign = "top";
          outer.style.lineHeight = "inherit";
          const inner = document.createElement("span");
          inner.style.display = "inline-block";
          inner.textContent = token;
          outer.appendChild(inner);
          titleEl.appendChild(outer);
          wordSpans.push(inner);
        });

        gsap.set(wordSpans, { yPercent: 110 });
        gsap.to(wordSpans, {
          yPercent: 0,
          stagger: 0.06,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.3,
        });
      }

      // Hero elements fade in
      const heroItems = root.querySelectorAll("[data-hero-reveal]");
      gsap.set(heroItems, { y: 20, autoAlpha: 0 });
      gsap.to(heroItems, {
        y: 0,
        autoAlpha: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.5,
      });

      // Large index number
      const indexNum = root.querySelector("[data-hero-index]");
      if (indexNum) {
        gsap.set(indexNum, { autoAlpha: 0, scale: 0.9 });
        gsap.to(indexNum, {
          autoAlpha: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.1,
        });
      }

      // Scroll-triggered sections
      const sections = root.querySelectorAll("[data-section-reveal]");
      sections.forEach((section) => {
        const items = section.querySelectorAll("[data-reveal]");
        gsap.set(items, { y: 48, autoAlpha: 0 });
        gsap.to(items, {
          y: 0,
          autoAlpha: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 30%",
            scrub: 0.6,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [card, slug]);

  if (!card) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-navy-deep">
        <p
          className="font-['Geist',sans-serif] text-cream/60"
          style={{ fontSize: 18 }}
        >
          Especialidade não encontrada.
        </p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-6 font-['Geist',sans-serif] text-gold-light underline underline-offset-4"
          style={{ fontSize: 15 }}
        >
          Voltar ao início
        </button>
      </div>
    );
  }

  const Icon = card.icon;

  return (
    <div ref={pageRef} className="w-full overflow-hidden">
      {/* ────────────────────────────────────────────────
          HERO — full viewport, cinematic
         ──────────────────────────────────────────────── */}
      <section
        data-hero-wrap
        className="relative w-full overflow-hidden"
        style={{
          height: "100vh",
          minHeight: 520,
          background: "var(--color-bg-darkest)",
        }}
      >
        {/* Background image with parallax */}
        {card.image && (
          <>
            <img
              ref={heroImgRef}
              src={card.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ willChange: "transform" }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(13, 26, 45, 0.4) 0%, rgba(13, 26, 45, 0.15) 30%, rgba(13, 26, 45, 0.5) 65%, var(--color-bg-darkest) 100%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(13, 26, 45, 0.7) 0%, transparent 50%, rgba(13, 26, 45, 0.3) 100%)",
              }}
            />
          </>
        )}

        {/* Grain overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            opacity: 0.03,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
          }}
        />

        {/* Top bar */}
        <div
          className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 lg:px-16"
          style={{ height: 72 }}
        >
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-3 font-['Geist',sans-serif] text-cream/50 transition-colors duration-300 hover:text-cream"
            style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.02em" }}
          >
            <svg
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            <span className="hidden md:inline">Dr. Hugo Doria</span>
          </button>

          <span
            data-hero-reveal
            className="font-['Geist_Mono',sans-serif] uppercase tracking-[0.2em] text-gold-light/70"
            style={{ fontSize: 10, fontWeight: 500 }}
          >
            {displayIndex} / {String(cards.length).padStart(2, "0")}
          </span>
        </div>

        {/* Large decorative index number */}
        <span
          data-hero-index
          className="absolute z-[2] font-['Arimo',sans-serif] text-cream/[0.04] select-none pointer-events-none"
          style={{
            right: "clamp(16px, 6vw, 96px)",
            bottom: "clamp(40px, 12vh, 160px)",
            fontSize: "clamp(140px, 28vw, 420px)",
            fontWeight: 400,
            lineHeight: 0.8,
            letterSpacing: "-0.04em",
          }}
        >
          {displayIndex}
        </span>

        {/* Hero content — bottom left */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 lg:px-16"
          style={{ paddingBottom: "clamp(48px, 8vh, 96px)" }}
        >
          <div data-hero-reveal className="flex items-center gap-3 mb-5">
            <div
              style={{
                width: 28,
                height: 28,
                opacity: 0.7,
              }}
            >
              <Icon />
            </div>
            <span
              className="font-['Geist_Mono',sans-serif] uppercase tracking-[0.15em] text-gold-light"
              style={{ fontSize: 11, fontWeight: 500 }}
            >
              Especialidade
            </span>
          </div>

          <h1
            data-hero-title
            className="font-['Arimo',sans-serif] text-cream"
            style={{
              margin: 0,
              fontWeight: 400,
              fontSize: "clamp(32px, 5.5vw, 80px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: "min(100%, 800px)",
            }}
          >
            {card.title}
          </h1>

          <p
            data-hero-reveal
            className="font-['Geist',sans-serif] text-cream/50"
            style={{
              margin: 0,
              marginTop: "clamp(16px, 2.5vh, 28px)",
              fontSize: "clamp(14px, 1.1vw, 18px)",
              lineHeight: 1.55,
              maxWidth: 480,
              fontWeight: 400,
            }}
          >
            {card.description}
          </p>

          {/* Scroll indicator */}
          <div
            data-hero-reveal
            className="flex items-center gap-3 mt-10 md:mt-16"
          >
            <div
              className="w-px bg-white/20"
              style={{ height: 40 }}
            />
            <span
              className="font-['Geist_Mono',sans-serif] uppercase tracking-[0.2em] text-cream/30"
              style={{ fontSize: 10 }}
            >
              Scroll
            </span>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────
          BODY — Detailed content
         ──────────────────────────────────────────────── */}
      <section
        data-section-reveal
        className="relative w-full"
        style={{
          background: "var(--color-bg-deeper)",
          paddingTop: "clamp(80px, 12vh, 140px)",
          paddingBottom: "clamp(80px, 10vh, 120px)",
        }}
      >
        <div className="px-6 md:px-12 lg:px-16">
          {/* Two column: left narrow, right wide */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20 items-start">
            {/* Left column — metadata */}
            <div data-reveal className="flex flex-col gap-8 lg:sticky lg:top-24">
              <div>
                <span
                  className="font-['Geist_Mono',sans-serif] uppercase tracking-[0.15em] text-gold-light/60"
                  style={{ fontSize: 10 }}
                >
                  Sobre
                </span>
                <div
                  className="w-full mt-3 mb-4"
                  style={{ height: 1, background: "rgba(255,255,255,0.08)" }}
                />
                <div className="flex items-center gap-3">
                  <div style={{ width: 22, height: 22, opacity: 0.5 }}>
                    <Icon />
                  </div>
                  <span
                    className="font-['Geist',sans-serif] text-cream/70"
                    style={{ fontSize: 14, fontWeight: 500 }}
                  >
                    {card.title}
                  </span>
                </div>
              </div>

              <div>
                <span
                  className="font-['Geist_Mono',sans-serif] uppercase tracking-[0.15em] text-gold-light/60"
                  style={{ fontSize: 10 }}
                >
                  Especialista
                </span>
                <div
                  className="w-full mt-3 mb-4"
                  style={{ height: 1, background: "rgba(255,255,255,0.08)" }}
                />
                <span
                  className="font-['Geist',sans-serif] text-cream/70"
                  style={{ fontSize: 14, fontWeight: 500 }}
                >
                  Dr. Hugo Doria
                </span>
                <p
                  className="font-['Geist',sans-serif] text-cream/35"
                  style={{ margin: 0, marginTop: 4, fontSize: 13 }}
                >
                  MD PhD — Neurocirurgião
                </p>
              </div>

              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start"
                style={{
                  marginTop: 8,
                  padding: "12px 24px",
                  background: "var(--color-accent-gold-light)",
                  borderRadius: 100,
                  textDecoration: "none",
                  transition: "background 0.25s ease, transform 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--color-accent-gold-hover)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--color-accent-gold-light)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-bg-deeper)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.88.37 1.85.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.96.33 1.93.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span
                  className="font-['Geist',sans-serif]"
                  style={{ fontWeight: 600, fontSize: 13, color: "var(--color-bg-deeper)" }}
                >
                  Agendar Consulta
                </span>
              </a>
            </div>

            {/* Right column — description + highlights */}
            <div>
              <p
                data-reveal
                className="font-['Arimo',sans-serif] text-cream/75"
                style={{
                  margin: 0,
                  fontWeight: 400,
                  fontSize: "clamp(20px, 2vw, 28px)",
                  lineHeight: 1.55,
                  letterSpacing: "-0.01em",
                }}
              >
                {card.detailedDescription || card.description}
              </p>

              {/* Highlights — numbered list, no cards */}
              {card.highlights && card.highlights.length > 0 && (
                <div data-reveal style={{ marginTop: "clamp(48px, 6vh, 72px)" }}>
                  <div
                    className="w-full"
                    style={{
                      height: 1,
                      background: "rgba(255,255,255,0.08)",
                      marginBottom: "clamp(32px, 4vh, 48px)",
                    }}
                  />
                  <span
                    className="font-['Geist_Mono',sans-serif] uppercase tracking-[0.15em] text-gold-light/60"
                    style={{ fontSize: 10 }}
                  >
                    Diferenciais
                  </span>

                  <div className="flex flex-col" style={{ marginTop: 24 }}>
                    {card.highlights.map((h, i) => (
                      <div
                        key={i}
                        data-reveal
                        className="flex items-baseline gap-5 lg:gap-8"
                        style={{
                          padding: "20px 0",
                          borderBottom: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <span
                          className="font-['Arimo',sans-serif] text-gold-light/40 shrink-0"
                          style={{
                            fontSize: "clamp(28px, 2.5vw, 40px)",
                            fontWeight: 400,
                            lineHeight: 1,
                            letterSpacing: "-0.04em",
                            width: "clamp(32px, 3vw, 48px)",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="font-['Geist',sans-serif] text-cream/70"
                          style={{
                            fontSize: "clamp(16px, 1.2vw, 20px)",
                            lineHeight: 1.5,
                            fontWeight: 400,
                          }}
                        >
                          {h}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────
          TESTIMONIALS — warm cream background
         ──────────────────────────────────────────────── */}
      {card.testimonials && card.testimonials.length > 0 && (
        <section
          data-section-reveal
          className="relative w-full"
          style={{
            background: "linear-gradient(180deg, var(--color-bg-cream) 0%, #FFFFFF 100%)",
            paddingTop: "clamp(80px, 12vh, 140px)",
            paddingBottom: "clamp(80px, 10vh, 120px)",
          }}
        >
          <div className="px-6 md:px-12 lg:px-16">
            <div
              data-reveal
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8 mb-12 md:mb-20"
            >
              <div>
                <span
                  className="font-['Geist_Mono',sans-serif] uppercase tracking-[0.15em] text-gold-light"
                  style={{ fontSize: 11, fontWeight: 500 }}
                >
                  Depoimentos
                </span>
                <h2
                  className="font-['Arimo',sans-serif] text-navy"
                  style={{
                    margin: 0,
                    marginTop: 12,
                    fontWeight: 400,
                    fontSize: "clamp(28px, 3.2vw, 44px)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Relatos de quem{" "}
                  <br className="hidden md:block" />
                  confiou no tratamento
                </h2>
              </div>
              <p
                data-reveal
                className="font-['Arimo',sans-serif] text-navy/50"
                style={{
                  margin: 0,
                  fontSize: "clamp(14px, 1.1vw, 18px)",
                  lineHeight: 1.5,
                  maxWidth: 340,
                }}
              >
                Cada história é única. Conheça a experiência de pacientes que passaram pelo mesmo tratamento.
              </p>
            </div>

            <div
              data-reveal
              className="w-full mb-10 md:mb-14"
              style={{ height: 1, background: "rgba(26, 41, 63, 0.12)" }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              {card.testimonials.map((t, i) => (
                <article
                  key={i}
                  data-reveal
                  className="group relative flex flex-col justify-between rounded-2xl border border-navy/[0.08] bg-white p-8 md:p-10 lg:p-12 transition-all duration-400 hover:border-gold-light/30 hover:shadow-[0_8px_40px_-12px_rgba(26,41,63,0.08)]"
                >
                  <div className="flex flex-col gap-6 md:gap-8">
                    <svg
                      className="w-[40px] h-[34px] md:w-[55px] md:h-[47px]"
                      viewBox="0 0 55 47"
                      fill="none"
                    >
                      <path
                        d="M0 47V31.1667C0 25.7778 1.02778 20.6389 3.08333 15.75C5.13889 10.8611 8.55556 6.22222 13.3333 1.83333L22.9167 8.25C19.6944 11.4722 17.3472 14.8889 15.875 18.5C14.4028 22.1111 13.6667 25.7778 13.6667 29.5H23.8333V47H0ZM31.1667 47V31.1667C31.1667 25.7778 32.1944 20.6389 34.25 15.75C36.3056 10.8611 39.7222 6.22222 44.5 1.83333L54.0833 8.25C50.8611 11.4722 48.5139 14.8889 47.0417 18.5C45.5694 22.1111 44.8333 25.7778 44.8333 29.5H55V47H31.1667Z"
                        fill="var(--color-accent-gold-light)"
                      />
                    </svg>
                    <p
                      className="font-['Arimo',sans-serif] font-normal text-navy leading-[1.18] tracking-[-0.02em]"
                      style={{ fontSize: "clamp(18px, 2vw, 32px)" }}
                    >
                      {t.quote}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-8 md:mt-10 pt-6 border-t border-navy/[0.08]">
                    <div className="size-10 rounded-full bg-navy/[0.06] flex items-center justify-center">
                      <span className="font-['Geist',sans-serif] font-medium text-navy/40 text-sm">
                        {t.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span
                        className="font-['Arimo',sans-serif] font-normal text-navy leading-[1.3]"
                        style={{ fontSize: "clamp(14px, 1vw, 18px)" }}
                      >
                        {t.name}
                      </span>
                      <span
                        className="font-['Arimo',sans-serif] font-normal text-navy/40 leading-[1.3]"
                        style={{ fontSize: "clamp(12px, 0.9vw, 15px)" }}
                      >
                        {t.role}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ────────────────────────────────────────────────
          NAVIGATION — prev / next specialty
         ──────────────────────────────────────────────── */}
      <section
        data-section-reveal
        className="relative w-full"
        style={{
          background: "var(--color-bg-deep)",
          paddingTop: "clamp(48px, 6vh, 80px)",
          paddingBottom: "clamp(48px, 6vh, 80px)",
        }}
      >
        <div className="px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {/* Previous */}
            {prevCard ? (
              <Link
                to={`/especialidade/${prevCard.slug}`}
                data-reveal
                className="group relative flex flex-col justify-end overflow-hidden"
                style={{
                  height: "clamp(200px, 24vh, 280px)",
                  textDecoration: "none",
                }}
              >
                {prevCard.image && (
                  <>
                    <img
                      src={prevCard.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(13, 26, 45, 0.9) 0%, rgba(13, 26, 45, 0.3) 60%, rgba(13, 26, 45, 0.15) 100%)",
                      }}
                    />
                  </>
                )}
                {!prevCard.image && (
                  <div
                    className="absolute inset-0"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  />
                )}
                <div
                  className="relative z-10"
                  style={{ padding: "clamp(20px, 3vw, 32px)" }}
                >
                  <span
                    className="font-['Geist_Mono',sans-serif] uppercase tracking-[0.15em] text-cream/30 flex items-center gap-2"
                    style={{ fontSize: 10, marginBottom: 8 }}
                  >
                    <svg
                      width={14}
                      height={14}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 12H5" />
                      <path d="M12 19l-7-7 7-7" />
                    </svg>
                    Anterior
                  </span>
                  <span
                    className="font-['Arimo',sans-serif] text-cream group-hover:text-gold-light transition-colors duration-300"
                    style={{
                      fontSize: "clamp(20px, 2vw, 28px)",
                      fontWeight: 400,
                      lineHeight: 1.2,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {prevCard.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {/* Next */}
            {nextCard ? (
              <Link
                to={`/especialidade/${nextCard.slug}`}
                data-reveal
                className="group relative flex flex-col justify-end overflow-hidden"
                style={{
                  height: "clamp(200px, 24vh, 280px)",
                  textDecoration: "none",
                }}
              >
                {nextCard.image && (
                  <>
                    <img
                      src={nextCard.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(13, 26, 45, 0.9) 0%, rgba(13, 26, 45, 0.3) 60%, rgba(13, 26, 45, 0.15) 100%)",
                      }}
                    />
                  </>
                )}
                {!nextCard.image && (
                  <div
                    className="absolute inset-0"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  />
                )}
                <div
                  className="relative z-10 text-right"
                  style={{ padding: "clamp(20px, 3vw, 32px)" }}
                >
                  <span
                    className="font-['Geist_Mono',sans-serif] uppercase tracking-[0.15em] text-cream/30 flex items-center justify-end gap-2"
                    style={{ fontSize: 10, marginBottom: 8 }}
                  >
                    Próxima
                    <svg
                      width={14}
                      height={14}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </span>
                  <span
                    className="font-['Arimo',sans-serif] text-cream group-hover:text-gold-light transition-colors duration-300"
                    style={{
                      fontSize: "clamp(20px, 2vw, 28px)",
                      fontWeight: 400,
                      lineHeight: 1.2,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {nextCard.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* All specialties link */}
          <div
            data-reveal
            className="flex items-center justify-center"
            style={{ marginTop: "clamp(32px, 4vh, 48px)" }}
          >
            <Link
              to="/#especialidades"
              className="font-['Geist',sans-serif] text-cream/30 transition-colors duration-300 hover:text-cream/60 flex items-center gap-2"
              style={{
                fontSize: 13,
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "0.02em",
              }}
            >
              Ver todas as especialidades
              <svg
                width={14}
                height={14}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
