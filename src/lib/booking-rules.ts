import { addDays, diffDays, type ISO } from "./dates";
import type { OccupiedRange } from "./availability";
import type { Settings } from "./settings";

/** Reglas compartidas: las usa la pantalla (para explicar) y la Server Action (para validar de verdad). */

export function busyNights(occupied: OccupiedRange[]): Set<ISO> {
  const set = new Set<ISO>();
  for (const r of occupied) for (let i = 0; i < diffDays(r.start, r.end); i++) set.add(addDays(r.start, i));
  return set;
}

export const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export function validateRange(start: ISO, end: ISO, occupied: OccupiedRange[], s: Settings, today: ISO): string | null {
  if (start < today) return "Ese día de llegada ya pasó. Elegí una fecha desde hoy en adelante.";
  if (end <= start) return "La salida tiene que ser un día después de la llegada.";
  const nights = diffDays(start, end);
  const min = s.minNights ?? 1;
  if (nights < min) return `La estadía mínima es de ${plural(min, "noche", "noches")}. Elegí una salida más adelante.`;
  const busy = busyNights(occupied);
  for (let i = 0; i < nights; i++) {
    if (busy.has(addDays(start, i))) return "Entre esas fechas hay días ocupados. Elegí otras fechas o llamanos y buscamos una solución.";
  }
  return null;
}

export type ContactInput = { nombre: string; telefono: string; email: string };
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export function validateContact({ nombre, telefono, email }: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  if (nombre.trim().length < 2) errors.nombre = "Falta tu nombre y apellido para poder anotar la reserva";
  const digits = telefono.replace(/\D/g, "");
  if (!telefono.trim()) errors.telefono = "Falta tu teléfono para poder confirmarte";
  else if (digits.length < 8) errors.telefono = "Revisá el teléfono: parece que faltan números";
  if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) errors.email = "Revisá el email: parece que está incompleto";
  return errors;
}
