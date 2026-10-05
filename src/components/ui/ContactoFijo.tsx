"use client";

import { CalendarSearch, MessageCircle, Phone } from "lucide-react";
import { useSite } from "@/lib/site-context";
import { telLink, whatsappLink } from "@/lib/contact";

/**
 * Barra fija abajo en la landing: Reservar · Llamar · WhatsApp, siempre a un toque mientras se scrollea.
 * Textos cortos y botones grandes, pensados para celular.
 */
export function ContactoFijo() {
  const site = useSite();
  const wa = whatsappLink(site, `Hola ${site.hosts}, tengo una consulta sobre ${site.name}.`) ?? "#";
  const tel = telLink(site) ?? "#";
  const item =
    "flex min-h-14 flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-2 text-base font-bold text-olive hover:bg-sage sm:flex-row sm:gap-2 sm:text-lg";
  return (
    <nav aria-label="Contacto rápido" className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-3 pb-3 pt-2 shadow-[0_-8px_24px_rgba(51,64,47,.08)]">
      <ul className="mx-auto flex max-w-xl gap-2">
        <li className="flex flex-1">
          <a href="/reservar" className={`${item} bg-olive !text-white hover:bg-[#28331f]`}>
            <CalendarSearch size={24} strokeWidth={1.7} aria-hidden />
            Reservar
          </a>
        </li>
        <li className="flex flex-1">
          <a href={tel} className={item}>
            <Phone size={24} strokeWidth={1.7} aria-hidden />
            Llamanos
          </a>
        </li>
        <li className="flex flex-1">
          <a href={wa} target="_blank" rel="noopener noreferrer" className={item}>
            <MessageCircle size={24} strokeWidth={1.7} aria-hidden />
            WhatsApp
            <span className="sr-only"> (se abre en una pestaña nueva)</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
