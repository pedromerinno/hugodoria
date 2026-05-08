import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0c22",
        sand: "#eeebe4",
        bone: "#f3eee7",
        cream: "#fff0d9",
        primary: "#0015ff",
        primarySoft: "#0014ff",
        primaryDeep: "#071181",
        sky: "#86b4ff",
        skyLight: "#8dbeff",
        bullet: "#bbc1ff",
        chip: "#d3deef",
        muted: "#b7bdc4",
        ebony: "#ebe7e5",
      },
      fontFamily: {
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
        display: ["var(--font-geist)", "system-ui", "sans-serif"],
        roboto: ["var(--font-roboto)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightDisplay: "-0.02em",
        tighterDisplay: "-0.04em",
      },
      borderRadius: {
        pill: "1000px",
      },
      boxShadow: {
        programCard:
          "-11.937px 24.775px 91.085px rgba(0,0,0,0.06), -0.918px 11.937px 13.314px rgba(0,0,0,0.04)",
      },
      backgroundImage: {
        "legado-grad":
          "linear-gradient(90deg, #0015ff 0%, #818bff 100%)",
        "title-fade":
          "linear-gradient(90deg, #ffffff 0%, #ffffff 67.668%, #999999 100%)",
        "pillars-glow":
          "radial-gradient(60% 60% at 30% 35%, rgba(0,21,255,0.55) 0%, rgba(11,12,34,0) 70%), radial-gradient(50% 50% at 80% 60%, rgba(60,80,255,0.35) 0%, rgba(11,12,34,0) 70%), radial-gradient(40% 40% at 50% 90%, rgba(0,21,255,0.30) 0%, rgba(11,12,34,0) 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
