import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ink: {
          DEFAULT: "#0b0a09",
          800: "#141210",
          700: "#1d1a17",
        },
        // "gold" kept as the accent token name; value is the Noir ember so all
        // existing accent classes (text-gold/bg-gold/border-gold) re-skin at once.
        gold: {
          DEFAULT: "#e2662e",
          soft: "#f08952",
          dark: "#b84a1c",
        },
        ember: {
          DEFAULT: "#e2662e",
          soft: "#f08952",
          dark: "#b84a1c",
        },
        cream: "#f3efe6",
      },
      fontFamily: {
        display: ["var(--font-anton)", "Impact", "Haettenschweiler", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.3em",
      },
      maxWidth: {
        prose: "62ch",
      },
    },
  },
  plugins: [],
};
export default config;
