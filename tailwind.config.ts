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
          DEFAULT: "#0a0807",
          800: "#15110d",
          700: "#1e1813",
        },
        gold: {
          DEFAULT: "#c5a572",
          soft: "#cbbfa8",
          dark: "#9c7f4f",
        },
        cream: "#f5f1ea",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.35em",
      },
      maxWidth: {
        prose: "65ch",
      },
    },
  },
  plugins: [],
};
export default config;
