import type { SiteConfig } from "../../config/site";

/** Enlace de WhatsApp (o undefined si todavía no se cargó el número). */
export function whatsappLink(site: SiteConfig, message?: string) {
  if (!site.whatsappHref) return undefined;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${site.whatsappHref}${text}`;
}

/** Enlace para llamar (o undefined si todavía no se cargó el número). */
export function telLink(site: SiteConfig) {
  return site.phoneHref ? `tel:+${site.phoneHref}` : undefined;
}

/** WhatsApp de una persona que reservó: solo dígitos; un celular argentino de 10 dígitos lleva 549 adelante. */
export function guestWhatsappLink(phone: string, message?: string) {
  let d = phone.replace(/\D/g, "").replace(/^0+/, "");
  if (d.length === 10) d = `549${d}`;
  else if (d.length === 11 && d.startsWith("15")) d = `549${d.slice(2)}`;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${d}${text}`;
}
