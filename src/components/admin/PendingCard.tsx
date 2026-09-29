"use client";

import { useState } from "react";
import { Check, MessageCircle, Phone, X } from "lucide-react";
import { Button, Card, Chip } from "@/components/ui";
import type { Booking } from "@/lib/data";
import { diffDays, formatShort } from "@/lib/dates";
import { guestWhatsappLink } from "@/lib/contact";
import { plural } from "@/lib/booking-rules";
import { formatMoney } from "@/lib/settings";
import { aceptar, rechazar } from "@/app/admin/actions";
import { ConfirmDialog } from "./ConfirmDialog";
import { FeedbackMsg, useAction } from "./useAction";

export function PendingCard({ booking: b }: { booking: Booking }) {
  const { pending, feedback, run } = useAction();
  const [confirming, setConfirming] = useState(false);
  const first = b.guest_name.trim().split(/\s+/)[0];
  const nights = diffDays(b.check_in, b.check_out);
  const wa = guestWhatsappLink(b.guest_phone, `Hola ${first}, te escribo por tu pedido de reserva del ${formatShort(b.check_in)} al ${formatShort(b.check_out)}.`);

  return (
    <Card as="article" className="flex flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-display text-3xl font-semibold">{b.guest_name}</h3>
        <Chip tone="pending">Pendiente</Chip>
      </div>

      <dl className="grid gap-x-8 gap-y-2 text-xl sm:grid-cols-2">
        <Item label="Llegada" value={formatShort(b.check_in)} />
        <Item label="Salida" value={formatShort(b.check_out)} />
        <Item label="Estadía" value={`${plural(nights, "noche", "noches")} · ${plural(b.guests, "persona", "personas")}`} />
        {b.total_estimate != null && <Item label="Total estimado" value={formatMoney(b.total_estimate)} />}
      </dl>
      <p className="flex items-center gap-2 text-xl">
        <Phone size={24} strokeWidth={1.7} aria-hidden className="text-terra" />
        <a href={`tel:${b.guest_phone.replace(/[^\d+]/g, "")}`} className="font-bold underline underline-offset-4">
          {b.guest_phone}
        </a>
      </p>
      {b.notes && <p className="rounded-2xl bg-cream p-4 text-lg">“{b.notes}”</p>}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" disabled={pending} onClick={() => run(() => aceptar(b.id))} icon={<Check size={26} strokeWidth={2} aria-hidden />}>
          Aceptar
        </Button>
        <Button size="lg" variant="outline" disabled={pending} onClick={() => setConfirming(true)} icon={<X size={26} strokeWidth={2} aria-hidden />}>
          Rechazar
        </Button>
      </div>
      <a href={wa} className="inline-flex min-h-12 items-center gap-2 text-xl font-bold text-olive underline underline-offset-4">
        <MessageCircle size={24} strokeWidth={1.7} aria-hidden /> Escribirle por WhatsApp
      </a>
      <FeedbackMsg feedback={feedback} />

      <ConfirmDialog
        open={confirming}
        title="¿Rechazar este pedido?"
        confirmLabel="Sí, rechazar"
        busy={pending}
        onCancel={() => setConfirming(false)}
        onConfirm={() => run(() => rechazar(b.id), () => setConfirming(false))}
      >
        ¿Seguro que querés rechazar el pedido de {first}? Las fechas van a quedar libres otra vez. Acordate de avisarle por WhatsApp.
      </ConfirmDialog>
    </Card>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-base text-muted">{label}</dt>
      <dd className="font-bold">{value}</dd>
    </div>
  );
}
