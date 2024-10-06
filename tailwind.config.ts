import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
      },
      screens: {
        DEFAULT: "80rem",
      },
    },
    extend: {
      fontFamily: {
        secondary: "var(--font-secondary)",
        mono: "var(--font-geist-mono)",
      },
      colors: {
        primary: "hsl(var(--primary))",
        text: "hsl(var(--text))",
        background: "hsl(var(--background))",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
