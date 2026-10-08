import { addDays, fromISO } from "./dates";
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

const isWeekend = (iso: ISO) => [0, 6].includes(fromISO(iso).getDay());

/**
 * Días que forman parte de un fin de semana largo (3 días o más): el feriado (y el puente, si lo
 * hay) más los sábados/domingos pegados. Un feriado que cae un sábado solo, por ejemplo, no cuenta
 * como "largo". Los eventos locales no estiran el fin de semana, solo los feriados.
 */
export function longWeekendDays(days: CalendarDay[]): Set<ISO> {
  const holidaySet = new Set(days.filter((d) => d.kind === "feriado").map((d) => d.date));
  const result = new Set<ISO>();
  for (const anchor of holidaySet) {
    const run: ISO[] = [anchor];
    let cur = anchor;
    while (true) {
      const prev = addDays(cur, -1);
      if (!holidaySet.has(prev) && !isWeekend(prev)) break;
      run.unshift(prev);
      cur = prev;
    }
    cur = anchor;
    while (true) {
      const next = addDays(cur, 1);
      if (!holidaySet.has(next) && !isWeekend(next)) break;
      run.push(next);
      cur = next;
    }
    if (run.length >= 3) for (const d of run) result.add(d);
  }
  return result;
}
