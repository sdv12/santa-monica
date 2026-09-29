/** Fechas como texto "YYYY-MM-DD" (sin hora): se comparan como texto y no dependen de la zona horaria. */
export type ISO = string;

const TZ = "America/Argentina/Cordoba";

export const MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
/** La semana empieza en lunes. */
export const WEEKDAYS = [
  { short: "lun", long: "lunes" },
  { short: "mar", long: "martes" },
  { short: "mié", long: "miércoles" },
  { short: "jue", long: "jueves" },
  { short: "vie", long: "viernes" },
  { short: "sáb", long: "sábado" },
  { short: "dom", long: "domingo" },
];

const pad = (n: number) => String(n).padStart(2, "0");

export function toISO(d: Date): ISO {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function fromISO(s: ISO): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function todayISO(): ISO {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date());
}

export function addDays(s: ISO, n: number): ISO {
  const d = fromISO(s);
  d.setDate(d.getDate() + n);
  return toISO(d);
}

export function diffDays(a: ISO, b: ISO): number {
  return Math.round((fromISO(b).getTime() - fromISO(a).getTime()) / 86_400_000);
}

export function isISO(s: unknown): s is ISO {
  return typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
}

/** Celdas de un mes: huecos (null) hasta el primer día (lunes primero) y luego cada día. */
export function monthCells(year: number, month: number): (ISO | null)[] {
  const first = new Date(year, month, 1);
  const lead = (first.getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  return [...Array<null>(lead).fill(null), ...Array.from({ length: days }, (_, i) => toISO(new Date(year, month, i + 1)))];
}

export function formatLong(s: ISO): string {
  return new Intl.DateTimeFormat("es-AR", { weekday: "long", day: "numeric", month: "long" }).format(fromISO(s));
}

export function formatShort(s: ISO): string {
  return new Intl.DateTimeFormat("es-AR", { weekday: "short", day: "numeric", month: "short" }).format(fromISO(s)).replace(".", "");
}
