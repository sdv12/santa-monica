"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { ArrowLeft, ArrowRight, CircleCheck, Send } from "lucide-react";
import { useSite } from "@/lib/site-context";
import { Button, Card, Counter, ErrorMsg, Field, TextArea } from "@/components/ui";
import { Calendar } from "@/components/calendar/Calendar";
import { Stepper } from "@/components/reserva/Stepper";
import { ContactActions } from "@/components/ui";
import type { OccupiedRange } from "@/lib/availability";
import { busyNights, plural, validateContact, validateRange, type ContactErrors } from "@/lib/booking-rules";
import { formatLong, formatShort, isISO, todayISO, type ISO } from "@/lib/dates";
import { quote } from "@/lib/pricing";
import { FALLBACK_MAX_GUESTS, formatMoney, type Settings } from "@/lib/settings";
import { crearReserva } from "./actions";

type Props = {
  occupied: OccupiedRange[];
  settings: Settings;
  initial: { llegada: string; salida: string; personas: number };
};

type Step = 1 | 2 | 3 | 4; // 4 = pantalla final

export function ReservaFlow({ occupied, settings, initial }: Props) {
  const site = useSite();
  const today = todayISO();
  const maxGuests = settings.maxGuests ?? FALLBACK_MAX_GUESTS;
  const busy = busyNights(occupied);

  // Valores que vienen de la barra de la landing: se usan solo si son válidos.
  const preStart = isISO(initial.llegada) && !busy.has(initial.llegada) && initial.llegada >= today ? initial.llegada : null;
  const preEnd = preStart && isISO(initial.salida) && !validateRange(preStart, initial.salida, occupied, settings, today) ? initial.salida : null;

  const [step, setStep] = useState<Step>(1);
  const [start, setStart] = useState<ISO | null>(preStart);
  const [end, setEnd] = useState<ISO | null>(preEnd);
  const [guests, setGuests] = useState(Math.min(maxGuests, Math.max(1, initial.personas)));
  const [notice, setNotice] = useState<string | null>(null);
  const [form, setForm] = useState({ nombre: "", telefono: "", email: "", comentarios: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sendError, setSendError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const titleRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    titleRef.current?.focus({ preventScroll: true });
  }, [step]);

  const q = start && end ? quote(start, end, settings) : null;

  function pick(iso: ISO) {
    setNotice(null);
    if (start && !end && iso === start) return setNotice("La salida tiene que ser un día después de la llegada.");
    if (!start || end || iso < start) {
      if (busy.has(iso)) return setNotice("Ese día ya está ocupado. Elegí otro día de llegada.");
      setStart(iso);
      setEnd(null);
      return;
    }
    const problem = validateRange(start, iso, occupied, settings, today);
    if (problem) return setNotice(problem);
    setEnd(iso);
  }

  function toStep2() {
    if (!start || !end) return setNotice("Elegí primero el día de llegada y el de salida.");
    setNotice(null);
    setStep(2);
  }

  function toStep3() {
    const found = validateContact(form);
    setErrors(found);
    if (Object.keys(found).length === 0) setStep(3);
  }

  function send() {
    if (!start || !end) return;
    setSendError(null);
    startTransition(async () => {
      const res = await crearReserva({ llegada: start, salida: end, personas: guests, ...form });
      if (res.ok) return setStep(4);
      if (res.step === 2 && res.field) setErrors({ [res.field]: res.error });
      else if (res.step === 1) setNotice(res.error);
      else setSendError(res.error);
      setStep(res.step);
    });
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const heading = (text: React.ReactNode) => (
    <h1 ref={titleRef} tabIndex={-1} className="t-h2 outline-none">
      {text}
    </h1>
  );

  if (step === 4) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 py-10 text-center">
        <span aria-hidden className="arc flex h-28 w-24 items-center justify-center bg-sage-deep pt-4 text-olive">
          <CircleCheck size={48} strokeWidth={1.7} />
        </span>
        <h1 ref={titleRef} tabIndex={-1} className="t-h2 outline-none">
          ¡Listo! Te escribimos por <em>WhatsApp</em> para coordinar la seña
        </h1>
        <p className="t-lead">
          Recibimos tu pedido{start && end ? ` del ${formatLong(start)} al ${formatLong(end)}` : ""}. Las fechas quedan reservadas para vos hasta que te respondamos.
        </p>
        <p className="text-xl">
          Si necesitás algo antes, llamanos al <b>{site.phone}</b>.
        </p>
        <ContactActions />
        <Button href="/" variant="outline" className="mt-2">
          Volver al inicio
        </Button>
      </div>
    );
  }

  const stepper = <Stepper current={step} />;

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-8">
      {stepper}

      {step === 1 && (
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-5">
            {heading(
              <>
                Elegí las <em>fechas</em>
              </>,
            )}
            <p className="text-xl text-muted">Tocá el día de llegada y después el día de salida.</p>
            <Card>
              <Calendar occupied={occupied} start={start} end={end} onPick={pick} size="lg" pickable={(d) => d >= today} />
            </Card>
            {notice && <ErrorMsg>{notice}</ErrorMsg>}
          </div>

          <aside aria-label="Resumen de tu reserva" className="flex h-fit flex-col gap-6 rounded-card border border-line bg-paper p-6 shadow-soft sm:p-8 lg:sticky lg:top-6">
            <h2 className="t-h3">Tu <em>reserva</em></h2>
            <dl className="flex flex-col divide-y divide-line text-xl">
              <Row label="Llegada" value={start ? formatShort(start) : "Sin elegir"} />
              <Row label="Salida" value={end ? formatShort(end) : "Sin elegir"} />
              <Row label="Noches" value={q ? String(q.nights) : "—"} />
            </dl>
            <Counter label="Personas" value={guests} onChange={setGuests} max={maxGuests} />
            {settings.maxGuests && <p className="-mt-3 text-base text-muted">La casa aloja hasta {settings.maxGuests} personas.</p>}
            <Totals q={q} settings={settings} />
            <Button size="lg" onClick={toStep2} icon={<ArrowRight size={26} strokeWidth={1.7} aria-hidden />} className="flex-row-reverse">
              Continuar
            </Button>
            <p className="text-base text-muted">Todavía no se confirma nada: primero completás tus datos.</p>
          </aside>
        </div>
      )}

      {step === 2 && start && end && (
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
          {heading(
            <>
              Tus <em>datos</em>
            </>,
          )}
          <Summary line={`${formatShort(start)} → ${formatShort(end)} · ${plural(q!.nights, "noche", "noches")} · ${plural(guests, "persona", "personas")}`} onChange={() => setStep(1)} />
          <Card className="flex flex-col gap-6">
            <Field label="Nombre y apellido" autoComplete="name" value={form.nombre} onChange={set("nombre")} error={errors.nombre} />
            <Field label="Teléfono (WhatsApp)" type="tel" inputMode="tel" autoComplete="tel" hint="Por acá te escribimos para confirmar." value={form.telefono} onChange={set("telefono")} error={errors.telefono} />
            <Field label="Email" type="email" autoComplete="email" optional value={form.email} onChange={set("email")} error={errors.email} />
            <TextArea label="Comentarios" optional hint="Por ejemplo: viajamos con un perro, llegamos tarde…" value={form.comentarios} onChange={set("comentarios")} />
          </Card>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Button variant="outline" onClick={() => setStep(1)} icon={<ArrowLeft size={26} strokeWidth={1.7} aria-hidden />}>
              Volver
            </Button>
            <Button size="lg" onClick={toStep3} icon={<ArrowRight size={26} strokeWidth={1.7} aria-hidden />} className="flex-row-reverse">
              Continuar
            </Button>
          </div>
        </div>
      )}

      {step === 3 && start && end && q && (
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
          {heading(
            <>
              Revisá y <em>confirmá</em>
            </>,
          )}
          <Card className="flex flex-col gap-6">
            <dl className="flex flex-col divide-y divide-line text-xl">
              <Row label="Llegada" value={formatLong(start)} />
              <Row label="Salida" value={formatLong(end)} />
              <Row label="Noches" value={String(q.nights)} />
              <Row label="Personas" value={String(guests)} />
              <Row label="Nombre" value={form.nombre.trim()} />
              <Row label="Teléfono" value={form.telefono.trim()} />
              {form.email.trim() && <Row label="Email" value={form.email.trim()} />}
              {form.comentarios.trim() && <Row label="Comentarios" value={form.comentarios.trim()} />}
            </dl>
            <Totals q={q} settings={settings} />
          </Card>
          <Card className="bg-sage">
            <h2 className="t-h3 mb-3">Cómo es la <em>seña</em></h2>
            <ul className="flex list-disc flex-col gap-2 pl-6 text-xl">
              <li>Tu pedido queda <b>pendiente</b>: las fechas quedan apartadas para vos hasta que te respondamos.</li>
              <li>Te escribimos por WhatsApp para coordinar la seña{settings.depositPercent != null ? ` del ${settings.depositPercent}%` : ` del ${site.depositPercent}%`}.</li>
              <li>La reserva se confirma cuando recibimos la seña.</li>
              <li>Ingreso desde las {settings.checkIn} y salida hasta las {settings.checkOut}.</li>
            </ul>
          </Card>
          {sendError && <ErrorMsg>{sendError}</ErrorMsg>}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Button variant="outline" onClick={() => setStep(2)} disabled={pending} icon={<ArrowLeft size={26} strokeWidth={1.7} aria-hidden />}>
              Volver
            </Button>
            <Button size="lg" onClick={send} disabled={pending} icon={<Send size={26} strokeWidth={1.7} aria-hidden />}>
              {pending ? "Enviando…" : "Enviar pedido de reserva"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-bold">{value}</dd>
    </div>
  );
}

function Totals({ q, settings }: { q: ReturnType<typeof quote> | null; settings: Settings }) {
  const unknown = "A confirmar";
  return (
    <dl className="flex flex-col gap-2 rounded-2xl bg-sage p-5 text-xl">
      <div className="flex justify-between gap-4">
        <dt>Total estimado</dt>
        <dd className="font-display text-2xl font-semibold">{q?.total != null ? formatMoney(q.total) : q ? unknown : "—"}</dd>
      </div>
      <div className="flex justify-between gap-4">
        <dt>Seña{settings.depositPercent != null ? ` (${settings.depositPercent}%)` : ""}</dt>
        <dd className="font-bold">{q?.deposit != null ? formatMoney(q.deposit) : q ? unknown : "—"}</dd>
      </div>
    </dl>
  );
}

function Summary({ line, onChange }: { line: string; onChange: () => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-sage p-4 text-xl">
      <p className="font-bold">{line}</p>
      <button type="button" onClick={onChange} className="min-h-12 rounded-full px-4 font-bold text-olive underline underline-offset-4">
        Cambiar fechas
      </button>
    </div>
  );
}
