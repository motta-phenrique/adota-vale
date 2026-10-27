import type { Metadata, Viewport } from "next";
import { Outfit, Newsreader } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", display: "swap" });

export const metadata: Metadata = {
  title: "Adota Vale",
  description: "Rede de abrigos do Vale do Ivai. Encontre um cao que combina com voce.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Adota Vale", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#0F3D56",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={outfit.variable + " " + newsreader.variable}>
      <body className="min-h-dvh bg-sand-50 font-sans">{children}</body>
    </html>
  );
}
