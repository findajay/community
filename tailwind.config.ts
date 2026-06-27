import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm, focused palette — calm enough for long study sessions.
        ink: "#1c1b1a",
        paper: "#faf7f2",
        brand: {
          DEFAULT: "#b5451f", // terracotta accent
          soft: "#e9d9cf",
        },
        success: "#2f7d4f",
        warn: "#c08a2d",
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
