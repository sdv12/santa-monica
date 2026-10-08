import { diffDays } from "./dates";
import type { Booking } from "./data";

export type Stats = {
  /** Pedidos que cayeron en el período (pendientes + confirmados; no cuenta rechazados ni cancelados). */
  count: number;
  nights: number;
  /** Suma de total_estimate de las confirmadas. null si falta algún precio (no se puede sumar). */
  revenue: number | null;
  confirmed: number;
  pending: number;
  depositReceived: number;
  depositPending: number;
  bySource: { web: number; admin: number };
};

const EMPTY: Stats = { count: 0, nights: 0, revenue: 0, confirmed: 0, pending: 0, depositReceived: 0, depositPending: 0, bySource: { web: 0, admin: 0 } };

/** Calcula las estadísticas de las reservas cuya llegada cae en el mes (0-11) y año dados. */
export function statsForMonth(bookings: Booking[], year: number, month: number): Stats {
  return statsFor(bookings, (b) => {
    const d = new Date(b.check_in);
    return d.getFullYear() === year && d.getMonth() === month;
  });
}

/** Calcula las estadísticas de las reservas cuya llegada cae en el año dado. */
export function statsForYear(bookings: Booking[], year: number): Stats {
  return statsFor(bookings, (b) => new Date(b.check_in).getFullYear() === year);
}

function statsFor(bookings: Booking[], match: (b: Booking) => boolean): Stats {
  const relevant = bookings.filter((b) => (b.status === "pending" || b.status === "confirmed") && match(b));
  if (relevant.length === 0) return EMPTY;

  let revenue = 0;
  let revenueKnown = true;
  const stats: Stats = { ...EMPTY, bySource: { web: 0, admin: 0 } };
  for (const b of relevant) {
    stats.count++;
    stats.nights += diffDays(b.check_in, b.check_out);
    if (b.status === "confirmed") {
      stats.confirmed++;
      if (b.total_estimate == null) revenueKnown = false;
      else revenue += b.total_estimate;
    } else {
      stats.pending++;
    }
    if (b.deposit_received) stats.depositReceived++;
    else stats.depositPending++;
    stats.bySource[b.source]++;
  }
  stats.revenue = revenueKnown ? revenue : null;
  return stats;
}
