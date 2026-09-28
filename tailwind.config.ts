import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  // Les composants posent leurs propres marges et styles de base (repris de la maquette Claude Design).
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        ink: "#151827",
        muted: "#525B70",
        pearl: "#F7F8FC",
        violet: { DEFAULT: "#6546D7", strong: "#7C3AED" },
        fuchsia: { DEFAULT: "#C026D3" },
        cyan: { DEFAULT: "#20BFD1" },
        coral: { DEFAULT: "#FF776B" },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
