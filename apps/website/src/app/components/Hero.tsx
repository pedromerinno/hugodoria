import { useEffect, useRef, useState } from "react";
import imgHeroDoria from "@/assets/figma-7258-548.png";
import { gsap } from "../../lib/gsap";
import { getLenis } from "../../lib/lenis";

const NAV_ITEMS: Array<{ label: string; href: string; active?: boolean }> = [
  { label: "Início", href: "#inicio", active: true },
  { label: "Sobre mim", href: "#sobre-mim" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Doutorado", href: "#doutorado" },
  { label: "Eventos", href: "#eventos" },
];

function navigateTo(href: string) {
  const lenis = getLenis();
  if (href === "#inicio") {
    lenis
      ? lenis.scrollTo(0, { duration: 1.2 })
      : window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const target = document.querySelector(href);
  if (!target) return;
  lenis
    ? lenis.scrollTo(target as HTMLElement, { offset: -40, duration: 1.2 })
    : (target as HTMLElement).scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Split the title into word spans for per-word reveal
    const titleEl = root.querySelector<HTMLElement>("[data-hero='title']");
    let titleWords: HTMLSpanElement[] = [];
    if (titleEl && titleEl.dataset.split !== "done") {
      const text = titleEl.textContent ?? "";
      titleEl.innerHTML = "";
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
        outer.style.lineHeight = "1.1";
        const inner = document.createElement("span");
        inner.style.display = "inline-block";
        inner.textContent = token;
        outer.appendChild(inner);
        titleEl.appendChild(outer);
        titleWords.push(inner);
      });
      titleEl.dataset.split = "done";
    }

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set("[data-hero='curtain']", { autoAlpha: 1 });
      gsap.set("[data-hero='photo-inner']", {
        clipPath: "inset(100% 0% 0% 0%)",
        scale: 1.12,
      });
      gsap.set("[data-hero='brand']", { autoAlpha: 0, y: -16 });
      gsap.set("[data-hero='nav'] > *", { autoAlpha: 0, y: -16 });
      gsap.set("[data-hero='eyebrow']", { autoAlpha: 0, x: -24 });
      gsap.set("[data-hero='divider']", {
        scaleX: 0,
        transformOrigin: "left center",
      });
      if (titleWords.length) gsap.set(titleWords, { yPercent: 110 });
      gsap.set("[data-hero='description']", { autoAlpha: 0, y: 24 });
      gsap.set("[data-hero='wordmark']", {
        clipPath: "inset(100% 0% 0% 0%)",
        yPercent: 20,
      });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // 1. Curtain dissolves
      tl.to("[data-hero='curtain']", {
        autoAlpha: 0,
        duration: 1.0,
        ease: "power2.inOut",
      });

      // 2. Photo reveals from the ground, scaling down to rest
      tl.to(
        "[data-hero='photo-inner']",
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.6,
          ease: "expo.out",
        },
        "<0.1"
      );

      // 3. Header crawls down
      tl.to(
        "[data-hero='brand']",
        { autoAlpha: 1, y: 0, duration: 0.9 },
        "<0.15"
      ).to(
        "[data-hero='nav'] > *",
        { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.06 },
        "<0.05"
      );

      // 4. Eyebrow slides in from the left
      tl.to(
        "[data-hero='eyebrow']",
        { autoAlpha: 1, x: 0, duration: 1.0 },
        "<0.2"
      );

      // 5. Dividers draw
      tl.to(
        "[data-hero='divider']",
        { scaleX: 1, duration: 1.0, stagger: 0.08 },
        "<0.1"
      );

      // 6. Title words rise from a mask
      if (titleWords.length) {
        tl.to(
          titleWords,
          { yPercent: 0, duration: 1.1, stagger: 0.05 },
          "<0.05"
        );
      }

      // 7. Description fades up
      tl.to(
        "[data-hero='description']",
        { autoAlpha: 1, y: 0, duration: 1.0 },
        "<0.3"
      );

      // 8. Wordmark reveals from the baseline
      tl.to(
        "[data-hero='wordmark']",
        {
          clipPath: "inset(0% 0% 0% 0%)",
          yPercent: 0,
          duration: 1.4,
          ease: "expo.out",
        },
        "<0.05"
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative w-full min-h-screen overflow-hidden flex flex-col"
      style={{
        background: "linear-gradient(180deg, var(--color-bg-deeper) 1.34%, var(--color-bg-mid) 133.58%)",
      }}
      data-hero-root
    >
      {/* Doctor photo — centered, full height behind content */}
      <div
        data-hero="photo"
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center z-0"
      >
        <div data-hero="photo-inner" className="will-change-[clip-path,transform]">
          <img
            src={imgHeroDoria}
            alt="Dr. Hugo Doria"
            className="h-[65vh] sm:h-[88vh] lg:h-[96vh] max-h-none min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] w-auto max-w-none object-contain object-bottom select-none block"
            draggable={false}
          />
        </div>
      </div>

      {/* Gradient scrim — keeps text readable over the photo on mobile */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[55%] sm:h-[45%] lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, var(--color-bg-deeper) 0%, var(--color-bg-deeper) 30%, transparent 100%)",
        }}
      />

      {/* Entrance curtain — dissolves on load */}
      <div
        data-hero="curtain"
        aria-hidden
        className="pointer-events-none absolute inset-0 z-30"
        style={{
          background:
            "linear-gradient(180deg, var(--color-bg-deeper) 0%, var(--color-bg-deeper) 60%, var(--color-bg-deep) 100%)",
        }}
      />

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-6 md:px-8 pt-5">
        <span
          data-hero="brand"
          className="font-['Geist',sans-serif] font-bold text-cream text-[10px] leading-[0.92] tracking-[-0.04em]"
        >
          DR. HUGO DORIA®
        </span>
        <nav
          data-hero="nav"
          className="hidden lg:flex items-center gap-4 font-['Geist',sans-serif] font-medium text-[14px] leading-[1.5]"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                navigateTo(item.href);
              }}
              className={item.active ? "text-gold-light" : "text-cream"}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 text-cream"
        >
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden>
            <path d="M0 1H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M0 7H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M0 13H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      {/* Mobile nav overlay */}
      <div
        className="lg:hidden fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          background: "rgba(13, 22, 38, 0.96)",
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between px-6 pt-5">
          <span className="font-['Geist',sans-serif] font-bold text-cream text-[10px] leading-[0.92] tracking-[-0.04em]">
            DR. HUGO DORIA®
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
            className="inline-flex items-center justify-center w-10 h-10 -mr-2 text-cream"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M2 2L18 18M18 2L2 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-6 px-6 pt-16 font-['Geist',sans-serif] font-medium text-[24px] leading-[1.2] tracking-[-0.02em]">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                setTimeout(() => navigateTo(item.href), 240);
              }}
              className={item.active ? "text-gold-light" : "text-cream"}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Content grid */}
      <div className="relative z-10 flex-1 grid grid-cols-12 gap-x-6 gap-y-10 px-6 md:px-8 pt-14 sm:pt-20 lg:pt-[18vh] content-start">
        {/* Left: eyebrow + title */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
          <p
            data-hero="eyebrow"
            className="font-['Geist_Mono',sans-serif] font-medium uppercase text-soft text-[14px] sm:text-[16px] lg:text-[20px] leading-[0.92] tracking-[0.07em]"
          >
            MD PhD – Neurocirurgião
          </p>
          <div
            data-hero="divider"
            className="mt-5 lg:mt-[26px] h-px w-full max-w-[416px] bg-white/24"
          />
          <h1
            data-hero="title"
            className="mt-5 lg:mt-[22px] font-['Geist',sans-serif] font-normal text-cream leading-[1.1] tracking-[-0.04em] max-w-[375px]"
            style={{ fontSize: "clamp(28px, 3.2vw, 48px)" }}
          >
            A Neurocirurgia é uma arte. A maior honra é poder exercê-la
          </h1>
        </div>

        {/* Right: description */}
        <div className="col-span-12 md:col-start-7 md:col-span-6 lg:col-start-10 lg:col-span-3 md:justify-self-end lg:justify-self-end w-full max-w-[420px]">
          <div
            data-hero="divider"
            className="h-px w-full bg-white/24"
          />
          <p
            data-hero="description"
            className="mt-5 lg:mt-[22px] font-['Geist',sans-serif] font-normal text-cream leading-[1.41]"
            style={{ fontSize: "clamp(15px, 1.4vw, 24px)" }}
          >
            Transformando vidas com inovação, pesquisa avançada e precisão em tratamentos Neurológicos Complexos, proporcionando qualidade e segurança aos pacientes.
          </p>
        </div>
      </div>

      {/* Wordmark — full width at baseline */}
      <div className="relative z-10 w-full px-6 md:px-8 pb-4 md:pb-6 mt-auto overflow-hidden">
        <svg
          data-hero="wordmark"
          viewBox="0 0 1858 238"
          className="block w-full h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Hugo Doria"
        >
          <path d="M0 232.32V5.11999H34.56V114.56L17.92 102.4H156.16L139.52 114.56V5.11999H174.08V232.32H139.52V121.6L156.16 133.76H17.92L34.56 121.6V232.32H0Z" fill="var(--color-accent-gold-light)" />
          <path d="M298.07 237.44C280.15 237.44 264.47 234.027 251.03 227.2C237.803 220.16 227.563 210.24 220.31 197.44C213.27 184.64 209.75 169.493 209.75 152V4.8H244.31V152C244.31 169.28 249.003 182.613 258.39 192C267.777 201.173 281.003 205.76 298.07 205.76C315.137 205.76 328.363 201.173 337.75 192C347.137 182.613 351.83 169.28 351.83 152V4.8H386.39V152C386.39 169.493 382.763 184.64 375.51 197.44C368.47 210.24 358.337 220.16 345.11 227.2C331.883 234.027 316.203 237.44 298.07 237.44Z" fill="var(--color-accent-gold-light)" />
          <path d="M506.818 237.44C485.271 237.44 466.818 232.427 451.458 222.4C436.098 212.16 424.364 198.187 416.258 180.48C408.151 162.56 404.098 142.08 404.098 119.04C404.098 96.2133 408.151 75.84 416.258 57.92C424.578 40 436.524 25.92 452.098 15.68C467.671 5.22666 486.337 0 508.098 0C526.658 0 542.338 3.30666 555.138 9.91999C568.151 16.5333 578.391 25.6 585.858 37.12C593.538 48.64 598.871 61.76 601.858 76.48L565.698 78.4C563.138 64.5333 557.378 53.3333 548.418 44.8C539.458 36.0533 526.018 31.68 508.098 31.68C492.311 31.68 479.404 35.6267 469.378 43.52C459.351 51.4133 451.884 61.9733 446.978 75.2C442.284 88.4267 439.938 103.04 439.938 119.04C439.938 135.68 442.284 150.507 446.978 163.52C451.884 176.533 459.351 186.88 469.378 194.56C479.617 202.027 492.631 205.76 508.418 205.76C520.791 205.76 531.458 203.093 540.418 197.76C549.378 192.427 556.311 185.173 561.218 176C566.338 166.827 569.111 156.693 569.538 145.6H508.738V116.48H602.497V232.32H578.818L576.578 181.12L581.057 184.96C578.711 195.2 573.911 204.267 566.658 212.16C559.404 220.053 550.551 226.24 540.098 230.72C529.858 235.2 518.764 237.44 506.818 237.44Z" fill="var(--color-accent-gold-light)" />
          <path d="M718.943 237.44C696.969 237.44 678.089 232.747 662.303 223.36C646.516 213.76 634.356 200.107 625.823 182.4C617.289 164.693 613.023 143.573 613.023 119.04C613.023 94.5067 617.289 73.3867 625.823 55.68C634.356 37.76 646.516 24 662.303 14.4C678.089 4.8 696.969 0 718.943 0C741.129 0 760.116 4.8 775.903 14.4C791.903 24 804.063 37.76 812.383 55.68C820.916 73.3867 825.183 94.5067 825.183 119.04C825.183 143.573 820.916 164.693 812.383 182.4C804.063 200.107 791.903 213.76 775.903 223.36C760.116 232.747 741.129 237.44 718.943 237.44ZM718.943 205.76C733.662 205.76 746.249 202.347 756.703 195.52C767.369 188.693 775.476 178.88 781.023 166.08C786.569 153.067 789.343 137.387 789.343 119.04C789.343 100.693 786.569 85.0133 781.023 72C775.476 58.9867 767.369 49.0667 756.703 42.24C746.249 35.2 733.662 31.68 718.943 31.68C704.436 31.68 691.956 35.2 681.503 42.24C671.049 49.0667 662.943 58.9867 657.183 72C651.636 85.0133 648.863 100.693 648.863 119.04C648.863 137.387 651.636 153.067 657.183 166.08C662.943 178.88 671.049 188.693 681.503 195.52C691.956 202.347 704.436 205.76 718.943 205.76Z" fill="var(--color-accent-gold-light)" />
          <path d="M982.928 232.32V5.11999H1055.89C1091.51 5.11999 1118.93 15.04 1138.13 34.88C1157.33 54.5067 1166.93 82.56 1166.93 119.04C1166.93 155.307 1157.43 183.253 1138.45 202.88C1119.67 222.507 1092.79 232.32 1057.81 232.32H982.928ZM1017.49 200.64H1055.89C1081.06 200.64 1099.83 193.92 1112.21 180.48C1124.79 166.827 1131.09 146.347 1131.09 119.04C1131.09 91.3067 1124.79 70.72 1112.21 57.28C1099.83 43.6267 1081.06 36.8 1055.89 36.8H1017.49V200.64Z" fill="var(--color-accent-gold-light)" />
          <path d="M1281.83 237.44C1259.86 237.44 1240.98 232.747 1225.19 223.36C1209.41 213.76 1197.25 200.107 1188.71 182.4C1180.18 164.693 1175.91 143.573 1175.91 119.04C1175.91 94.5067 1180.18 73.3867 1188.71 55.68C1197.25 37.76 1209.41 24 1225.19 14.4C1240.98 4.8 1259.86 0 1281.83 0C1304.02 0 1323.01 4.8 1338.79 14.4C1354.79 24 1366.95 37.76 1375.27 55.68C1383.81 73.3867 1388.07 94.5067 1388.07 119.04C1388.07 143.573 1383.81 164.693 1375.27 182.4C1366.95 200.107 1354.79 213.76 1338.79 223.36C1323.01 232.747 1304.02 237.44 1281.83 237.44ZM1281.83 205.76C1296.55 205.76 1309.14 202.347 1319.59 195.52C1330.26 188.693 1338.37 178.88 1343.91 166.08C1349.46 153.067 1352.23 137.387 1352.23 119.04C1352.23 100.693 1349.46 85.0133 1343.91 72C1338.37 58.9867 1330.26 49.0667 1319.59 42.24C1309.14 35.2 1296.55 31.68 1281.83 31.68C1267.33 31.68 1254.85 35.2 1244.39 42.24C1233.94 49.0667 1225.83 58.9867 1220.07 72C1214.53 85.0133 1211.75 100.693 1211.75 119.04C1211.75 137.387 1214.53 153.067 1220.07 166.08C1225.83 178.88 1233.94 188.693 1244.39 195.52C1254.85 202.347 1267.33 205.76 1281.83 205.76Z" fill="var(--color-accent-gold-light)" />
          <path d="M1405.78 232.32V5.11999H1496.34C1512.55 5.11999 1526.52 7.89333 1538.26 13.44C1549.99 18.9867 1559.06 26.88 1565.46 37.12C1571.86 47.36 1575.06 59.52 1575.06 73.6C1575.06 83.84 1572.71 93.0133 1568.02 101.12C1563.54 109.227 1557.46 115.733 1549.78 120.64C1542.31 125.333 1534.31 128 1525.78 128.64L1524.18 125.76C1538.47 125.76 1549.56 129.067 1557.46 135.68C1565.35 142.08 1569.94 152.213 1571.22 166.08L1577.3 232.32H1542.42L1536.98 170.56C1536.34 161.387 1533.24 154.667 1527.7 150.4C1522.15 145.92 1513.08 143.68 1500.5 143.68H1440.34V232.32H1405.78ZM1440.34 112H1496.98C1509.99 112 1520.23 108.8 1527.7 102.4C1535.38 95.7867 1539.22 86.5067 1539.22 74.56C1539.22 62.4 1535.38 53.12 1527.7 46.72C1520.02 40.1067 1508.82 36.8 1494.1 36.8H1440.34V112Z" fill="var(--color-accent-gold-light)" />
          <path d="M1604.08 232.32V5.11999H1638.64V232.32H1604.08Z" fill="var(--color-accent-gold-light)" />
          <path d="M1650.32 232.32L1732.24 5.11999H1776.08L1858 232.32H1821.2L1800.4 173.12H1707.6L1687.12 232.32H1650.32ZM1718.48 141.76H1789.84L1754 38.08L1718.48 141.76Z" fill="var(--color-accent-gold-light)" />
        </svg>
      </div>
    </section>
  );
}
