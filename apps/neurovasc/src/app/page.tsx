import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import AboutHugo from "@/components/AboutHugo";
import RecentContent from "@/components/RecentContent";
import Challenges from "@/components/Challenges";
import Inscricao from "@/components/Inscricao";
import Footer from "@/components/Footer";

// AboutNeurosurgic owns GSAP + ScrollTrigger + Mux Player. None of that
// belongs in the initial JS bundle: the section is below the fold and
// users only need it once they start scrolling. SSR stays on so the
// markup is crawlable; only the JS is split out.
const AboutNeurosurgic = dynamic(
  () => import("@/components/AboutNeurosurgic"),
  {
    loading: () => (
      <section className="w-full bg-sand" style={{ minHeight: "940px" }} />
    ),
  }
);

export default function Home() {
  return (
    <main id="topo" className="w-full">
      <Hero />
      <AboutNeurosurgic />
      <Pillars />
      <AboutHugo />
      <RecentContent />
      <Challenges />
      <Inscricao />
      <Footer />
    </main>
  );
}
