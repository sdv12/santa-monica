"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { DEV_COOKIE, DEV_PASSWORD, devAuthEnabled, requireAdmin } from "@/lib/auth";
import { hasSupabase, getSettings } from "@/lib/data";
import { supabaseServer } from "@/lib/supabase-server";
import { createAdminBooking, createBlock, deleteBlock, saveSettings, setBookingStatus, setDepositReceived, type Result } from "@/lib/admin-data";
import { validateContact } from "@/lib/booking-rules";
import { isISO } from "@/lib/dates";
import { quote } from "@/lib/pricing";
import { FALLBACK_MAX_GUESTS, type Settings } from "@/lib/settings";

export type ActionResult = { ok: true; message: string } | { ok: false; error: string; field?: string };

/** Todo lo que cambia en el panel se ve también en la página pública. */
function done(res: Result, message: string): ActionResult {
  if (!res.ok) return res;
  revalidatePath("/", "layout");
  return { ok: true, message };
}

// ───────── Sesión ─────────
export async function login(email: string, password: string): Promise<{ ok: false; error: string }> {
  const wrong = { ok: false as const, error: "El email o la contraseña no son correctos. Revisalos y probá de nuevo." };
  if (hasSupabase) {
    const db = await supabaseServer();
    const { error } = (await db?.auth.signInWithPassword({ email: email.trim(), password })) ?? { error: true };
    if (error) return wrong;
  } else if (devAuthEnabled) {
    if (password !== DEV_PASSWORD) return wrong;
    (await cookies()).set(DEV_COOKIE, "1", { httpOnly: true, sameSite: "lax", path: "/" });
  } else {
    return { ok: false, error: "El panel todavía no está conectado: falta configurar Supabase." };
  }
  redirect("/admin");
}

export async function logout() {
  if (hasSupabase) await (await supabaseServer())?.auth.signOut();
  (await cookies()).delete(DEV_COOKIE);
  redirect("/admin/login");
}

// ───────── Reservas ─────────
export async function aceptar(id: string): Promise<ActionResult> {
  await requireAdmin();
  return done(await setBookingStatus(id, "confirmed"), "Aceptado ✓");
}

export async function rechazar(id: string): Promise<ActionResult> {
  await requireAdmin();
  return done(await setBookingStatus(id, "rejected"), "Pedido rechazado ✓");
}

export async function cancelar(id: string): Promise<ActionResult> {
  await requireAdmin();
  return done(await setBookingStatus(id, "cancelled"), "Reserva cancelada ✓");
}

export async function marcarSena(id: string, recibida: boolean): Promise<ActionResult> {
  await requireAdmin();
  return done(await setDepositReceived(id, recibida), recibida ? "Seña recibida ✓" : "Seña desmarcada ✓");
}

export type NuevaReservaInput = {
  llegada: string;
  salida: string;
  personas: number;
  nombre: string;
  telefono: string;
  comentarios: string;
  senaRecibida: boolean;
};

export async function crearReservaAdmin(input: NuevaReservaInput): Promise<ActionResult> {
  await requireAdmin();
  if (!isISO(input.llegada) || !isISO(input.salida)) return { ok: false, error: "Elegí las fechas de llegada y de salida en el calendario." };
  const errors = validateContact({ nombre: input.nombre, telefono: input.telefono, email: "" });
  const field = (Object.keys(errors) as Array<"nombre" | "telefono">)[0];
  if (field) return { ok: false, field, error: errors[field]! };

  const settings = await getSettings();
  const max = settings.maxGuests ?? FALLBACK_MAX_GUESTS;
  if (!Number.isInteger(input.personas) || input.personas < 1 || input.personas > max) return { ok: false, error: `La casa aloja hasta ${max} personas.` };

  return done(
    await createAdminBooking({
      guest_name: input.nombre.trim().slice(0, 120),
      guest_phone: input.telefono.trim().slice(0, 40),
      guest_email: null,
      guests: input.personas,
      check_in: input.llegada,
      check_out: input.salida,
      notes: input.comentarios.trim().slice(0, 1000) || null,
      total_estimate: quote(input.llegada, input.salida, settings).total,
      deposit_received: input.senaRecibida,
    }),
    "Reserva guardada ✓",
  );
}

// ───────── Bloqueos ─────────
export async function bloquear(desde: string, hasta: string, motivo: string): Promise<ActionResult> {
  await requireAdmin();
  if (!isISO(desde) || !isISO(hasta)) return { ok: false, error: "Elegí en el calendario el primer y el último día a bloquear." };
  return done(await createBlock(desde, hasta, motivo.trim().slice(0, 200) || null), "Fechas bloqueadas ✓");
}

export async function desbloquear(id: string): Promise<ActionResult> {
  await requireAdmin();
  return done(await deleteBlock(id), "Bloqueo borrado ✓");
}

// ───────── Precios y datos ─────────
export type AjustesInput = {
  priceWeekday: string;
  priceWeekend: string;
  priceHoliday: string;
  depositPercent: string;
  checkIn: string;
  checkOut: string;
  minNights: string;
  maxGuests: string;
  phone: string;
  whatsapp: string;
  description: string;
  holidays: string[];
};

export async function guardarAjustes(input: AjustesInput): Promise<ActionResult> {
  await requireAdmin();

  const num = (raw: string, field: string, label: string, min = 0, max = 100_000_000): { v: number | null } | ActionResult => {
    const t = raw.trim();
    if (!t) return { v: null };
    const n = Number(t.replace(/[.\s]/g, ""));
    if (!Number.isInteger(n) || n < min || n > max) return { ok: false, field, error: `${label}: escribí un número entero (sin comas ni letras).` };
    return { v: n };
  };
  const fields = {
    priceWeekday: num(input.priceWeekday, "priceWeekday", "Precio de lunes a jueves"),
    priceWeekend: num(input.priceWeekend, "priceWeekend", "Precio de viernes a domingo"),
    priceHoliday: num(input.priceHoliday, "priceHoliday", "Precio de feriados"),
    depositPercent: num(input.depositPercent, "depositPercent", "La seña", 0, 100),
    minNights: num(input.minNights, "minNights", "La estadía mínima", 1, 365),
    maxGuests: num(input.maxGuests, "maxGuests", "La capacidad", 1, 200),
  };
  for (const f of Object.values(fields)) if ("ok" in f) return f;
  const v = (k: keyof typeof fields) => (fields[k] as { v: number | null }).v;

  const time = /^([01]\d|2[0-3]):[0-5]\d$/;
  if (input.checkIn && !time.test(input.checkIn)) return { ok: false, field: "checkIn", error: "El horario de ingreso tiene que ser como 15:00." };
  if (input.checkOut && !time.test(input.checkOut)) return { ok: false, field: "checkOut", error: "El horario de salida tiene que ser como 10:00." };
  if (input.whatsapp.trim() && input.whatsapp.replace(/\D/g, "").length < 10) return { ok: false, field: "whatsapp", error: "Al WhatsApp le faltan números. Escribilo con código de país, ej.: 5493510000000." };

  const current = await getSettings();
  const settings: Settings = {
    ...current,
    priceWeekday: v("priceWeekday"),
    priceWeekend: v("priceWeekend"),
    priceHoliday: v("priceHoliday"),
    depositPercent: v("depositPercent"),
    minNights: v("minNights"),
    maxGuests: v("maxGuests"),
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    phone: input.phone.trim().slice(0, 40) || null,
    whatsapp: input.whatsapp.replace(/\D/g, "") || null,
    description: input.description.trim().slice(0, 1500) || null,
    holidays: [...new Set(input.holidays.filter(isISO))].sort(),
  };
  return done(await saveSettings(settings), "Guardado ✓");
}
