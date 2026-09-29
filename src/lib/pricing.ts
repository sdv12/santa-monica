import { addDays, diffDays, fromISO, type ISO } from "./dates";
import type { Settings } from "./settings";

export type Quote = { nights: number; total: number | null; deposit: number | null };

/** Feriado → precio de feriado; viernes, sábado y domingo (noche) → fin de semana; el resto → semana. */
export function quote(start: ISO, end: ISO, s: Settings): Quote {
  const nights = diffDays(start, end);
  let total = 0;
  let known = true;
  for (let i = 0; i < nights; i++) {
    const night = addDays(start, i);
    const dow = fromISO(night).getDay();
    const weekend = dow === 5 || dow === 6 || dow === 0;
    const price = s.holidays.includes(night)
      ? (s.priceHoliday ?? s.priceWeekend ?? s.priceWeekday)
      : weekend
        ? (s.priceWeekend ?? s.priceWeekday)
        : s.priceWeekday;
    if (price == null) known = false;
    else total += price;
  }
  const t = known ? total : null;
  return { nights, total: t, deposit: t != null && s.depositPercent != null ? Math.round((t * s.depositPercent) / 100) : null };
}
