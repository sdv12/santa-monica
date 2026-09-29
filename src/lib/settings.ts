import type { ISO } from "./dates";

export type Settings = {
  priceWeekday: number | null;
  priceWeekend: number | null;
  priceHoliday: number | null;
  holidays: ISO[];
  depositPercent: number | null;
  minNights: number | null;
  maxGuests: number | null;
  checkIn: string;
  checkOut: string;
  phone: string | null;
  whatsapp: string | null;
  description: string | null;
};

/** Tope de personas en pantalla cuando todavía no se cargó la capacidad real. */
export const FALLBACK_MAX_GUESTS = 20;

export function formatMoney(n: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n).replace(/\s/g, " ");
}
