import { requireAdmin } from "@/lib/auth";
import { listBlocks, listBookings, listEvents } from "@/lib/admin-data";
import { buildStates } from "@/lib/admin-states";
import { todayISO } from "@/lib/dates";
import { getUpcomingHolidays } from "@/lib/holidays";
import { mergeCalendarDays } from "@/lib/calendar-days";
import { Card } from "@/components/ui";
import { AdminCalendar } from "@/components/admin/AdminCalendar";
import { BlockRow } from "@/components/admin/BlockRow";
import { EventForm } from "@/components/admin/EventForm";
import { EventRow } from "@/components/admin/EventRow";

export const metadata = { title: "Calendario" };

export default async function CalendarioPage() {
  await requireAdmin();
  const today = todayISO();
  const [bookings, blocks, events, holidays] = await Promise.all([listBookings(), listBlocks(), listEvents(), getUpcomingHolidays(today)]);
  const activeBlocks = blocks.filter((b) => b.end_date >= today);
  const activeEvents = events.filter((e) => e.date >= today);
  const calendarDays = mergeCalendarDays(holidays, events);

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1.3fr_1fr]">
      <section aria-labelledby="cal" className="flex flex-col gap-5">
        <h1 id="cal" className="t-h2">
          <em>Calendario</em> de la casa
        </h1>
        <Card>
          <AdminCalendar states={buildStates(bookings, blocks)} days={calendarDays} size="lg" />
        </Card>
      </section>

      <div className="flex flex-col gap-10">
        <section aria-labelledby="bloqueos" className="flex flex-col gap-5">
          <h2 id="bloqueos" className="t-h2">
            Fechas <em>bloqueadas</em>
          </h2>
          {activeBlocks.length === 0 ? (
            <Card className="text-xl">No hay fechas bloqueadas. Usá “Bloquear fechas” en el calendario para mantenimiento o uso personal.</Card>
          ) : (
            <ul className="flex flex-col gap-4">
              {activeBlocks.map((b) => (
                <BlockRow key={b.id} block={b} />
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="eventos" className="flex flex-col gap-5">
          <h2 id="eventos" className="t-h2">
            Eventos <em>locales</em>
          </h2>
          <p className="text-xl text-muted">
            Los feriados nacionales ({holidays.length} cargados para este año y el siguiente) se traen solos y no hace falta cargarlos. Acá solo van fiestas o
            eventos de la zona, como el Oktoberfest.
          </p>
          <EventForm />
          {activeEvents.length === 0 ? (
            <Card className="text-xl">Todavía no cargaste ningún evento local.</Card>
          ) : (
            <ul className="flex flex-col gap-4">
              {activeEvents.map((e) => (
                <EventRow key={e.id} event={e} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
