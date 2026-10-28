import type { MetadataRoute } from "next";
import { site } from "../../config/site";

/** Hace que el sitio se pueda "instalar" (Agregar a pantalla de inicio) en Android y iOS. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} · Casa de campo`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F4EEE3", // cream
    theme_color: "#33402F", // olive
    lang: "es-AR",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
