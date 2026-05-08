import { useNavigate } from "react-router";
import { CardArrow } from "./icons";
import { CARD_H, CARD_W, HEADER_W, CANVAS_H, type CardData } from "./data";

const IMAGE_H = 260;

export function Card({ x, y, card }: { x: number; y: number; card: CardData }) {
  const Icon = card.icon;
  const hasImage = !!card.image;
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate(`/especialidade/${card.slug}`);
  };

  return (
    <article
      className="absolute flex flex-col items-start overflow-hidden cursor-pointer"
      data-card
      role="button"
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleOpen(); } }}
      style={{
        left: x,
        top: y,
        width: CARD_W,
        height: CARD_H,
        backgroundColor: "rgba(255, 255, 255, 0.07)",
        transition:
          "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.45s ease",
        willChange: "transform",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-10px)";
        (e.currentTarget as HTMLElement).style.backgroundColor =
          "rgba(255, 255, 255, 0.1)";
        const img = e.currentTarget.querySelector<HTMLElement>("[data-card-img]");
        if (img) img.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.backgroundColor =
          "rgba(255, 255, 255, 0.07)";
        const img = e.currentTarget.querySelector<HTMLElement>("[data-card-img]");
        if (img) img.style.transform = "scale(1)";
      }}
    >
      {hasImage ? (
        <>
          <div
            className="relative w-full shrink-0 overflow-hidden"
            style={{ height: IMAGE_H }}
          >
            <img
              data-card-img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(26, 41, 63, 0.85) 0%, transparent 60%)",
              }}
            />
            <div
              className="absolute"
              style={{ left: 20, top: 20, width: 28, height: 28, opacity: 0.85 }}
            >
              <Icon />
            </div>
          </div>

          <div
            className="flex flex-1 flex-col justify-between"
            style={{ padding: "20px 32px 32px", width: "100%" }}
          >
            <div className="flex flex-col" style={{ gap: 8 }}>
              <p
                className="font-['Geist',sans-serif]"
                style={{ margin: 0, fontWeight: 400, fontSize: 20, lineHeight: 1.5, color: "var(--color-bg-cream)" }}
              >
                {card.title}
              </p>
              <p
                className="font-['Geist',sans-serif]"
                style={{ margin: 0, fontWeight: 400, fontSize: 16, lineHeight: 1.5, color: "color-mix(in srgb, var(--color-bg-cream) 70%, transparent)" }}
              >
                {card.description}
              </p>
            </div>

            <button
              type="button"
              className="flex items-center"
              style={{ gap: 8, padding: 0, marginTop: 24, background: "none", border: "none", cursor: "pointer" }}
            >
              <span
                className="font-['Geist',sans-serif]"
                style={{ fontWeight: 600, fontSize: 14, lineHeight: "18px", color: "var(--color-bg-cream)" }}
              >
                Saiba mais
              </span>
              <CardArrow />
            </button>
          </div>
        </>
      ) : (
        <>
          <div style={{ padding: "32px 32px 0", width: 48 + 64, height: 48 + 32 }}>
            <Icon />
          </div>

          <div
            className="flex flex-1 flex-col justify-between"
            style={{ padding: "0 32px 32px", width: "100%" }}
          >
            <div className="flex flex-col" style={{ width: 449, gap: 8 }}>
              <p
                className="font-['Geist',sans-serif]"
                style={{ margin: 0, fontWeight: 400, fontSize: 20, lineHeight: 1.5, color: "var(--color-bg-cream)" }}
              >
                {card.title}
              </p>
              <p
                className="font-['Geist',sans-serif]"
                style={{ margin: 0, fontWeight: 400, fontSize: 16, lineHeight: 1.5, color: "color-mix(in srgb, var(--color-bg-cream) 70%, transparent)" }}
              >
                {card.description}
              </p>
            </div>

            <button
              type="button"
              className="flex items-center"
              style={{ gap: 8, padding: 0, background: "none", border: "none", cursor: "pointer" }}
            >
              <span
                className="font-['Geist',sans-serif]"
                style={{ fontWeight: 600, fontSize: 14, lineHeight: "18px", color: "var(--color-bg-cream)" }}
              >
                Saiba mais
              </span>
              <CardArrow />
            </button>
          </div>
        </>
      )}
    </article>
  );
}

export function CardMobile({ card }: { card: CardData }) {
  const Icon = card.icon;
  const hasImage = !!card.image;
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate(`/especialidade/${card.slug}`);
  };

  return (
    <article
      className="group flex flex-col items-start overflow-hidden cursor-pointer w-full"
      data-card
      role="button"
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpen();
        }
      }}
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.07)",
        transition: "background-color 0.4s ease",
      }}
    >
      {hasImage && (
        <div
          className="relative w-full shrink-0 overflow-hidden"
          style={{ aspectRatio: "16 / 11" }}
        >
          <img
            src={card.image}
            alt={card.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(26, 41, 63, 0.7) 0%, transparent 50%)",
            }}
          />
          <div
            className="absolute"
            style={{ left: 16, top: 16, width: 24, height: 24, opacity: 0.9 }}
          >
            <Icon />
          </div>
        </div>
      )}

      <div
        className="flex flex-1 flex-col justify-between w-full"
        style={{ padding: "20px 24px 24px" }}
      >
        {!hasImage && (
          <div style={{ width: 40, height: 40, marginBottom: 16 }}>
            <Icon />
          </div>
        )}
        <div className="flex flex-col" style={{ gap: 8 }}>
          <p
            className="font-['Geist',sans-serif]"
            style={{
              margin: 0,
              fontWeight: 400,
              fontSize: 18,
              lineHeight: 1.4,
              color: "var(--color-bg-cream)",
            }}
          >
            {card.title}
          </p>
          <p
            className="font-['Geist',sans-serif]"
            style={{
              margin: 0,
              fontWeight: 400,
              fontSize: 14,
              lineHeight: 1.5,
              color: "color-mix(in srgb, var(--color-bg-cream) 65%, transparent)",
            }}
          >
            {card.description}
          </p>
        </div>

        <div
          className="flex items-center"
          style={{ gap: 8, marginTop: 20 }}
        >
          <span
            className="font-['Geist',sans-serif]"
            style={{
              fontWeight: 600,
              fontSize: 13,
              lineHeight: "18px",
              color: "var(--color-bg-cream)",
            }}
          >
            Saiba mais
          </span>
          <CardArrow />
        </div>
      </div>
    </article>
  );
}

export function HeaderMobile() {
  return (
    <header className="flex flex-col gap-5 px-6">
      <span
        className="font-['Geist',sans-serif]"
        style={{
          fontWeight: 400,
          fontSize: 12,
          lineHeight: 1.3,
          color: "var(--color-text-muted)",
        }}
      >
        Serviços de Neurocirurgia
      </span>
      <h2
        className="font-['Arimo',sans-serif]"
        style={{
          margin: 0,
          fontWeight: 400,
          fontSize: "clamp(28px, 8vw, 36px)",
          lineHeight: 1.18,
          letterSpacing: "-0.02em",
          color: "var(--color-bg-cream)",
        }}
      >
        Minhas Especialidades
      </h2>
      <p
        className="font-['Arimo',sans-serif]"
        style={{
          margin: 0,
          fontWeight: 400,
          fontSize: 16,
          lineHeight: 1.4,
          color: "color-mix(in srgb, var(--color-bg-cream) 70%, transparent)",
        }}
      >
        Dr. Hugo Doria oferece tratamentos avançados em neurocirurgia, incluindo
        aneurismas cerebrais, malformações arteriovenosas, tumores cerebrais e
        medulares, doença de Moyamoya, neuralgia do trigêmeo, espasmo hemifacial
        e revascularização cerebral.
      </p>
    </header>
  );
}

export function Header() {
  return (
    <div
      className="pointer-events-none absolute left-0 top-0 z-10"
      style={{ width: HEADER_W, height: CANVAS_H }}
    >
      <div
        className="absolute"
        style={{ left: 64, top: 32, width: 1766, height: 1, backgroundColor: "rgba(255, 255, 255, 0.24)" }}
      />
      <span
        className="absolute font-['Geist',sans-serif] flex items-center"
        style={{
          left: 72,
          top: 79,
          width: 165,
          height: 18,
          fontWeight: 400,
          fontSize: 14,
          lineHeight: 1.3,
          color: "var(--color-text-muted)",
        }}
      >
        Serviços de Neurocirurgia
      </span>
      <h2
        className="absolute font-['Arimo',sans-serif]"
        style={{
          left: 72,
          top: 130,
          width: 355,
          margin: 0,
          fontWeight: 400,
          fontSize: 36,
          lineHeight: 1.18,
          letterSpacing: "-0.02em",
          color: "var(--color-bg-cream)",
        }}
      >
        Minhas Especialidades
      </h2>
      <p
        className="absolute font-['Arimo',sans-serif]"
        style={{
          left: 1155,
          top: 97,
          width: 671,
          margin: 0,
          fontWeight: 400,
          fontSize: 20,
          lineHeight: 1.32,
          color: "color-mix(in srgb, var(--color-bg-cream) 70%, transparent)",
        }}
      >
        Dr. Hugo Doria oferece tratamentos avançados em neurocirurgia,
        incluindo aneurismas cerebrais, malformações arteriovenosas, tumores
        cerebrais e medulares, doença de Moyamoya, neuralgia do trigêmeo,
        espasmo hemifacial e revascularização cerebral.
      </p>
    </div>
  );
}
