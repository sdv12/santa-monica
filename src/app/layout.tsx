import type { Metadata, Viewport } from "next";
import { Fraunces, Atkinson_Hyperlegible } from "next/font/google";
import { site } from "../../config/site";
import { getSite } from "@/lib/get-site";
import { SiteProvider } from "@/lib/site-context";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: `${site.name} · Casa de campo en ${site.locality}`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { locale: "es_AR", type: "website", siteName: site.name },
};

export const viewport: Viewport = { themeColor: "#F4EEE3" };

// Lo que carga el admin (precios, teléfono...) tiene que verse enseguida: nada de páginas guardadas.
export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const siteData = await getSite();
  return (
    <html lang="es-AR" className={`${fraunces.variable} ${atkinson.variable}`}>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-olive focus:px-6 focus:py-4 focus:font-bold focus:text-white"
        >
          Saltar al contenido
        </a>
        <SiteProvider value={siteData}>{children}</SiteProvider>
      </body>
    </html>
  );
}
