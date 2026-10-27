import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Adota Vale",
    short_name: "Adota Vale",
    description: "Rede de abrigos do Vale do Ivai",
    start_url: "/sugestoes",
    display: "standalone",
    background_color: "#FAF6F0",
    theme_color: "#0F3D56",
    lang: "pt-BR",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
