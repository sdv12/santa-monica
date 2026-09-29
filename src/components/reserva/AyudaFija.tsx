"use client";

import { MessageCircle, Phone } from "lucide-react";
import { useSite } from "@/lib/site-context";
import { telLink, whatsappLink } from "@/lib/contact";

/** Barra fija inferior: siempre hay una persona a un toque. */
export function AyudaFija() {
  const site = useSite();
  return (
    <aside aria-label="Ayuda por teléfono" className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper px-4 py-3 shadow-[0_-8px_24px_rgba(51,64,47,.08)]">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <p className="text-lg font-bold">
          ¿Te resulta más cómodo por teléfono? <span className="text-terra">Llamanos al {site.phone}</span>
        </p>
        <div className="flex gap-3">
          <a href={telLink(site) ?? "#"} className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-olive px-5 text-lg font-bold text-olive hover:bg-sage">
            <Phone size={22} strokeWidth={1.7} aria-hidden /> Llamar
          </a>
          <a href={whatsappLink(site) ?? "#"} className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-olive px-5 text-lg font-bold text-olive hover:bg-sage">
            <MessageCircle size={22} strokeWidth={1.7} aria-hidden /> WhatsApp
          </a>
        </div>
      </div>
    </aside>
  );
}
