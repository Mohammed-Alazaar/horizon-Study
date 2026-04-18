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
      colors: {
        navy: {
          DEFAULT: "#0D2B55",
          dark: "#071829",
        },
        blue: {
          DEFAULT: "#1A5FB4",
          light: "#3A82D8",
        },
        gold: {
          DEFAULT: "#F0A500",
          light: "#FBBF24",
        },
        "off-white": "#F7F8FC",
        "gray-horizon": {
          100: "#EEF0F5",
          300: "#C5CAD8",
          500: "#7A819A",
          700: "#3C4160",
        },
        text: "#0D1B2E",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
