"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button, Chip } from "@/components/ui";
import type { Booking } from "@/lib/data";
import { diffDays, formatShort } from "@/lib/dates";
import { plural } from "@/lib/booking-rules";
import { cancelar, marcarSena } from "@/app/admin/actions";
import { ConfirmDialog } from "./ConfirmDialog";
import { FeedbackMsg, useAction } from "./useAction";

export function UpcomingRow({ booking: b }: { booking: Booking }) {
  const { pending, feedback, run } = useAction();
  const [confirming, setConfirming] = useState(false);
  const first = b.guest_name.trim().split(/\s+/)[0];
  const nights = diffDays(b.check_in, b.check_out);

  return (
    <li className="flex flex-col gap-4 rounded-card border border-line bg-paper p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-display text-2xl font-semibold">
            {formatShort(b.check_in)} → {formatShort(b.check_out)}
          </p>
          <p className="text-xl">
            {b.guest_name} · {plural(nights, "noche", "noches")} · {plural(b.guests, "persona", "personas")}
          </p>
        </div>
        {b.deposit_received ? <Chip tone="ok">Seña recibida</Chip> : <Chip>Falta la seña</Chip>}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {b.deposit_received ? (
          <Button variant="outline" disabled={pending} onClick={() => run(() => marcarSena(b.id, false))}>
            Desmarcar seña
          </Button>
        ) : (
          <Button disabled={pending} onClick={() => run(() => marcarSena(b.id, true))} icon={<Check size={26} strokeWidth={2} aria-hidden />}>
            Marcar seña recibida
          </Button>
        )}
        <Button variant="outline" disabled={pending} onClick={() => setConfirming(true)}>
          Cancelar reserva
        </Button>
      </div>
      <FeedbackMsg feedback={feedback} />

      <ConfirmDialog
        open={confirming}
        title="¿Cancelar esta reserva?"
        confirmLabel="Sí, cancelar"
        busy={pending}
        onCancel={() => setConfirming(false)}
        onConfirm={() => run(() => cancelar(b.id), () => setConfirming(false))}
      >
        ¿Seguro que querés cancelar la reserva de {first}? Las fechas van a quedar libres otra vez. Acordate de avisarle.
      </ConfirmDialog>
    </li>
  );
}
