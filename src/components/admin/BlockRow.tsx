"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import type { Block } from "@/lib/data";
import { formatShort } from "@/lib/dates";
import { desbloquear } from "@/app/admin/actions";
import { ConfirmDialog } from "./ConfirmDialog";
import { FeedbackMsg, useAction } from "./useAction";

export function BlockRow({ block: b }: { block: Block }) {
  const { pending, feedback, run } = useAction();
  const [confirming, setConfirming] = useState(false);
  return (
    <li className="flex flex-col gap-3 rounded-card border border-line bg-paper p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-display text-2xl font-semibold">
          {b.start_date === b.end_date ? formatShort(b.start_date) : `${formatShort(b.start_date)} al ${formatShort(b.end_date)}`}
        </p>
        <p className="text-xl text-muted">{b.reason || "Sin motivo anotado"}</p>
        <FeedbackMsg feedback={feedback} />
      </div>
      <Button variant="outline" disabled={pending} onClick={() => setConfirming(true)}>
        Borrar bloqueo
      </Button>
      <ConfirmDialog
        open={confirming}
        title="¿Borrar este bloqueo?"
        confirmLabel="Sí, borrar"
        busy={pending}
        onCancel={() => setConfirming(false)}
        onConfirm={() => run(() => desbloquear(b.id), () => setConfirming(false))}
      >
        ¿Seguro que querés borrar este bloqueo? Esas fechas van a quedar libres para que la gente pueda reservar.
      </ConfirmDialog>
    </li>
  );
}
