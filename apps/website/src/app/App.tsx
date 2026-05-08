import Hero from "./components/Hero";
import SectionSobre from "./components/SectionSobre";
import SectionQuote from "./components/SectionQuote";
import SectionEspecialidades from "./components/SectionEspecialidades";
import SectionSobreMim from "./components/SectionSobreMim";
import SectionCasosDeSucesso from "./components/SectionCasosDeSucesso";
import SectionBrain from "./components/SectionBrain";
import Footer from "./components/Footer";
import FloatingNav from "./components/FloatingNav";
import { useLenis } from "../hooks/useLenis";

export default function App() {
  useLenis();

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <div id="inicio">
        <Hero />
      </div>

      {/* Breathing room before SectionSobre — shorter on mobile (no pin) */}
      <div
        aria-hidden
        className="w-full h-[8vh] lg:h-[40vh]"
        style={{ backgroundColor: "var(--color-bg-deep)" }}
      />

      <SectionSobre />

      {/* Breathing room after SectionSobre — shorter on mobile */}
      <div
        aria-hidden
        className="w-full h-[6vh] lg:h-[30vh]"
        style={{ backgroundColor: "var(--color-bg-deep)" }}
      />

      <SectionQuote />

      <div id="especialidades">
        <SectionEspecialidades />
      </div>
      <div id="sobre-mim">
        <SectionSobreMim />
      </div>

      <div id="depoimentos">
        <SectionCasosDeSucesso />
      </div>

      <FloatingNav />

      <SectionBrain />
      <Footer />
    </div>
  );
}
