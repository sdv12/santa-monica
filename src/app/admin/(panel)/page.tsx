import { CircleCheck } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { listBlocks, listBookings, listEvents } from "@/lib/admin-data";
import { buildStates } from "@/lib/admin-states";
import { todayISO } from "@/lib/dates";
import { getUpcomingHolidays } from "@/lib/holidays";
import { mergeCalendarDays } from "@/lib/calendar-days";
import { Card } from "@/components/ui";
import { PendingCard } from "@/components/admin/PendingCard";
import { UpcomingRow } from "@/components/admin/UpcomingRow";
import { AdminCalendar } from "@/components/admin/AdminCalendar";
import { Estadisticas } from "@/components/admin/Estadisticas";

export const metadata = { title: "Reservas" };

export default async function ReservasPage({ searchParams }: { searchParams: Promise<{ guardado?: string }> }) {
  await requireAdmin();
  const { guardado } = await searchParams;
  const today = todayISO();
  const [bookings, blocks, events, holidays] = await Promise.all([listBookings(), listBlocks(), listEvents(), getUpcomingHolidays(today)]);
  const calendarDays = mergeCalendarDays(holidays, events);

  const toAnswer = bookings.filter((b) => b.status === "pending").toSorted((a, b) => a.created_at.localeCompare(b.created_at));
  const upcoming = bookings.filter((b) => b.status === "confirmed" && b.check_out >= today);

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_440px]">
      <div className="flex min-w-0 flex-col gap-12">
        {guardado && (
          <p role="status" className="flex items-center gap-3 rounded-2xl bg-sage p-4 text-xl font-bold text-olive">
            <CircleCheck size={28} strokeWidth={1.7} aria-hidden /> Reserva guardada ✓
          </p>
        )}

        <Estadisticas bookings={bookings} />

        <section aria-labelledby="para-responder" className="flex flex-col gap-5">
          <h1 id="para-responder" className="t-h2">
            Para <em>responder</em>
          </h1>
          {toAnswer.length === 0 ? (
            <Card className="flex items-center gap-4 text-xl">
              <CircleCheck size={32} strokeWidth={1.7} aria-hidden className="shrink-0 text-olive" />
              No hay pedidos para responder. ¡Todo al día!
            </Card>
          ) : (
            <div className="flex flex-col gap-5">
              {toAnswer.map((b) => (
                <PendingCard key={b.id} booking={b} />
              ))}
            </div>
          )}
        </section>

        <section aria-labelledby="proximas" className="flex flex-col gap-5">
          <h2 id="proximas" className="t-h2">
            Próximas <em>estadías</em>
          </h2>
          {upcoming.length === 0 ? (
            <Card className="text-xl">Todavía no hay estadías confirmadas.</Card>
          ) : (
            <ul className="flex flex-col gap-4">
              {upcoming.map((b) => (
                <UpcomingRow key={b.id} booking={b} />
              ))}
            </ul>
          )}
        </section>
      </div>

      <aside aria-label="Calendario" className="rounded-card border border-line bg-paper p-5 shadow-soft sm:p-6 lg:sticky lg:top-6">
        <AdminCalendar states={buildStates(bookings, blocks)} days={calendarDays} />
      </aside>
    </div>
  );
}
