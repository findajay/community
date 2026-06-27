import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Google-documentation-style palette: neutral greys + a single blue.
        ink: "#202124", // primary text (Google grey 900)
        muted: "#5f6368", // secondary text (grey 700)
        line: "#dadce0", // borders / dividers
        surface: "#f8f9fa", // subtle background
        paper: "#ffffff",
        brand: {
          DEFAULT: "#1a73e8", // Google blue
          hover: "#1765cc",
          soft: "#e8f0fe", // light-blue pill / active state
        },
        success: "#1e8e3e",
        warn: "#e37400",
      },
      fontFamily: {
        sans: [
          '"Google Sans"',
          "Roboto",
          "-apple-system",
          '"Segoe UI"',
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        // Material-style soft elevation.
        card: "0 1px 2px 0 rgba(60,64,67,0.1), 0 1px 3px 1px rgba(60,64,67,0.06)",
        bar: "0 1px 0 0 rgba(60,64,67,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
