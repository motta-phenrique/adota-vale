import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        ink: "#10242F",
        petrol: { DEFAULT: "#0F3D56", 600: "#2D6383", 200: "#A9C1CD" },
        coral: { DEFAULT: "#F0603C", 700: "#C24A28", 50: "#FDF1EC", 200: "#F6CDBE" },
        sand: { 50: "#FAF6F0", 100: "#EDE4D6", 200: "#E3DAD0", 300: "#D6CBBB", 400: "#C6B9A7", 500: "#A2937F", 600: "#8A7A66" },
        slate: { 450: "#6B7C86", 350: "#8A9AA3", 250: "#9AA8B0" },
        moss: { DEFAULT: "#5BB98C", 50: "#F1F6F3", 700: "#2C6A4C" },
        photo: { 1: "#DCD3C7", 2: "#D6CFC4", 3: "#E0D8CB", 4: "#D2CABE" },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        serif: ["var(--font-newsreader)", "Georgia", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
