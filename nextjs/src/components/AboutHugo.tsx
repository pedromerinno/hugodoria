import Image from "next/image";
import Link from "next/link";

export default function AboutHugo() {
  return (
    <section
      id="trajetoria"
      className="w-full bg-primary px-3 pb-4 pt-4 sm:px-4 lg:px-[15px] lg:pb-[20px] lg:pt-[16px]"
    >
      <div className="w-full">
        {/* Mobile / tablet stack */}
        <div className="flex flex-col gap-3 lg:hidden">
          <div
            className="rounded-[24px] px-6 py-12 sm:px-10 sm:py-16"
            style={{ backgroundColor: "#3344ff" }}
          >
            <p className="m-0 font-roboto text-[14px] leading-[18px] text-cream">
              Criado por
            </p>
            <h3 className="mt-3 font-display text-[36px] font-normal leading-[1.15] tracking-tightDisplay text-bone sm:text-[44px]">
              Dr. Hugo Dória
            </h3>
            <p className="mt-6 font-display text-[14px] leading-[22px] text-bone sm:text-[16px] sm:leading-[24px]">
              Neurocirurgião renomado e fundador do Centro Dória de Neurociência
              (CDN).
              <br />
              <br />
              Agora, à frente da Neurosurgic, dedica-se à missão de formar uma
              nova geração de excelência.
            </p>
            <Link
              href="#trajetoria-detalhes"
              className="mt-6 inline-flex h-[48px] items-center gap-[8px] rounded-full bg-ebony px-6 text-[14px] font-semibold text-primary transition-transform hover:scale-[1.02] active:scale-[0.99]"
            >
              <Image
                src="/assets/icon-chat-blue.svg"
                alt=""
                width={20}
                height={20}
              />
              <span>Conhecer trajetória</span>
            </Link>
          </div>

          {/* Mobile: 4:5 evita que a foto ocupe quase toda a tela em
              telas estreitas (o original ~1:1 forçava o usuário a rolar
              uma viewport inteira só pelo retrato). 691/720 só a partir
              de sm onde já há mais respiro horizontal. */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] sm:aspect-[691/720]">
            <Image
              src="/assets/img-dr-01.jpg"
              alt="Dr. Hugo Dória"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 mix-blend-hue"
              style={{ backgroundColor: "rgba(189,251,63,0.08)" }}
            />
          </div>
        </div>

        {/* Desktop fiel — full width */}
        <div className="hidden h-[920px] gap-2 lg:grid lg:grid-cols-2">
          <div
            className="flex h-full flex-col justify-center rounded-[24px] px-[40px] py-[80px] xl:px-[80px] 2xl:px-[120px]"
            style={{ backgroundColor: "#3344ff" }}
          >
            <p className="m-0 font-roboto text-[14px] font-normal leading-[18px] text-cream">
              Criado por
            </p>
            <h3 className="mt-[12px] font-display text-[48px] font-normal leading-[1.15] tracking-tightDisplay text-bone xl:text-[56px]">
              Dr. Hugo Dória
            </h3>
            <p className="mt-[24px] max-w-[440px] font-display text-[16px] font-normal leading-[1.5] text-bone xl:text-[17px]">
              Neurocirurgião renomado e fundador do Centro Dória de Neurociência
              (CDN).
              <br />
              <br />
              Agora, à frente da Neurosurgic, dedica-se à missão de formar uma
              nova geração de excelência.
            </p>
            <div>
              <Link
                href="#trajetoria-detalhes"
                className="mt-[40px] inline-flex h-[48px] items-center gap-[8px] rounded-full bg-ebony px-6 text-[14px] font-semibold text-primary transition-transform hover:scale-[1.02] active:scale-[0.99]"
              >
                <Image
                  src="/assets/icon-chat-blue.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="block h-[24px] w-[24px]"
                />
                <span>Conhecer trajetória</span>
              </Link>
            </div>
          </div>

          <div className="relative h-full w-full overflow-hidden rounded-[24px]">
            <Image
              src="/assets/img-dr-01.jpg"
              alt="Dr. Hugo Dória"
              fill
              sizes="50vw"
              className="object-cover"
              priority
            />
            <div
              aria-hidden
              className="absolute inset-0 mix-blend-hue"
              style={{ backgroundColor: "rgba(189,251,63,0.08)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
