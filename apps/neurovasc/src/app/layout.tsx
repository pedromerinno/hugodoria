import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import FloatingMenu from "@/components/FloatingMenu";
import Splash from "@/components/Splash";

const geist = Inter({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Neurosurgic — Instituto de Ensino em Neurocirurgia e Neurociências",
  description:
    "Um ecossistema vivo de aprendizado criado por Dr. Hugo Dória, dedicado à formação e evolução contínua de médicos e profissionais da área.",
  metadataBase: new URL("https://neurosurgic.example"),
  openGraph: {
    title: "Neurosurgic — Instituto de Neurocirurgia",
    description:
      "Ecossistema de aprendizado em neurocirurgia criado por Dr. Hugo Dória.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${roboto.variable}`}>
      <body className="font-sans antialiased bg-sand text-ink">
        <Splash />
        {children}
        <FloatingMenu />
      </body>
    </html>
  );
}
