import Image from "next/image";
import Link from "next/link";
import Header from "./Header";

export default function Hero() {
  return (
    <section className="w-full bg-sand pt-[14px] pb-[16px]">
      <div className="w-full px-4 sm:px-6 lg:px-[15px]">
        {/* Hero panel — full width within safe-area, rounded */}
        <div className="relative w-full overflow-hidden rounded-[24px] min-h-[700px] sm:min-h-[820px] lg:h-[960px]">
          {/* Background image with overlays */}
          <div className="absolute inset-0">
            <Image
              src="/assets/bg-home.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover -scale-x-100"
              style={{ objectPosition: "50% 30%" }}
            />
            <div className="absolute inset-0 bg-white/60 mix-blend-soft-light" />
            <div
              className="absolute inset-0 mix-blend-soft-light"
              style={{ backgroundColor: "rgba(0,56,83,0.7)" }}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Header */}
          <div className="relative z-10 px-4 pt-[20px] sm:px-6 lg:px-[113px] lg:pt-[31px]">
            <Header />
          </div>

          {/* Content */}
          <div className="relative z-10 mt-[80px] px-4 sm:px-6 lg:absolute lg:left-[123px] lg:top-[326px] lg:mt-0 lg:px-0">
            {/* Glass tag bar */}
            <div className="hidden lg:absolute lg:-top-[48px] lg:left-[-10px] lg:flex">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-sky/20 px-3 py-2 backdrop-blur-md">
                <span className="text-[13px] font-medium text-white/90">
                  Formação clínica em alto nível
                </span>
              </div>
            </div>

            <h1 className="max-w-[629px] font-display text-[40px] font-normal leading-[1.04] tracking-tighterDisplay text-white sm:text-[56px] lg:text-[64px] lg:leading-[1.03]">
              <span className="block">Instituto de ensino</span>
              <span className="block">em Neurocirurgia e </span>
              <span className="relative inline-block align-baseline">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-[-0.12em] inset-y-[0.08em] rounded-[8px] bg-sky/25 backdrop-blur-[6px]"
                />
                <span className="relative text-skyLight">Neurociências</span>
              </span>
            </h1>

            <p className="mt-6 max-w-[372px] font-display text-[14px] leading-[22px] text-white sm:text-[16px] sm:leading-[24px] lg:mt-[36px]">
              Um ecossistema vivo de aprendizado criado por Dr. Hugo Dória,
              dedicado à formação e evolução contínua de médicos e profissionais
              da área.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2 lg:mt-[42px]">
              <Link
                href="#programas"
                className="flex h-[52px] min-w-[180px] items-center justify-center gap-[8px] rounded-full bg-primary px-[18px] text-[15px] font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.99]"
              >
                <Image
                  src="/assets/icon-play.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="block h-[24px] w-[24px]"
                />
                <span>Conhecer Programas</span>
              </Link>
              <Link
                href="#cursos"
                className="flex h-[52px] min-w-[180px] items-center justify-center gap-[8px] rounded-full border border-white/25 px-[26px] text-[14px] font-semibold text-white transition-colors hover:bg-white/5"
              >
                <Image
                  src="/assets/icon-bookmark.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="block h-[24px] w-[24px]"
                />
                <span>Ver Cursos Abertos</span>
              </Link>
            </div>
          </div>

          {/* Pagination dots */}
          <div className="absolute bottom-[24px] left-1/2 hidden -translate-x-1/2 items-center gap-2 lg:flex">
            <div className="h-[6px] w-[40px] rounded-full bg-white/40" />
            <div className="h-[6px] w-[8px] rounded-full bg-white/15" />
            <div className="h-[6px] w-[8px] rounded-full bg-white/15" />
          </div>
        </div>
      </div>
    </section>
  );
}
