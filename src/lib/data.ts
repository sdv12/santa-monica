import { promises as fs } from "node:fs";
import path from "node:path";
import { site } from "../../config/site";
import type { ISO } from "./dates";
import type { OccupiedRange } from "./availability";
import type { Settings } from "./settings";

/**
 * Capa de datos del servidor. Con NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY usa Supabase
 * (aquí con el rol anónimo: solo puede leer fechas/ajustes e insertar pedidos pendientes, por RLS).
 * Sin esas variables usa un archivo local .data/dev.json, solo para probar en desarrollo.
 * Las operaciones del administrador están en admin-data.ts.
 */

export type BookingStatus = "pending" | "confirmed" | "rejected" | "cancelled";

export type Booking = {
  id: string;
  guest_name: string;
  guest_phone: string;
  guest_email: string | null;
  guests: number;
  check_in: ISO;
  check_out: ISO;
  status: BookingStatus;
  deposit_received: boolean;
  notes: string | null;
  source: "web" | "admin";
  total_estimate: number | null;
  created_at: string;
};

export type Block = { id: string; start_date: ISO; end_date: ISO; reason: string | null };

export type NewBooking = Pick<Booking, "guest_name" | "guest_phone" | "guest_email" | "guests" | "check_in" | "check_out" | "notes" | "total_estimate">;

export type CreateResult = { ok: true } | { ok: false; reason: "taken" | "blocked" | "min_nights" | "capacity" | "past" | "unknown" };

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const hasSupabase = Boolean(supabaseUrl && supabaseAnon);

async function anonClient() {
  if (!supabaseUrl || !supabaseAnon) return null;
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(supabaseUrl, supabaseAnon, { auth: { persistSession: false } });
}

// ───────── Almacenamiento local de prueba ─────────
const devFile = path.join(process.cwd(), ".data", "dev.json");
export type DevStore = { bookings: Booking[]; blocks: Block[]; settings: Partial<Settings> };

export async function readDev(): Promise<DevStore> {
  try {
    const raw = JSON.parse(await fs.readFile(devFile, "utf8"));
    return { bookings: raw.bookings ?? [], blocks: raw.blocks ?? [], settings: raw.settings ?? {} };
  } catch {
    return { bookings: [], blocks: [], settings: {} };
  }
}

export async function writeDev(store: DevStore) {
  await fs.mkdir(path.dirname(devFile), { recursive: true });
  await fs.writeFile(devFile, JSON.stringify(store, null, 2));
}

export function settingsFallback(): Settings {
  const n = site.numbers;
  return {
    priceWeekday: n.priceWeekday,
    priceWeekend: n.priceWeekend,
    priceHoliday: n.priceHoliday,
    holidays: site.holidays,
    depositPercent: n.depositPercent,
    minNights: n.minNights,
    maxGuests: n.maxGuests,
    checkIn: site.checkIn,
    checkOut: site.checkOut,
    phone: null,
    whatsapp: null,
    description: null,
  };
}

/** Fila de la tabla settings → Settings (lo vacío queda con el valor de config/site.ts). */
export function rowToSettings(data: Record<string, unknown>): Settings {
  const fb = settingsFallback();
  return {
    priceWeekday: (data.price_weekday as number | null) ?? fb.priceWeekday,
    priceWeekend: (data.price_weekend as number | null) ?? fb.priceWeekend,
    priceHoliday: (data.price_holiday as number | null) ?? fb.priceHoliday,
    holidays: (data.holidays as ISO[] | null) ?? [],
    depositPercent: (data.deposit_percent as number | null) ?? fb.depositPercent,
    minNights: (data.min_nights as number | null) ?? fb.minNights,
    maxGuests: (data.max_guests as number | null) ?? fb.maxGuests,
    checkIn: (data.check_in_time as string | null) || fb.checkIn,
    checkOut: (data.check_out_time as string | null) || fb.checkOut,
    phone: (data.phone as string | null) || null,
    whatsapp: (data.whatsapp as string | null) || null,
    description: (data.description as string | null) || null,
  };
}

// ───────── API pública ─────────
export async function getOccupiedRanges(): Promise<OccupiedRange[]> {
  const db = await anonClient();
  if (db) {
    const { data, error } = await db.from("occupied_dates").select("start_date, end_date");
    if (error) throw new Error(`No se pudieron leer las fechas ocupadas: ${error.message}`);
    return (data ?? []).map((r) => ({ start: r.start_date as ISO, end: r.end_date as ISO }));
  }
  const dev = await readDev();
  const { addDays } = await import("./dates");
  return [
    ...dev.bookings.filter((b) => b.status === "pending" || b.status === "confirmed").map((b) => ({ start: b.check_in, end: b.check_out })),
    ...dev.blocks.map((b) => ({ start: b.start_date, end: addDays(b.end_date, 1) })),
  ];
}

export async function getSettings(): Promise<Settings> {
  const db = await anonClient();
  if (db) {
    const { data } = await db.from("settings").select("*").eq("id", 1).maybeSingle();
    return data ? rowToSettings(data) : settingsFallback();
  }
  const dev = await readDev();
  const fb = settingsFallback();
  const merged = { ...fb, ...dev.settings };
  return { ...merged, checkIn: merged.checkIn || fb.checkIn, checkOut: merged.checkOut || fb.checkOut };
}

export async function createBooking(b: NewBooking): Promise<CreateResult> {
  const db = await anonClient();
  if (db) {
    // Sin .select(): el rol anónimo puede insertar pero no leer reservas.
    const { error } = await db.from("bookings").insert({ ...b, status: "pending", source: "web", deposit_received: false });
    if (!error) return { ok: true };
    const msg = error.message ?? "";
    if (error.code === "23P01") return { ok: false, reason: "taken" };
    if (msg.includes("fechas_bloqueadas")) return { ok: false, reason: "blocked" };
    if (msg.includes("estadia_minima")) return { ok: false, reason: "min_nights" };
    if (msg.includes("capacidad")) return { ok: false, reason: "capacity" };
    if (msg.includes("fecha_pasada")) return { ok: false, reason: "past" };
    console.error("[createBooking]", error);
    return { ok: false, reason: "unknown" };
  }

  const dev = await readDev();
  dev.bookings.push({
    ...b,
    id: crypto.randomUUID(),
    status: "pending",
    deposit_received: false,
    source: "web",
    created_at: new Date().toISOString(),
  });
  await writeDev(dev);
  return { ok: true };
}
