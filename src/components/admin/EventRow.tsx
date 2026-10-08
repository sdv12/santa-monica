"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import type { CalendarEvent } from "@/lib/data";
import { formatShort } from "@/lib/dates";
import { borrarEvento } from "@/app/admin/actions";
import { ConfirmDialog } from "./ConfirmDialog";
import { FeedbackMsg, useAction } from "./useAction";

export function EventRow({ event: e }: { event: CalendarEvent }) {
  const { pending, feedback, run } = useAction();
  const [confirming, setConfirming] = useState(false);
  return (
    <li className="flex flex-col gap-3 rounded-card border border-line bg-paper p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-display text-2xl font-semibold capitalize">{formatShort(e.date)}</p>
        <p className="text-xl font-bold">{e.name}</p>
        {e.text && <p className="text-lg text-muted">{e.text}</p>}
        <FeedbackMsg feedback={feedback} />
      </div>
      <Button variant="outline" disabled={pending} onClick={() => setConfirming(true)}>
        Borrar evento
      </Button>
      <ConfirmDialog
        open={confirming}
        title="¿Borrar este evento?"
        confirmLabel="Sí, borrar"
        busy={pending}
        onCancel={() => setConfirming(false)}
        onConfirm={() => run(() => borrarEvento(e.id), () => setConfirming(false))}
      >
        ¿Seguro que querés borrar "{e.name}"? Va a dejar de verse en el calendario de la página.
      </ConfirmDialog>
    </li>
  );
}
