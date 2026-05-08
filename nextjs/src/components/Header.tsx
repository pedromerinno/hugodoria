"use client";

import Link from "next/link";
import { useState } from "react";

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

  return (
    <nav
      aria-label="Principal"
      className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]"
    >
      {/* Left — Logo */}
      <div className="flex items-center justify-self-start">
        <Link href="#topo" aria-label="Neurosurgic" className="flex items-center">
          <img
            src="/assets/logo-neurosurgic.svg"
            alt="Neurosurgic"
            width={176}
            height={51}
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

      {/* Right — Mobile (hamburger + compact CTA) */}
      <div className="flex items-center gap-2 justify-self-end lg:hidden">
        <Link
          href="#inscricao"
          className="hidden h-[40px] items-center gap-[6px] rounded-full bg-primarySoft px-4 text-[13px] font-semibold text-white sm:flex"
        >
          <PlusIcon className="text-white" />
          <span>Inscrever-se</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
          aria-expanded={open}
          className="glass flex h-[44px] w-[44px] items-center justify-center rounded-full"
        >
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden>
            <path d="M0 1h20M0 7h20M0 13h20" stroke="white" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="absolute left-4 right-4 top-[80px] col-span-3 rounded-2xl bg-black/70 p-3 text-white backdrop-blur-md lg:hidden">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block rounded-full px-4 py-3 text-[14px] hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
