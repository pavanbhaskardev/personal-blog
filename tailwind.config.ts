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
        DEFAULT: "64rem",
      },
    },
    extend: {
      fontFamily: {
        secondary: "var(--font-secondary)",
      },
      colors: {
        primary: "#455CE9",
        background: "#EEEEEE",
        text: "#181818",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
