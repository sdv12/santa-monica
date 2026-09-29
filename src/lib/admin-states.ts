import { addDays, diffDays, type ISO } from "./dates";
import type { Block, Booking } from "./data";
import type { DayState } from "@/components/calendar/Calendar";

/** Estado de cada noche para el calendario del panel. */
export function buildStates(bookings: Booking[], blocks: Block[]): Record<ISO, DayState> {
  const states: Record<ISO, DayState> = {};
  for (const b of blocks) for (let i = 0; i <= diffDays(b.start_date, b.end_date); i++) states[addDays(b.start_date, i)] = "blocked";
  for (const b of bookings) {
    if (b.status !== "pending" && b.status !== "confirmed") continue;
    for (let i = 0; i < diffDays(b.check_in, b.check_out); i++) states[addDays(b.check_in, i)] = b.status === "confirmed" ? "booked" : "pending";
  }
  return states;
}
