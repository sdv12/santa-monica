"use client";

import { MessageCircle, Phone } from "lucide-react";
import { useSite } from "@/lib/site-context";
import { telLink, whatsappLink } from "@/lib/contact";
import { Button } from "./Button";

/** Alternativa humana: WhatsApp + teléfono. "#" mientras no se cargue el número real en config/site.ts. */
export function ContactActions({ size = "sm", light, message }: { size?: "sm" | "md" | "lg"; light?: boolean; message?: string }) {
  const site = useSite();
  const variant = light ? "light" : "outline";
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button href={whatsappLink(site, message) ?? "#"} variant={variant} size={size} icon={<MessageCircle size={24} strokeWidth={1.7} aria-hidden />}>
        WhatsApp
      </Button>
      <Button href={telLink(site) ?? "#"} variant={variant} size={size} icon={<Phone size={24} strokeWidth={1.7} aria-hidden />}>
        Llamar al {site.phone}
      </Button>
    </div>
  );
}
