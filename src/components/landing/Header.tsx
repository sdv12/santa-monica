"use client";

import { useState } from "react";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { telLink, whatsappLink } from "@/lib/contact";
import { useSite } from "@/lib/site-context";
import { Button, Logo } from "@/components/ui";
import { navLinks } from "./nav";

export function Header() {
  const site = useSite();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40">
      {/* Alternativa humana siempre a la vista */}
      <div className="bg-paper px-5 py-2 text-base sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-6 gap-y-1">
          <p className="hidden text-muted sm:block">¿Preferís hablar con una persona?</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 font-bold text-olive">
            <a href={telLink(site) ?? "#"} className="inline-flex items-center gap-2 py-2 underline underline-offset-4">
              <Phone size={20} strokeWidth={1.7} aria-hidden />
              Llamanos al {site.phone}
            </a>
            <a href={whatsappLink(site) ?? "#"} className="inline-flex items-center gap-2 py-2 underline underline-offset-4">
              <MessageCircle size={20} strokeWidth={1.7} aria-hidden />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="bg-cream/95 px-5 py-3 sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">
          <Logo />
          <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="py-3 text-xl font-bold text-ink underline-offset-8 hover:underline">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button href="/reservar" className="!min-h-[56px] !px-7">
              Reservar
            </Button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-olive text-olive lg:hidden"
            >
              {open ? <X size={28} strokeWidth={1.7} aria-hidden /> : <Menu size={28} strokeWidth={1.7} aria-hidden />}
            </button>
          </div>
        </div>
        {open && (
          <nav id="menu-movil" aria-label="Principal" className="mx-auto mt-3 flex max-w-[1200px] flex-col gap-1 border-t border-line pt-3 lg:hidden">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-2xl px-3 py-4 text-2xl font-bold hover:bg-sage">
                {l.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
