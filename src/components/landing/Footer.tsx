import { MessageCircle, Phone } from "lucide-react";
import { getSite } from "@/lib/get-site";
import { telLink, whatsappLink } from "@/lib/contact";
import { Logo } from "@/components/ui";
import { navLinks } from "./nav";

export async function Footer() {
  const site = await getSite();
  return (
    <footer className="bg-olive px-5 py-16 text-white sm:px-10 lg:px-20">
      <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Logo light />
          <p className="max-w-sm text-lg text-sage">Casa de campo en {site.locality}.</p>
        </div>

        <nav aria-label="Pie de página" className="flex flex-col">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="py-2.5 text-xl underline-offset-4 hover:underline">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col">
          <a href={telLink(site) ?? "#"} className="inline-flex items-center gap-3 py-2.5 text-xl font-bold underline-offset-4 hover:underline">
            <Phone size={24} strokeWidth={1.7} aria-hidden />
            {site.phone}
          </a>
          <a href={whatsappLink(site) ?? "#"} className="inline-flex items-center gap-3 py-2.5 text-xl font-bold underline-offset-4 hover:underline">
            <MessageCircle size={24} strokeWidth={1.7} aria-hidden />
            Escribinos por WhatsApp
          </a>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1200px] flex-wrap items-center justify-between gap-3 border-t border-white/20 pt-6 text-base text-sage">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <a href="/admin" className="py-2 underline underline-offset-4">
          Acceso administrador
        </a>
      </div>
    </footer>
  );
}
