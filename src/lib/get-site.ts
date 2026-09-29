import { cache } from "react";
import { site, type SiteConfig } from "../../config/site";
import { getSettings } from "./data";
import { formatMoney } from "./settings";

const digits = (s: string | null | undefined) => (s ?? "").replace(/\D/g, "");

/**
 * Lo que se muestra en la web: los valores de config/site.ts, pisados por lo que el admin cargó en
 * "Precios y datos" (tabla settings). Sirve para todo lo que el admin puede editar.
 */
export const getSite = cache(async (): Promise<SiteConfig> => {
  const s = await getSettings();
  const money = (n: number | null, fallback: string) => (n != null ? formatMoney(n) : fallback);
  const prices = [s.priceWeekday, s.priceWeekend, s.priceHoliday].filter((n): n is number => n != null);
  const wa = digits(s.whatsapp) || site.whatsappHref;
  return {
    ...site,
    phone: s.phone?.trim() || site.phone,
    phoneHref: wa || site.phoneHref,
    whatsappHref: wa,
    description: s.description?.trim() || site.description,
    pricePerNight: prices.length ? formatMoney(Math.min(...prices)) : site.pricePerNight,
    prices: {
      weekdays: money(s.priceWeekday, site.prices.weekdays),
      weekend: money(s.priceWeekend, site.prices.weekend),
      holidays: money(s.priceHoliday, site.prices.holidays),
    },
    depositPercent: s.depositPercent != null ? String(s.depositPercent) : site.depositPercent,
    minNights: s.minNights != null ? String(s.minNights) : site.minNights,
    maxGuests: s.maxGuests != null ? String(s.maxGuests) : site.maxGuests,
    checkIn: s.checkIn,
    checkOut: s.checkOut,
    holidays: s.holidays,
  };
});
