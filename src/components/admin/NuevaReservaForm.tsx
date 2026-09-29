"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Card, Counter, Field, TextArea } from "@/components/ui";
import { Calendar, type DayState } from "@/components/calendar/Calendar";
import { diffDays, formatShort, todayISO, type ISO } from "@/lib/dates";
import { plural } from "@/lib/booking-rules";
import { FALLBACK_MAX_GUESTS } from "@/lib/settings";
import { crearReservaAdmin } from "@/app/admin/actions";
import { FeedbackMsg, useAction } from "./useAction";

/** Carga de una reserva telefónica: queda confirmada, con o sin seña recibida. */
export function NuevaReservaForm({ states, maxGuests }: { states: Record<ISO, DayState>; maxGuests: number | null }) {
  const router = useRouter();
  const today = todayISO();
  const [start, setStart] = useState<ISO | null>(null);
  const [end, setEnd] = useState<ISO | null>(null);
  const [guests, setGuests] = useState(2);
  const [form, setForm] = useState({ nombre: "", telefono: "", comentarios: "" });
  const [sena, setSena] = useState(false);
  const { pending, feedback, run, setFeedback } = useAction();
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const fieldError = (name: string) => (feedback && !feedback.ok && feedback.field === name ? feedback.text : undefined);

  function pick(iso: ISO) {
    setFeedback(null);
    if (!start || end || iso <= start) {
      setStart(iso);
      setEnd(null);
    } else setEnd(iso);
  }

  const submit = () =>
    run(
      () => crearReservaAdmin({ llegada: start ?? "", salida: end ?? "", personas: guests, ...form, senaRecibida: sena }),
      () => router.push("/admin?guardado=1"),
    );

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
      <Card className="flex flex-col gap-4">
        <h2 className="t-h3">1. Elegí las <em>fechas</em></h2>
        <p className="text-xl text-muted">Tocá el día de llegada y después el día de salida.</p>
        <Calendar states={states} start={start} end={end} onPick={pick} size="lg" pickable={(d) => d >= today} />
        <p className="text-xl font-bold" aria-live="polite">
          {start && end ? `${formatShort(start)} → ${formatShort(end)} · ${plural(diffDays(start, end), "noche", "noches")}` : start ? `Llegada: ${formatShort(start)}. Falta elegir la salida.` : "Todavía no elegiste fechas."}
        </p>
      </Card>

      <Card className="flex h-fit flex-col gap-6">
        <h2 className="t-h3">2. Datos de quien <em>reserva</em></h2>
        <Field label="Nombre y apellido" value={form.nombre} onChange={set("nombre")} error={fieldError("nombre")} />
        <Field label="Teléfono" type="tel" inputMode="tel" value={form.telefono} onChange={set("telefono")} error={fieldError("telefono")} />
        <Counter label="Personas" value={guests} onChange={setGuests} max={maxGuests ?? FALLBACK_MAX_GUESTS} />
        <TextArea label="Comentarios" optional value={form.comentarios} onChange={set("comentarios")} />
        <label className="flex min-h-14 cursor-pointer items-center gap-4 rounded-2xl bg-sage p-4 text-xl font-bold">
          <input type="checkbox" checked={sena} onChange={(e) => setSena(e.target.checked)} className="h-8 w-8 shrink-0 accent-[#33402F]" />
          La seña ya está recibida
        </label>
        {feedback && !feedback.field && <FeedbackMsg feedback={feedback} />}
        <Button size="lg" onClick={submit} disabled={pending}>
          {pending ? "Guardando…" : "Guardar reserva"}
        </Button>
      </Card>
    </div>
  );
}
