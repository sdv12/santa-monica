import { requireAdmin } from "@/lib/auth";
import { listBlocks, listBookings } from "@/lib/admin-data";
import { buildStates } from "@/lib/admin-states";
import { todayISO } from "@/lib/dates";
import { Card } from "@/components/ui";
import { AdminCalendar } from "@/components/admin/AdminCalendar";
import { BlockRow } from "@/components/admin/BlockRow";

export const metadata = { title: "Calendario" };

export default async function CalendarioPage() {
  await requireAdmin();
  const [bookings, blocks] = await Promise.all([listBookings(), listBlocks()]);
  const today = todayISO();
  const activeBlocks = blocks.filter((b) => b.end_date >= today);

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1.3fr_1fr]">
      <section aria-labelledby="cal" className="flex flex-col gap-5">
        <h1 id="cal" className="t-h2">
          <em>Calendario</em> de la casa
        </h1>
        <Card>
          <AdminCalendar states={buildStates(bookings, blocks)} size="lg" />
        </Card>
      </section>

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
    </div>
  );
}
