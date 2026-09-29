import { requireAdmin } from "@/lib/auth";
import { listBlocks, listBookings } from "@/lib/admin-data";
import { buildStates } from "@/lib/admin-states";
import { getSettings } from "@/lib/data";
import { NuevaReservaForm } from "@/components/admin/NuevaReservaForm";

export const metadata = { title: "Nueva reserva" };

export default async function NuevaReservaPage() {
  await requireAdmin();
  const [bookings, blocks, settings] = await Promise.all([listBookings(), listBlocks(), getSettings()]);
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="t-h2">
          Nueva <em>reserva</em>
        </h1>
        <p className="text-xl text-muted">Para cargar una reserva que te pidieron por teléfono. Queda confirmada.</p>
      </div>
      <NuevaReservaForm states={buildStates(bookings, blocks)} maxGuests={settings.maxGuests} />
    </div>
  );
}
