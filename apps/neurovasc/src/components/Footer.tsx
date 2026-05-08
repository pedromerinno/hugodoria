import Image from "next/image";
import Link from "next/link";

const navegue = [
  { label: "Início", href: "#topo" },
  { label: "Sobre mim", href: "#trajetoria" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
];

const especialidades = [
  "Schwannoma Vestibular",
  "Aneurisma Cerebral",
  "MAVs",
  "Tumores Hipofisários",
  "Espasmo Hemifacial",
  "Neuralgia do Trigêmio",
  "Cavernomas",
  "Tumores Cerebrais",
];

// Telefone deliberadamente omitido até que o número oficial esteja disponível
// — preferimos esconder a linha do que publicar um placeholder dummy ao vivo.
const contatos = [
  { label: "contato@hugodoria.com", href: "mailto:contato@hugodoria.com" },
];

function SocialIcon({
  href,
  icon,
  label,
}: {
  href: string;
  icon: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="flex h-[40px] w-[40px] items-center justify-center rounded-full transition-colors hover:bg-white/5"
    >
      <Image src={icon} alt="" width={40} height={40} className="block h-[40px] w-[40px]" />
    </Link>
  );
}

export default function Footer() {
  return (
    <footer
      id="contato"
      className="relative z-10 -mt-[24px] w-full rounded-t-[24px] bg-primaryDeep pt-12 pb-8 sm:pt-16 lg:pt-[80px] lg:pb-[50px]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-[45px]">
        <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:flex lg:items-start lg:justify-between lg:gap-12 lg:pb-[80px]">
          {/* Brand + address */}
          <div className="flex max-w-[384px] flex-col gap-[38px]">
            <Image
              src="/assets/logo-neurosurgic.svg"
              alt="Neurosurgic"
              width={176}
              height={51}
              className="block h-auto w-[140px] lg:w-[172px]"
            />
            <p className="m-0 font-display text-[14px] font-normal leading-[1.5] text-white">
              R. Teixeira da Silva, 54 - 73 - Bela Vista,
              <br />
              São Paulo - SP, 04002-030, Brasil
            </p>
          </div>

          {/* Right columns */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:w-[696px] lg:gap-[32px]">
            {/* Navegue */}
            <div>
              <h4 className="m-0 font-display text-[16px] font-medium leading-[1.3] text-white">
                Navegue
              </h4>
              <ul className="mt-4 flex flex-col gap-[8px]">
                {navegue.map((item) => (
                  <li key={item.label} className="list-none">
                    <Link
                      href={item.href}
                      className="font-display text-[16px] font-normal leading-[1.3] text-white/80 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Especialidades */}
            <div>
              <h4 className="m-0 font-display text-[16px] font-medium leading-[1.3] text-white">
                Especialidades
              </h4>
              <ul className="mt-4 flex flex-col gap-[8px]">
                {especialidades.map((label, i) => (
                  <li key={`${label}-${i}`} className="list-none">
                    <Link
                      href="#"
                      className="font-display text-[16px] font-normal leading-[1.3] text-white/80 transition-colors hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h4 className="m-0 font-display text-[16px] font-medium leading-[1.3] text-white">
                Contato
              </h4>
              <ul className="mt-4 flex flex-col gap-[8px]">
                {contatos.map((item) => (
                  <li key={item.label} className="list-none">
                    <Link
                      href={item.href}
                      className="font-display text-[16px] font-normal leading-[1.3] text-white/80 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex w-full flex-col items-start gap-6 rounded-[16px] bg-white/[0.06] px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 lg:h-[112px] lg:py-0 lg:pl-[32px] lg:pr-[24px]">
          <div className="flex items-center gap-[8px]">
            <SocialIcon
              href="#"
              icon="/assets/social-linkedin.svg"
              label="LinkedIn"
            />
            <SocialIcon
              href="#"
              icon="/assets/social-instagram.svg"
              label="Instagram"
            />
            <SocialIcon
              href="#"
              icon="/assets/social-facebook.svg"
              label="Facebook"
            />
          </div>

          <p className="m-0 font-display text-[14px] font-normal leading-[1.5] text-muted">
            Copyright © 2026 Neurosurgic. Todos os direitos reservados.
          </p>

          <Link
            href="#topo"
            className="inline-flex items-center gap-2 font-display text-[14px] font-medium leading-[1.5] text-muted transition-colors hover:text-white"
          >
            <span>Voltar ao topo</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
            >
              <path
                d="M7 11V3M3 7l4-4 4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
