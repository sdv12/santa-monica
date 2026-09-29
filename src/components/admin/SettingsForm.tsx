"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button, Card, Field, TextArea } from "@/components/ui";
import { formatShort, isISO } from "@/lib/dates";
import type { Settings } from "@/lib/settings";
import { guardarAjustes } from "@/app/admin/actions";
import { FeedbackMsg, useAction } from "./useAction";

const str = (n: number | null) => (n == null ? "" : String(n));
const time = (t: string) => (/^\d{2}:\d{2}/.test(t) ? t.slice(0, 5) : "");

export function SettingsForm({ settings: s }: { settings: Settings }) {
  const [v, setV] = useState({
    priceWeekday: str(s.priceWeekday),
    priceWeekend: str(s.priceWeekend),
    priceHoliday: str(s.priceHoliday),
    depositPercent: str(s.depositPercent),
    checkIn: time(s.checkIn),
    checkOut: time(s.checkOut),
    minNights: str(s.minNights),
    maxGuests: str(s.maxGuests),
    phone: s.phone ?? "",
    whatsapp: s.whatsapp ?? "",
    description: s.description ?? "",
  });
  const [holidays, setHolidays] = useState<string[]>(s.holidays);
  const [newHoliday, setNewHoliday] = useState("");
  const { pending, feedback, run, setFeedback } = useAction();

  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFeedback(null);
    setV((x) => ({ ...x, [k]: e.target.value }));
  };
  const err = (name: string) => (feedback && !feedback.ok && feedback.field === name ? feedback.text : undefined);
  const num = { type: "text", inputMode: "numeric" } as const;

  function addHoliday() {
    if (!isISO(newHoliday)) return;
    setHolidays((h) => [...new Set([...h, newHoliday])].sort());
    setNewHoliday("");
    setFeedback(null);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        run(() => guardarAjustes({ ...v, holidays }));
      }}
      className="mx-auto flex max-w-3xl flex-col gap-8"
    >
      <Card className="flex flex-col gap-6">
        <h2 className="t-h3">Precio por <em>noche</em></h2>
        <Field label="Lunes a jueves" hint="En pesos, solo números." {...num} value={v.priceWeekday} onChange={set("priceWeekday")} error={err("priceWeekday")} />
        <Field label="Viernes a domingo" {...num} value={v.priceWeekend} onChange={set("priceWeekend")} error={err("priceWeekend")} />
        <Field label="Feriados y fines de semana largos" {...num} value={v.priceHoliday} onChange={set("priceHoliday")} error={err("priceHoliday")} />
        <div className="flex flex-col gap-3">
          <p className="text-xl font-bold">Noches que se cobran como feriado</p>
          {holidays.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {holidays.map((d) => (
                <li key={d} className="inline-flex items-center gap-1 rounded-full border-2 border-line-strong bg-white py-1 pl-4 pr-1 text-lg font-bold">
                  {formatShort(d)}
                  <button
                    type="button"
                    aria-label={`Quitar ${formatShort(d)}`}
                    onClick={() => setHolidays((h) => h.filter((x) => x !== d))}
                    className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-sage"
                  >
                    <X size={22} strokeWidth={2} aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <Field label="Agregar una fecha" type="date" value={newHoliday} onChange={(e) => setNewHoliday(e.target.value)} className="flex-1" />
            <Button variant="outline" onClick={addHoliday} disabled={!newHoliday} icon={<Plus size={24} strokeWidth={2} aria-hidden />}>
              Agregar
            </Button>
          </div>
        </div>
      </Card>

      <Card className="flex flex-col gap-6">
        <h2 className="t-h3">Seña, horarios y <em>estadía</em></h2>
        <Field label="Seña (% del total)" {...num} value={v.depositPercent} onChange={set("depositPercent")} error={err("depositPercent")} />
        <Field label="Horario de ingreso" type="time" value={v.checkIn} onChange={set("checkIn")} error={err("checkIn")} />
        <Field label="Horario de salida" type="time" value={v.checkOut} onChange={set("checkOut")} error={err("checkOut")} />
        <Field label="Estadía mínima (noches)" {...num} value={v.minNights} onChange={set("minNights")} error={err("minNights")} />
        <Field label="Cantidad máxima de personas" {...num} value={v.maxGuests} onChange={set("maxGuests")} error={err("maxGuests")} />
      </Card>

      <Card className="flex flex-col gap-6">
        <h2 className="t-h3">Contacto y <em>descripción</em></h2>
        <Field label="Teléfono (como se muestra)" type="tel" hint="Ej.: 351 000-0000" value={v.phone} onChange={set("phone")} />
        <Field
          label="WhatsApp (solo números)"
          type="tel"
          inputMode="numeric"
          hint="Con código de país, sin + ni espacios. Ej.: 5493510000000. También se usa para el botón Llamar."
          value={v.whatsapp}
          onChange={set("whatsapp")}
          error={err("whatsapp")}
        />
        <TextArea label="Descripción de la casa" rows={5} value={v.description} onChange={set("description")} />
      </Card>

      <div className="flex flex-col gap-4">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Guardando…" : "Guardar cambios"}
        </Button>
        <FeedbackMsg feedback={feedback} />
      </div>
    </form>
  );
}
