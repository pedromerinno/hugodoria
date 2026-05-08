import type { ReactNode, CSSProperties } from "react";
import { imageFrames, lineSpecs, texts } from "./data";
import imgMedicalRoom from "@/assets/e25bc4f66b4a426ccf342bc9c87ec2d3e73f4b1a.png";
import imgVideo from "@/assets/a375c45d2716fbbea43385fdee4485566a41cfa6.png";
import imgScrubsBlue from "@/assets/6c18cf7f306c9df025d6a7f74b408d318276b82c.png";
import imgScrubsGreen from "@/assets/1237b2795956579d89da3b7db4b78c58db67e687.png";

export function Box({
  x, y, w, h, children, className, style,
}: {
  x: number; y: number; w: number; h: number;
  children?: ReactNode; className?: string; style?: CSSProperties;
}) {
  return (
    <div
      className={`absolute ${className ?? ""}`}
      style={{ left: x, top: y, width: w, height: h, ...style }}
    >
      {children}
    </div>
  );
}

export function ImageFrame({
  x, y, w, h, src, alt, imgLeft, imgTop, imgWidth, imgHeight,
}: {
  x: number; y: number; w: number; h: number;
  src: string; alt: string;
  imgLeft: number; imgTop: number; imgWidth: number; imgHeight: number;
}) {
  return (
    <div
      className="absolute overflow-hidden"
      style={{
        left: x, top: y, width: w, height: h,
        backgroundColor: "rgba(255, 255, 255, 0.09)",
      }}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="absolute block max-w-none select-none object-cover"
        style={{ left: imgLeft, top: imgTop, width: imgWidth, height: imgHeight }}
      />
    </div>
  );
}

export function Line({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <div
      className="absolute"
      style={{
        left: x, top: y, width: w, height: 1,
        backgroundColor: "rgba(255, 255, 255, 0.24)",
      }}
    />
  );
}

export function Label({
  x, y, w, h, children,
}: {
  x: number; y: number; w: number; h: number; children: ReactNode;
}) {
  return (
    <Box x={x} y={y} w={w} h={h}>
      <span
        className="absolute inset-0 flex items-center whitespace-nowrap"
        style={{
          fontFamily: "'Arimo', sans-serif",
          fontWeight: 400,
          fontSize: 20,
          lineHeight: 0.73,
          letterSpacing: "-0.02em",
          color: "var(--color-accent-gold-light)",
        }}
      >
        {children}
      </span>
    </Box>
  );
}

export function Caption({
  x, y, w, h, children,
}: {
  x: number; y: number; w: number; h: number; children: ReactNode;
}) {
  return (
    <Box x={x} y={y} w={w} h={h}>
      <p
        style={{
          fontFamily: "'Arimo', sans-serif",
          fontWeight: 400,
          fontSize: 20,
          lineHeight: 1.32,
          color: "color-mix(in srgb, var(--color-bg-cream) 70%, transparent)",
          margin: 0,
        }}
      >
        {children}
      </p>
    </Box>
  );
}

export function SobreContent() {
  return (
    <>
      {/* Eyebrow top-left */}
      <Box x={84} y={124} w={160} h={18}>
        <span
          className="absolute inset-0 flex items-center whitespace-nowrap"
          style={{
            fontFamily: "'Geist', sans-serif",
            fontWeight: 400,
            fontSize: 14,
            lineHeight: 1.3,
            color: "var(--color-text-muted)",
          }}
        >
          MD PhD - Neurocirurgião
        </span>
      </Box>

      {/* Title */}
      <Box x={84} y={175} w={353} h={80}>
        <h2
          style={{
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 400,
            fontSize: 36,
            lineHeight: 1.18,
            letterSpacing: "-0.02em",
            color: "var(--color-bg-cream)",
            margin: 0,
          }}
        >
          Especialista em Neurocirurgia Vascular
        </h2>
      </Box>

      {imageFrames.map((frame, i) => (
        <ImageFrame key={i} {...frame} />
      ))}

      {lineSpecs.map((line, i) => (
        <Line key={i} {...line} />
      ))}

      {/* Col 1 bottom labels */}
      <Label x={72} y={1060} w={175} h={15}>Atuação Profissional</Label>
      <Caption x={387} y={1060} w={374} h={78}>{texts.hospitals}</Caption>

      {/* Col 2 mid Coord */}
      <Label x={1144} y={412} w={227} h={15}>Coordenação e Liderança:</Label>
      <Caption x={1144} y={456} w={352} h={78}>{texts.coordination}</Caption>

      {/* Col 3 mid Coord */}
      <Label x={2417} y={412} w={226} h={15}>Coordenação e Liderança:</Label>
      <Caption x={2417} y={456} w={352} h={78}>{texts.coordination}</Caption>

      {/* Col 2 bottom Atuação */}
      <Label x={1593} y={1072} w={175} h={15}>Atuação Profissional</Label>
      <Caption x={1593} y={1116} w={500} h={104}>{texts.publicationsA}</Caption>

      {/* Col 3 bottom Atuação */}
      <Label x={2866} y={1072} w={175} h={15}>Atuação Profissional</Label>
      <Caption x={2866} y={1116} w={500} h={104}>{texts.publicationsB}</Caption>
    </>
  );
}

function MobileLabel({ children }: { children: ReactNode }) {
  return (
    <span
      className="block uppercase tracking-[0.04em]"
      style={{
        fontFamily: "'Arimo', sans-serif",
        fontWeight: 400,
        fontSize: 14,
        lineHeight: 1.2,
        letterSpacing: "-0.01em",
        color: "var(--color-accent-gold-light)",
      }}
    >
      {children}
    </span>
  );
}

function MobileCaption({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "'Arimo', sans-serif",
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 1.4,
        color: "color-mix(in srgb, var(--color-bg-cream) 75%, transparent)",
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}

function MobileFrame({
  src,
  alt,
  ratio = "4 / 3",
}: {
  src: string;
  alt: string;
  ratio?: string;
}) {
  return (
    <div
      className="w-full overflow-hidden"
      style={{ aspectRatio: ratio, backgroundColor: "rgba(255, 255, 255, 0.06)" }}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="block h-full w-full select-none object-cover"
      />
    </div>
  );
}

export function SobreContentMobile() {
  return (
    <div className="flex flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-4">
        <span
          className="uppercase tracking-[0.06em]"
          style={{
            fontFamily: "'Geist', sans-serif",
            fontWeight: 400,
            fontSize: 12,
            lineHeight: 1.3,
            color: "var(--color-text-muted)",
          }}
        >
          MD PhD — Neurocirurgião
        </span>
        <h2
          style={{
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(28px, 8vw, 36px)",
            lineHeight: 1.18,
            letterSpacing: "-0.02em",
            color: "var(--color-bg-cream)",
            margin: 0,
          }}
        >
          Especialista em Neurocirurgia Vascular
        </h2>
      </header>

      <MobileFrame src={imgMedicalRoom} alt="Consultório" ratio="4 / 5" />

      <section className="flex flex-col gap-3">
        <MobileLabel>Atuação Profissional</MobileLabel>
        <MobileCaption>{texts.hospitals}</MobileCaption>
      </section>

      <MobileFrame src={imgVideo} alt="Palestra" ratio="16 / 11" />

      <section className="flex flex-col gap-3">
        <MobileLabel>Coordenação e Liderança</MobileLabel>
        <MobileCaption>{texts.coordination}</MobileCaption>
      </section>

      <MobileFrame
        src={imgScrubsBlue}
        alt="Dr. Hugo Doria em ambiente cirúrgico"
        ratio="4 / 5"
      />

      <section className="flex flex-col gap-3">
        <MobileLabel>Publicações & Pesquisa</MobileLabel>
        <MobileCaption>{texts.publicationsA}</MobileCaption>
      </section>

      <MobileFrame src={imgScrubsGreen} alt="Dr. Hugo Doria" ratio="4 / 5" />
    </div>
  );
}
