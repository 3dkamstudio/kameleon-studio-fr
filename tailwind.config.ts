import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── shadcn/ui CSS variable tokens ───────────────────────────────
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        // ─── Kameleon brand palette ──────────────────────────────────
        surface: {
          DEFAULT: "#0a0a0f",
          1: "#0f0f17",
          2: "#16161f",
          3: "#1e1e2a",
        },
        brand: {
          rose: "#f43f5e",
          orange: "#f97316",
          yellow: "#eab308",
          green: "#22c55e",
          cyan: "#06b6d4",
          violet: "#8b5cf6",
          // Fuchsia : très présent dans les halos et la queue de Kame (DA KS 1, 3, 9)
          fuchsia: "#d946ef",
        },
      },
      // ─── Typography ──────────────────────────────────────────────────
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "var(--font-inter)", "sans-serif"],
      },
      // ─── Gradients ───────────────────────────────────────────────────
      backgroundImage: {
        // Arc-en-ciel complet — queue de Kame, accents (DA KS 1, 3, 4)
        rainbow:
          "linear-gradient(135deg, #f43f5e, #f97316, #eab308, #22c55e, #06b6d4, #8b5cf6)",
        "rainbow-r":
          "linear-gradient(135deg, #8b5cf6, #06b6d4, #22c55e, #eab308, #f97316, #f43f5e)",
        // Version avec fuchsia — plus fidèle aux halos DA KS
        "rainbow-full":
          "linear-gradient(135deg, #d946ef, #f43f5e, #f97316, #eab308, #22c55e, #06b6d4, #8b5cf6)",
        // Ring glow : cercle lumineux arc-en-ciel (DA KS 1, 4) — pour border-image
        "ring-rainbow":
          "conic-gradient(from 0deg, #f43f5e, #f97316, #eab308, #22c55e, #06b6d4, #8b5cf6, #d946ef, #f43f5e)",
        // Halos radiaux par couleur
        "glow-rose":
          "radial-gradient(ellipse at center, rgba(244,63,94,0.20) 0%, transparent 70%)",
        "glow-violet":
          "radial-gradient(ellipse at center, rgba(139,92,246,0.20) 0%, transparent 70%)",
        "glow-cyan":
          "radial-gradient(ellipse at center, rgba(6,182,212,0.20) 0%, transparent 70%)",
        "glow-fuchsia":
          "radial-gradient(ellipse at center, rgba(217,70,239,0.18) 0%, transparent 70%)",
        // Fond holographique — cards style DA KS 8, 10
        "holo-card":
          "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(6,182,212,0.08) 50%, rgba(217,70,239,0.08) 100%)",
        "noise-surface":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      // ─── Border radius (shadcn tokens) ───────────────────────────────
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // ─── CSS animations (Tailwind-only, Framer Motion handles the rest)
      animation: {
        "gradient-shift": "gradient-shift 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
