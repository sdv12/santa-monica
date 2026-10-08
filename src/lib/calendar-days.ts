import type { ISO } from "./dates";
import type { CalendarEvent } from "./data";
import type { Holiday } from "./holidays";

/** Feriado o evento, ya mezclados, para el calendario y la lista de la landing. */
export type CalendarDay = { date: ISO; name: string; kind: "feriado" | "evento"; text: string };

export function mergeCalendarDays(holidays: Holiday[], events: CalendarEvent[]): CalendarDay[] {
  const days: CalendarDay[] = [
    ...holidays.map((h) => ({ ...h, kind: "feriado" as const })),
    ...events.map((e) => ({ date: e.date, name: e.name, text: e.text, kind: "evento" as const })),
  ];
  return days.sort((a, b) => a.date.localeCompare(b.date));
}
