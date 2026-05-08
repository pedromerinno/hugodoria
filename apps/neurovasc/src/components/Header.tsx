"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Quem somos", href: "#institucional", hasMenu: false },
  { label: "Cursos", href: "#programas", hasMenu: false },
  { label: "Dr. Hugo Dória", href: "#trajetoria", hasMenu: false },
];

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

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Quem somos");
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Body scroll lock + ESC + click-outside handling. Combined into a single
  // effect so the listeners are added/removed in lockstep with `open` —
  // otherwise an unmount-mid-transition can leave the body frozen.
  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      const drawer = drawerRef.current;
      const trigger = triggerRef.current;
      const target = e.target as Node | null;
      if (!drawer || !target) return;
      // Ignore clicks on the trigger itself — let it toggle naturally.
      if (trigger?.contains(target)) return;
      if (!drawer.contains(target)) setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      html.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, [open]);

  return (
    <nav
      aria-label="Principal"
      className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]"
    >
      {/* Left — Logo */}
      <div className="flex items-center justify-self-start">
        <Link href="#topo" aria-label="Neurosurgic" className="flex items-center">
          <Image
            src="/assets/logo-neurosurgic.svg"
            alt="Neurosurgic"
            width={176}
            height={51}
            priority
            className="h-[36px] w-auto sm:h-[44px] lg:h-[51px]"
          />
        </Link>
      </div>

      {/* Center — Menu (desktop) */}
      <div className="hidden items-center justify-self-center lg:flex">
        <div className="glass flex h-[49px] items-center rounded-full pl-[2px] pr-[14px]">
          {navItems.map((item) => {
            const isActive = active === item.label;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setActive(item.label)}
                className={[
                  "flex h-[45px] items-center gap-[6px] whitespace-nowrap rounded-full px-[16px] text-[14px] font-medium transition-colors",
                  isActive
                    ? "bg-sand text-primary"
                    : "text-white hover:text-white/90",
                ].join(" ")}
              >
                <span>{item.label}</span>
                {item.hasMenu && (
                  <ChevronDown
                    className={isActive ? "text-primary" : "text-white/80"}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right — CTA (desktop) */}
      <div className="hidden items-center justify-self-end lg:flex">
        <Link
          href="#inscricao"
          className="flex h-[48px] items-center gap-[8px] rounded-full bg-primarySoft px-[26px] text-[14px] font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.99]"
        >
          <PlusIcon className="text-white" />
          <span>Inscrever-se</span>
        </Link>
      </div>

      {/* Right — Mobile (hamburger + compact CTA).
          We keep the hamburger always available on mobile and surface the
          CTA from sm+ onwards; on the smallest viewports the drawer is the
          only entry point — that's intentional, the FloatingMenu carries
          the CTA after first scroll. */}
      <div className="flex items-center gap-2 justify-self-end lg:hidden">
        <Link
          href="#inscricao"
          className="hidden h-[40px] items-center gap-[6px] rounded-full bg-primarySoft px-4 text-[13px] font-semibold text-white sm:flex"
        >
          <PlusIcon className="text-white" />
          <span>Inscrever-se</span>
        </Link>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          className="glass flex h-[44px] w-[44px] items-center justify-center rounded-full"
        >
          {open ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M3 3l10 10M13 3L3 13"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden>
              <path d="M0 1h20M0 7h20M0 13h20" stroke="white" strokeWidth="1.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer — fixed-positioned so it covers the page (not just
          the hero), with a dimmed backdrop. Trapping focus would be ideal
          but the menu is short enough that ESC + click-outside cover the
          common cases without the complexity of a full focus-trap lib. */}
      {open && (
        <>
          <div
            aria-hidden
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-ink/55 backdrop-blur-sm lg:hidden"
          />
          <div
            id="mobile-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            className="fixed inset-x-4 top-[88px] z-50 rounded-2xl border border-white/10 bg-ink/85 p-3 text-white shadow-2xl backdrop-blur-xl lg:hidden"
            style={{
              top: "calc(env(safe-area-inset-top, 0px) + 88px)",
            }}
          >
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="block rounded-xl px-4 py-3 text-[15px] font-medium hover:bg-white/10"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="#inscricao"
              onClick={() => setOpen(false)}
              className="mt-2 flex h-[48px] items-center justify-center gap-2 rounded-full bg-primary text-[14px] font-semibold text-white sm:hidden"
            >
              <PlusIcon className="text-white" />
              <span>Inscrever-se</span>
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}
