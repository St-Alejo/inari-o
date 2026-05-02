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
        red: "#E3000B",
        carbon: "#1C1C1E",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
