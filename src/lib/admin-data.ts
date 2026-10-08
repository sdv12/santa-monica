import { addDays, type ISO } from "./dates";
import { rowToSettings, readDev, writeDev, hasSupabase, settingsFallback, type Block, type Booking, type BookingStatus, type CalendarEvent, type NewBooking } from "./data";
import type { Settings } from "./settings";
import { supabaseServer } from "./supabase-server";

/** Operaciones del administrador. Con Supabase corren con su sesión (RLS: solo usuarios autenticados). */

export type Result = { ok: true } | { ok: false; error: string };
const fail = (error: string): Result => ({ ok: false, error });
const OK: Result = { ok: true };
const generic = "No se pudo guardar. Probá de nuevo en un momento.";

const overlaps = (aStart: ISO, aEnd: ISO, bStart: ISO, bEnd: ISO) => aStart < bEnd && bStart < aEnd; // [inicio, fin)

async function db() {
  return hasSupabase ? await supabaseServer() : null;
}

export async function listBookings(): Promise<Booking[]> {
  const client = await db();
  if (client) {
    const { data, error } = await client.from("bookings").select("*").order("check_in");
    if (error) throw new Error(error.message);
    return data as Booking[];
  }
  return (await readDev()).bookings.toSorted((a, b) => a.check_in.localeCompare(b.check_in));
}

export async function listBlocks(): Promise<Block[]> {
  const client = await db();
  if (client) {
    const { data, error } = await client.from("blocked_dates").select("*").order("start_date");
    if (error) throw new Error(error.message);
    return data as Block[];
  }
  return (await readDev()).blocks.toSorted((a, b) => a.start_date.localeCompare(b.start_date));
}

async function patchBooking(id: string, patch: Partial<Booking>): Promise<Result> {
  const client = await db();
  if (client) {
    const { error } = await client.from("bookings").update(patch).eq("id", id);
    return error ? fail(generic) : OK;
  }
  const store = await readDev();
  const b = store.bookings.find((x) => x.id === id);
  if (!b) return fail("No encontramos esa reserva.");
  Object.assign(b, patch);
  await writeDev(store);
  return OK;
}

export const setBookingStatus = (id: string, status: BookingStatus) => patchBooking(id, { status });
export const setDepositReceived = (id: string, received: boolean) => patchBooking(id, { deposit_received: received });

export async function createAdminBooking(b: NewBooking & { deposit_received: boolean }): Promise<Result> {
  if (b.check_out <= b.check_in) return fail("La salida tiene que ser un día después de la llegada.");
  const [bookings, blocks] = await Promise.all([listBookings(), listBlocks()]);
  const busy =
    bookings.some((x) => (x.status === "pending" || x.status === "confirmed") && overlaps(b.check_in, b.check_out, x.check_in, x.check_out)) ||
    blocks.some((x) => overlaps(b.check_in, b.check_out, x.start_date, addDays(x.end_date, 1)));
  if (busy) return fail("Esas fechas ya están ocupadas o bloqueadas. Elegí otras.");

  const row = { ...b, status: "confirmed" as const, source: "admin" as const };
  const client = await db();
  if (client) {
    const { error } = await client.from("bookings").insert(row);
    return error ? fail(error.code === "23P01" ? "Esas fechas ya están ocupadas. Elegí otras." : generic) : OK;
  }
  const store = await readDev();
  store.bookings.push({ ...row, id: crypto.randomUUID(), created_at: new Date().toISOString() });
  await writeDev(store);
  return OK;
}

export async function createBlock(start: ISO, end: ISO, reason: string | null): Promise<Result> {
  if (end < start) return fail("El último día bloqueado no puede ser anterior al primero.");
  const bookings = await listBookings();
  const clash = bookings.find((x) => (x.status === "pending" || x.status === "confirmed") && overlaps(start, addDays(end, 1), x.check_in, x.check_out));
  if (clash) return fail(`En esas fechas hay una reserva de ${clash.guest_name}. Cancelala o rechazala primero.`);

  const client = await db();
  if (client) {
    const { error } = await client.from("blocked_dates").insert({ start_date: start, end_date: end, reason });
    return error ? fail(generic) : OK;
  }
  const store = await readDev();
  store.blocks.push({ id: crypto.randomUUID(), start_date: start, end_date: end, reason });
  await writeDev(store);
  return OK;
}

export async function deleteBlock(id: string): Promise<Result> {
  const client = await db();
  if (client) {
    const { error } = await client.from("blocked_dates").delete().eq("id", id);
    return error ? fail(generic) : OK;
  }
  const store = await readDev();
  store.blocks = store.blocks.filter((b) => b.id !== id);
  await writeDev(store);
  return OK;
}

export async function listEvents(): Promise<CalendarEvent[]> {
  const client = await db();
  if (client) {
    const { data, error } = await client.from("events").select("*").order("date");
    if (error) throw new Error(error.message);
    return data as CalendarEvent[];
  }
  return (await readDev()).events.toSorted((a, b) => a.date.localeCompare(b.date));
}

export async function createEvent(date: ISO, name: string, text: string): Promise<Result> {
  const client = await db();
  if (client) {
    const { error } = await client.from("events").insert({ date, name, text });
    return error ? fail(generic) : OK;
  }
  const store = await readDev();
  store.events.push({ id: crypto.randomUUID(), date, name, text });
  await writeDev(store);
  return OK;
}

export async function deleteEvent(id: string): Promise<Result> {
  const client = await db();
  if (client) {
    const { error } = await client.from("events").delete().eq("id", id);
    return error ? fail(generic) : OK;
  }
  const store = await readDev();
  store.events = store.events.filter((e) => e.id !== id);
  await writeDev(store);
  return OK;
}

/** Ajustes completos tal como los ve el admin (sin mezclar con los valores de config/site.ts). */
export async function getSettingsForEdit(): Promise<Settings> {
  const client = await db();
  if (client) {
    const { data } = await client.from("settings").select("*").eq("id", 1).maybeSingle();
    return data ? rowToSettings(data) : settingsFallback();
  }
  return { ...settingsFallback(), ...(await readDev()).settings };
}

export async function saveSettings(s: Settings): Promise<Result> {
  const client = await db();
  if (client) {
    const { error } = await client
      .from("settings")
      .update({
        price_weekday: s.priceWeekday,
        price_weekend: s.priceWeekend,
        price_holiday: s.priceHoliday,
        holidays: s.holidays,
        deposit_percent: s.depositPercent,
        check_in_time: s.checkIn,
        check_out_time: s.checkOut,
        min_nights: s.minNights ?? 1,
        max_guests: s.maxGuests,
        phone: s.phone,
        whatsapp: s.whatsapp,
        description: s.description,
      })
      .eq("id", 1);
    return error ? fail(generic) : OK;
  }
  const store = await readDev();
  store.settings = s;
  await writeDev(store);
  return OK;
}

