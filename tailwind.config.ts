import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      "7xl": "4.75rem",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        lota: ["Lota-Grotesque", "sans-serif"],
        lotaBold: ["Lota-Grotesque-Bold", "sans-serif"],
        beeboMedium: ["Beebo-Medium", "sans-serif"],
        manropeRegular: ["Manrope-Regular", "sans-serif"],
        lotaLight: ["Lota-Grotesque-Light", "sans-serif"],
      },
      letterSpacing: {
        "-2.16": "-2.16px",
      },
    },
  },
  plugins: [],
};
export default config;
