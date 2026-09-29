import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Ad } from "../../../config/ads";

/**
 * Espacio de publicidad. Siempre lleva la etiqueta "Publicidad" visible (nunca se disfraza de
 * contenido propio de la casa) y abre en pestaña nueva, aclarado para quien usa lector de pantalla.
 */
export function AdSlot({ ad, compact }: { ad: Ad; compact?: boolean }) {
  return (
    <a
      href={ad.href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={cn(
        "group flex items-center gap-5 rounded-card border border-line bg-paper transition-colors hover:bg-white",
        compact ? "p-5" : "p-6 sm:p-8",
      )}
    >
      <span aria-hidden className={cn("arc-sm flex shrink-0 items-center justify-center overflow-hidden bg-white", compact ? "h-16 w-16" : "h-20 w-20")}>
        <Image src={ad.logo} alt="" width={80} height={80} className="h-full w-full object-contain p-1.5" />
      </span>
      <span className="flex min-w-0 flex-col gap-1">
        <span className="eyebrow">{ad.eyebrow}</span>
        <span className={cn("font-display font-semibold text-ink", compact ? "text-xl" : "text-2xl sm:text-3xl")}>{ad.title}</span>
        {!compact && <span className="text-xl text-muted">{ad.text}</span>}
        <span className="mt-1 font-bold text-olive underline underline-offset-4 group-hover:no-underline">
          {ad.cta}
          <span className="sr-only"> (se abre en una pestaña nueva)</span>
        </span>
      </span>
    </a>
  );
}
