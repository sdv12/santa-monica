/**
 * Feriados y eventos que se marcan en el calendario, con un aviso para reservar.
 *
 * Feriados: los nacionales de Argentina para 2026 (verificá cada año — los que caen en fin de
 * semana se mueven por decreto). Los puentes turísticos no están cargados: sumalos cuando salgan.
 *
 * ⚠️ MOCK: los eventos de abajo tienen fechas de ejemplo. Confirmá la fecha real de cada fiesta
 * antes de publicar.
 */
import type { ISO } from "@/lib/dates";

export type CalendarDay = {
  date: ISO;
  name: string;
  kind: "feriado" | "evento";
  /** Texto corto para el aviso que aparece al tocar el día. */
  text: string;
};

export const holidays2026: CalendarDay[] = [
  { date: "2026-01-01", name: "Año Nuevo", kind: "feriado", text: "Arranque de año con una escapada tranquila." },
  { date: "2026-02-16", name: "Carnaval", kind: "feriado", text: "Fin de semana largo de Carnaval en la sierra." },
  { date: "2026-02-17", name: "Carnaval", kind: "feriado", text: "Fin de semana largo de Carnaval en la sierra." },
  { date: "2026-03-24", name: "Día de la Memoria", kind: "feriado", text: "Fin de semana largo para desconectar." },
  { date: "2026-04-02", name: "Día del Veterano y de los Caídos en Malvinas", kind: "feriado", text: "Fin de semana largo de Semana Santa." },
  { date: "2026-04-03", name: "Viernes Santo", kind: "feriado", text: "Fin de semana largo de Semana Santa." },
  { date: "2026-05-01", name: "Día del Trabajador", kind: "feriado", text: "Fin de semana largo de mayo." },
  { date: "2026-05-25", name: "Revolución de Mayo", kind: "feriado", text: "Fin de semana largo de mayo." },
  { date: "2026-06-15", name: "Paso a la Inmortalidad del General Güemes", kind: "feriado", text: "Fin de semana largo de junio." },
  { date: "2026-06-20", name: "Día de la Bandera", kind: "feriado", text: "Escapada corta de junio." },
  { date: "2026-07-09", name: "Día de la Independencia", kind: "feriado", text: "Fin de semana largo de julio." },
  { date: "2026-08-17", name: "Paso a la Inmortalidad del General San Martín", kind: "feriado", text: "Fin de semana largo de agosto." },
  { date: "2026-10-12", name: "Día del Respeto a la Diversidad Cultural", kind: "feriado", text: "Fin de semana largo de octubre." },
  { date: "2026-11-23", name: "Día de la Soberanía Nacional", kind: "feriado", text: "Fin de semana largo de noviembre." },
  { date: "2026-12-08", name: "Inmaculada Concepción", kind: "feriado", text: "Fin de semana largo de diciembre." },
  { date: "2026-12-25", name: "Navidad", kind: "feriado", text: "Navidad en la sierra." },
];

export const events: CalendarDay[] = [
  {
    date: "2026-10-10", // MOCK: fecha de ejemplo
    name: "Oktoberfest en Villa General Belgrano",
    kind: "evento",
    text: "La fiesta más conocida de la zona. Ideal para quedarse el fin de semana (MOCK: fecha a confirmar).",
  },
];

/** Todo lo que se marca en el calendario: feriados y eventos, ordenados por fecha. */
export const calendarDays: CalendarDay[] = [...holidays2026, ...events].sort((a, b) => a.date.localeCompare(b.date));
