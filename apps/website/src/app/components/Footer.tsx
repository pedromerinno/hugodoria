import { Link } from "react-router";
import svgPaths from "../../imports/svg-nx92b0rij3";
import { cards } from "./section-especialidades/data";

const NAV_LINKS = [
  { label: "Início", href: "#inicio", active: true },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Sobre mim", href: "#sobre-mim" },
  { label: "Depoimentos", href: "#depoimentos" },
] as const;

const CONTACT = [
  "contato@hugodoria.com",
  "(00) 00000-0000",
] as const;

function LogoSection() {
  return (
    <div className="flex flex-col gap-8 max-w-[384px]">
      <div className="flex flex-col gap-2">
        <svg
          className="w-[258px] h-[31px]"
          viewBox="0 0 258 30.88"
          fill="none"
        >
          <g clipPath="url(#footer_logo_clip)">
            <path d={svgPaths.p81b8980} fill="var(--color-accent-gold)" />
            <path d={svgPaths.p11a36640} fill="var(--color-accent-gold)" />
            <path d={svgPaths.p3dc46180} fill="var(--color-accent-gold)" />
            <path d={svgPaths.p2bd68500} fill="var(--color-accent-gold)" />
            <path d={svgPaths.p2b958c80} fill="var(--color-accent-gold)" />
            <path d={svgPaths.p2735a400} fill="var(--color-accent-gold)" />
            <path d={svgPaths.p1b4d0f00} fill="var(--color-accent-gold)" />
            <path d={svgPaths.p19c37c80} fill="var(--color-accent-gold)" />
            <path d={svgPaths.p1e2b3880} fill="var(--color-accent-gold)" />
            <path d={svgPaths.p394d2b40} fill="var(--color-accent-gold)" />
            <path d={svgPaths.p7117700} fill="var(--color-accent-gold)" />
          </g>
          <defs>
            <clipPath id="footer_logo_clip">
              <rect fill="white" height="30.88" width="258" />
            </clipPath>
          </defs>
        </svg>
        <svg
          className="w-[106px] h-[9px] ml-[70px]"
          viewBox="0 0 105.658 8.274"
          fill="none"
        >
          <path d={svgPaths.p32b2e680} fill="var(--color-accent-gold)" />
          <path d={svgPaths.p388bbe40} fill="var(--color-accent-gold)" />
          <path d={svgPaths.p11de5580} fill="var(--color-accent-gold)" />
          <path d={svgPaths.p27d0dff0} fill="var(--color-accent-gold)" />
          <path d={svgPaths.p1bf3c480} fill="var(--color-accent-gold)" />
          <path d={svgPaths.p3674af00} fill="var(--color-accent-gold)" />
          <path d={svgPaths.pd2dba00} fill="var(--color-accent-gold)" />
          <path d={svgPaths.p17ebd300} fill="var(--color-accent-gold)" />
          <path d={svgPaths.p7f04100} fill="var(--color-accent-gold)" />
          <path d={svgPaths.p19bf5a00} fill="var(--color-accent-gold)" />
          <path d={svgPaths.p5094300} fill="var(--color-accent-gold)" />
          <path d={svgPaths.p37bc3100} fill="var(--color-accent-gold)" />
          <path d={svgPaths.p2195ba00} fill="var(--color-accent-gold)" />
          <path d={svgPaths.p1a136f00} fill="var(--color-accent-gold)" />
        </svg>
      </div>
      <p className="font-['Geist',sans-serif] font-normal text-cream text-sm leading-[1.5]">
        R. Teixeira da Silva, 54 - 73 - Bela Vista,
        <br />
        São Paulo - SP, 04002-030, Brasil
      </p>
    </div>
  );
}

function SocialLinkedin() {
  return (
    <svg className="size-10" viewBox="0 0 40 40" fill="none">
      <rect
        height="39"
        rx="19.5"
        stroke="var(--color-border-muted)"
        width="39"
        x="0.5"
        y="0.5"
      />
      <path d={svgPaths.p35111b00} fill="var(--color-text-tertiary)" />
    </svg>
  );
}

function SocialInstagram() {
  return (
    <div className="size-10 rounded-full border border-steel flex items-center justify-center">
      <svg className="size-[15px]" viewBox="0 0 14.99 15.31" fill="none">
        <path d={svgPaths.p9948b0} fill="var(--color-text-tertiary)" />
        <path d={svgPaths.p39b0fc80} fill="var(--color-icon-muted)" />
        <path d={svgPaths.p36950100} fill="var(--color-text-tertiary)" />
        <path d={svgPaths.p43f400} fill="var(--color-icon-muted)" />
      </svg>
    </div>
  );
}

function SocialFacebook() {
  return (
    <svg className="size-10" viewBox="0 0 40 40" fill="none">
      <rect
        height="39"
        rx="19.5"
        stroke="var(--color-border-muted)"
        width="39"
        x="0.5"
        y="0.5"
      />
      <path d={svgPaths.p3ebb0f80} fill="var(--color-text-tertiary)" />
    </svg>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-navy-deep">
      {/* Main content */}
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16 pt-16 md:pt-20 pb-32 md:pb-36">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-16">
          <LogoSection />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-base whitespace-nowrap">
            {/* Navigate */}
            <div className="flex flex-col gap-4">
              <h3 className="font-['Geist',sans-serif] font-medium text-cream leading-normal">
                Navegue
              </h3>
              <nav className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`font-['Geist',sans-serif] font-normal leading-normal transition-colors duration-200 hover:text-cream ${
                      link.active
                        ? "text-gold"
                        : "text-cream/50"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Specialties */}
            <div className="flex flex-col gap-4">
              <h3 className="font-['Geist',sans-serif] font-medium text-cream leading-normal">
                Especialidades
              </h3>
              <nav className="flex flex-col gap-2">
                {cards.map((card) => (
                  <Link
                    key={card.slug}
                    to={`/especialidade/${card.slug}`}
                    className="font-['Geist',sans-serif] font-normal text-cream/50 leading-normal transition-colors duration-200 hover:text-cream"
                  >
                    {card.title}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
              <h3 className="font-['Geist',sans-serif] font-medium text-cream leading-normal">
                Contato
              </h3>
              <div className="flex flex-col gap-2">
                {CONTACT.map((info) => (
                  <span
                    key={info}
                    className="font-['Geist',sans-serif] font-normal text-cream/50 leading-normal"
                  >
                    {info}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-[rgba(255,255,255,0.06)]">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16 h-[72px] md:h-[112px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SocialLinkedin />
            <SocialInstagram />
            <SocialFacebook />
          </div>

          <p className="hidden md:block font-['Geist',sans-serif] font-normal text-silver text-sm leading-normal whitespace-nowrap">
            Copyright © 2026 Hugo Doria. Todos os direitos reservados
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 font-['Geist',sans-serif] font-medium text-silver text-sm leading-[1.5] transition-colors duration-200 hover:text-cream"
          >
            Voltar ao topo
            <svg
              className="size-6 -rotate-90"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6.5 17L11.5 12L6.5 7"
                stroke="var(--color-accent-gold)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                opacity="0.4"
              />
              <path
                d="M12.5 17L17.5 12L12.5 7"
                stroke="var(--color-accent-gold)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
