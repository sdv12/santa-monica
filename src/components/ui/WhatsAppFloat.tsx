"use client";

import { MessageCircle } from "lucide-react";
import { useSite } from "@/lib/site-context";
import { whatsappLink } from "@/lib/contact";

/** Botón fijo, siempre visible: la alternativa humana a un toque desde cualquier punto de la página. */
export function WhatsAppFloat() {
  const site = useSite();
  const href = whatsappLink(site, `Hola ${site.hosts}, tengo una consulta sobre ${site.name}.`);
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      // bottom-24: deja lugar para el sello "Powered by Netlify" que Netlify agrega solo en este
      // dominio *.netlify.app de prueba; con un dominio propio ese sello no aparece.
      className="fixed bottom-24 right-5 z-50 flex min-h-16 items-center gap-3 rounded-full bg-terra px-6 text-lg font-bold text-white shadow-soft hover:bg-[#833519] sm:right-8"
    >
      <MessageCircle size={28} strokeWidth={1.7} aria-hidden />
      WhatsApp
      <span className="sr-only"> (se abre en una pestaña nueva)</span>
    </a>
  );
}
