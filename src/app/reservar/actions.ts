"use server";

import { createBooking, getOccupiedRanges, getSettings } from "@/lib/data";
import { notifyAdmin } from "@/lib/notify";
import { isISO, todayISO } from "@/lib/dates";
import { quote } from "@/lib/pricing";
import { validateContact, validateRange } from "@/lib/booking-rules";
import { FALLBACK_MAX_GUESTS } from "@/lib/settings";

export type ReservaInput = {
  llegada: string;
  salida: string;
  personas: number;
  nombre: string;
  telefono: string;
  email: string;
  comentarios: string;
};

export type ReservaResult =
  | { ok: true }
  | { ok: false; error: string; step: 1 | 2 | 3; field?: "nombre" | "telefono" | "email" };

const taken = "Justo esas fechas se ocuparon. Elegí otras y volvé a intentar, o llamanos y lo resolvemos.";

/** Valida todo de nuevo en el servidor: nunca se confía en lo que manda el navegador. */
export async function crearReserva(input: ReservaInput): Promise<ReservaResult> {
  if (!isISO(input.llegada) || !isISO(input.salida)) return { ok: false, step: 1, error: "Elegí las fechas de llegada y de salida." };

  const [occupied, settings] = await Promise.all([getOccupiedRanges(), getSettings()]);

  const rangeError = validateRange(input.llegada, input.salida, occupied, settings, todayISO());
  if (rangeError) return { ok: false, step: 1, error: rangeError };

  const max = settings.maxGuests ?? FALLBACK_MAX_GUESTS;
  if (!Number.isInteger(input.personas) || input.personas < 1 || input.personas > max) {
    return { ok: false, step: 1, error: `La casa aloja hasta ${max} personas.` };
  }

  const contactErrors = validateContact(input);
  const [field] = Object.keys(contactErrors) as Array<"nombre" | "telefono" | "email">;
  if (field) return { ok: false, step: 2, field, error: contactErrors[field]! };

  const booking = {
    guest_name: input.nombre.trim().slice(0, 120),
    guest_phone: input.telefono.trim().slice(0, 40),
    guest_email: input.email.trim().slice(0, 160) || null,
    guests: input.personas,
    check_in: input.llegada,
    check_out: input.salida,
    notes: input.comentarios.trim().slice(0, 1000) || null,
    total_estimate: quote(input.llegada, input.salida, settings).total,
  };

  const result = await createBooking(booking);
  if (!result.ok) {
    const messages = {
      taken,
      blocked: taken,
      min_nights: "La estadía es menor a la mínima. Elegí una salida más adelante.",
      capacity: `La casa aloja hasta ${max} personas.`,
      past: "Esa fecha ya pasó. Elegí una desde hoy en adelante.",
      unknown: "No pudimos enviar tu pedido. Probá de nuevo en un rato o llamanos por teléfono.",
    } as const;
    return { ok: false, step: result.reason === "unknown" ? 3 : 1, error: messages[result.reason] };
  }

  try {
    await notifyAdmin(booking);
  } catch (e) {
    console.error("[notifyAdmin]", e); // un aviso fallido no debe romper el pedido ya guardado
  }
  return { ok: true };
}
