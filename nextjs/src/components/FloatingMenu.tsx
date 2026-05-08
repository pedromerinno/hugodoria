"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Institucional", href: "#institucional", hasMenu: false },
  { label: "Cursos", href: "#programas", hasMenu: false },
  { label: "Dr. Hugo Dória", href: "#trajetoria", hasMenu: false },
];

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M1 1l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M7 1.5v11M1.5 7h11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

const SHOW_AFTER = 480;

export default function FloatingMenu() {
  const [active, setActive] = useState("Institucional");
  const [visible, setVisible] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const target = document.getElementById("contato");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      { rootMargin: "0px 0px -10% 0px", threshold: 0 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const shown = visible && !footerInView;

  return (
    <div
      aria-hidden={!shown}
      className={[
        "pointer-events-none fixed inset-x-0 z-50 flex justify-center px-4 transition-all duration-500 ease-out",
        "bottom-[max(16px,env(safe-area-inset-bottom))] sm:bottom-6",
        shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0",
      ].join(" ")}
    >
      <nav
        aria-label="Navegação flutuante"
        className={[
          "pointer-events-auto flex items-center gap-1 rounded-full border border-white/10 bg-ink/70 p-[6px] pr-[10px] text-white shadow-[0_18px_40px_-12px_rgba(11,12,34,0.45)] backdrop-blur-2xl",
          "max-w-[min(960px,calc(100vw-32px))]",
        ].join(" ")}
      >
        {/* Desktop items */}
        <div className="hidden items-center lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.label;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setActive(item.label)}
                className={[
                  "flex h-[40px] items-center gap-[6px] whitespace-nowrap rounded-full px-[14px] text-[13px] font-medium transition-colors",
                  isActive
                    ? "bg-white text-ink"
                    : "text-white/85 hover:bg-white/8 hover:text-white",
                ].join(" ")}
              >
                <span>{item.label}</span>
                {item.hasMenu && (
                  <ChevronDown
                    className={isActive ? "text-ink/70" : "text-white/55"}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Tablet items — concise */}
        <div className="hidden items-center md:flex lg:hidden">
          {navItems.slice(0, 3).map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex h-[40px] items-center rounded-full px-[12px] text-[13px] font-medium text-white/85 transition-colors hover:bg-white/8 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile compact label */}
        <Link
          href="#topo"
          className="ml-1 flex h-[40px] items-center gap-2 rounded-full px-3 text-[13px] font-medium text-white/85 md:hidden"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path
              d="M7 11V3M3 7l4-4 4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Topo</span>
        </Link>

        {/* CTA */}
        <Link
          href="#inscricao"
          className="ml-1 flex h-[40px] items-center gap-[8px] rounded-full bg-primary px-[16px] text-[13px] font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.99]"
        >
          <PlusIcon className="text-white" />
          <span className="hidden sm:inline">Inscrever-se</span>
          <span className="sm:hidden">Inscrever</span>
        </Link>
      </nav>
    </div>
  );
}
