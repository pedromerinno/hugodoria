import imgMedicalRoom from "@/assets/e25bc4f66b4a426ccf342bc9c87ec2d3e73f4b1a.png";
import imgVideo from "@/assets/a375c45d2716fbbea43385fdee4485566a41cfa6.png";
import imgConference from "@/assets/b07dcf44e39fe46f52ddf687bc20067c3cbe5ad0.png";
import imgScrubsBlue from "@/assets/6c18cf7f306c9df025d6a7f74b408d318276b82c.png";
import imgScrubsGreen from "@/assets/1237b2795956579d89da3b7db4b78c58db67e687.png";

export const CANVAS_W = 3566;
export const CANVAS_H = 1299;

export const texts = {
  hospitals:
    "Neurocirurgião em hospitais renomados como BP, Santa Catarina, Albert Einstein e Sírio Libanês.",
  publicationsA:
    "Extensa lista de publicações em revistas renomadas internacionais e nacionais, revisor de periódicos importantes e formador de opnião pela vasta experiência de 20 anos na área neurocirurgica.",
  publicationsB:
    "Extensa lista de publicações em revistas renomadas internacionais e nacionais, revisor de periódicos importantes e formador vasta experiência de 20 anos na área neurocirurgica.",
  coordination:
    "Coordenador do Departamento de Neurocirurgia Vascular da Sociedade Brasileira de Neurocirurgia.",
};

export type ImageFrameSpec = {
  x: number;
  y: number;
  w: number;
  h: number;
  src: string;
  alt: string;
  imgLeft: number;
  imgTop: number;
  imgWidth: number;
  imgHeight: number;
};

export const imageFrames: ImageFrameSpec[] = [
  // Col 1 — big medical room
  {
    x: 72, y: 378, w: 689, h: 621,
    src: imgMedicalRoom, alt: "Consultório",
    imgLeft: (689 - 822) / 2 - 47.5, imgTop: -224, imgWidth: 822, imgHeight: 1031,
  },
  // Col 2 top lecture
  {
    x: 1144, y: 107, w: 352, h: 252,
    src: imgVideo, alt: "Palestra",
    imgLeft: (352 - 409) / 2 + 0.5, imgTop: (252 - 294) / 2, imgWidth: 409, imgHeight: 294,
  },
  // Col 3 top lecture (repeat)
  {
    x: 2417, y: 107, w: 352, h: 252,
    src: imgVideo, alt: "Palestra",
    imgLeft: (352 - 409) / 2 + 0.5, imgTop: (252 - 294) / 2, imgWidth: 409, imgHeight: 294,
  },
  // Col 2 mid conference square
  {
    x: 1744, y: 269, w: 239, h: 218,
    src: imgConference, alt: "Congresso",
    imgLeft: -42, imgTop: 109 - 181 - 27, imgWidth: 239 + 42 + 78, imgHeight: 362,
  },
  // Col 3 mid conference square (repeat)
  {
    x: 3017, y: 269, w: 239, h: 218,
    src: imgConference, alt: "Congresso",
    imgLeft: -42, imgTop: 109 - 181 - 27, imgWidth: 239 + 42 + 78, imgHeight: 362,
  },
  // Col 2 bottom scrubs blue
  {
    x: 917, y: 716, w: 500, h: 422,
    src: imgScrubsBlue, alt: "Dr. Hugo Doria em ambiente cirúrgico",
    imgLeft: -284, imgTop: 0, imgWidth: 1068, imgHeight: 611,
  },
  // Col 3 bottom scrubs blue (repeat)
  {
    x: 2233, y: 670, w: 401, h: 468,
    src: imgScrubsBlue, alt: "Dr. Hugo Doria em ambiente cirúrgico",
    imgLeft: -227.77, imgTop: 0, imgWidth: 856.54, imgHeight: 489.54,
  },
  // Image 10 frame A
  {
    x: 1593, y: 693, w: 375, h: 306,
    src: imgScrubsGreen, alt: "Dr. Hugo Doria",
    imgLeft: (375 - 404) / 2 - 14.5, imgTop: -23, imgWidth: 404, imgHeight: 488,
  },
  // Image 10 frame B
  {
    x: 2866, y: 693, w: 375, h: 306,
    src: imgScrubsGreen, alt: "Dr. Hugo Doria",
    imgLeft: (375 - 404) / 2 - 14.5, imgTop: -23, imgWidth: 404, imgHeight: 488,
  },
];

export const lineSpecs: Array<{ x: number; y: number; w: number }> = [
  { x: 72, y: 1031, w: 689 },
  { x: 1593, y: 1043, w: 500 },
  { x: 2866, y: 1043, w: 500 },
  { x: 1144, y: 383, w: 352 },
  { x: 2417, y: 383, w: 352 },
];
