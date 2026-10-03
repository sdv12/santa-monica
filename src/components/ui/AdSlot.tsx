import Image from "next/image";
import type { Ad } from "../../../config/ads";

/**
 * Espacio de publicidad, como tarjeta editorial (logo + texto + link, no una tira genérica de banner).
 * Siempre lleva la etiqueta "Publicidad" visible: nunca se disfraza de contenido propio de la casa.
 * Abre en pestaña nueva, aclarado para quien usa lector de pantalla.
 */
export function AdSlot({ ad }: { ad: Ad }) {
  return (
    <a
      href={ad.href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group flex h-full flex-col gap-3 rounded-card border border-line bg-paper p-5 transition-colors hover:bg-white sm:gap-4 sm:p-7"
    >
      <span className="flex items-center gap-3">
        <span aria-hidden className="arc-sm flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden bg-white">
          <Image src={ad.logo} alt="" width={64} height={64} className="h-full w-full object-contain p-1.5" />
        </span>
        <span className="eyebrow">{ad.eyebrow}</span>
      </span>
      <span className="flex flex-col gap-2">
        <span className="font-display text-xl font-semibold text-ink sm:text-2xl">{ad.title}</span>
        <span className="text-lg text-muted">{ad.text}</span>
      </span>
      <span className="mt-auto font-bold text-olive underline underline-offset-4 group-hover:no-underline">
        {ad.cta}
        <span className="sr-only"> (se abre en una pestaña nueva)</span>
      </span>
    </a>
  );
}
