import { Search } from "lucide-react";
import { site } from "../../../config/site";
import { ArcBadge, ArcFrame, Button, Card, Chip, ContactActions, ErrorMsg, Field, Logo, Section, TextArea } from "@/components/ui";

export const metadata = { title: "Kit de componentes" };

const swatches = [
  ["cream", "#F4EEE3"], ["paper", "#FBF8F2"], ["sage", "#E2E7D2"], ["sage-deep", "#C9D3B0"],
  ["olive", "#33402F"], ["terra", "#9A3F24"], ["blush", "#EBD3C1"], ["ochre", "#D9A441"],
  ["ink", "#26261E"], ["muted", "#5A584A"], ["line", "#DDD2BE"], ["line-strong", "#BFB29A"],
];

export default function Kit() {
  return (
    <main id="contenido">
      <Section tone="cream" labelledBy="k-tipo">
        <div className="flex flex-col gap-6">
          <Logo />
          <p className="eyebrow">Casa de campo · {site.locality}</p>
          <h1 id="k-tipo" className="t-h1">
            Un lugar para <em>quedarse</em> un rato.
          </h1>
          <h2 className="t-h2">
            Cómo <em>reservar</em>
          </h2>
          <h3 className="t-h3">
            Elegí las <em>fechas</em>
          </h3>
          <p className="t-lead max-w-2xl">Texto de párrafo a 19–22px, con interlineado 1.5 y color secundario legible.</p>
          <div className="flex flex-wrap gap-3">
            {swatches.map(([name, hex]) => (
              <div key={name} className="w-28 text-sm">
                <div className="h-14 rounded-2xl border border-line" style={{ background: hex }} />
                <b>{name}</b>
                <br />
                {hex}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="sage" labelledBy="k-btn">
        <h2 id="k-btn" className="t-h2 mb-8">
          <em>Botones</em> y estados
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="lg" icon={<Search size={26} strokeWidth={1.7} aria-hidden />}>Ver disponibilidad</Button>
          <Button variant="terra">+ Nueva reserva</Button>
          <Button variant="outline">Rechazar</Button>
          <Button disabled>Deshabilitado</Button>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Chip tone="ok">Seña recibida</Chip>
          <Chip tone="pending">Pendiente</Chip>
          <Chip tone="blocked">Bloqueado</Chip>
          <Chip>Falta la seña</Chip>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <span className="rounded-2xl bg-busy-bg px-5 py-3 font-bold text-busy-fg line-through">14 · Ocupado</span>
          <span className="rounded-2xl border-2 border-dashed border-pending-border bg-pending-bg px-5 py-3 font-bold">15 · Pendiente</span>
          <span className="rounded-2xl bg-blocked-bg px-5 py-3 font-bold text-blocked-fg line-through">16 · Bloqueado</span>
          <span className="rounded-2xl bg-olive px-5 py-3 font-bold text-white">17 · Elegido</span>
          <span className="rounded-2xl bg-sage-deep px-5 py-3">18 · En el rango</span>
        </div>
      </Section>

      <Section tone="paper" labelledBy="k-forms">
        <h2 id="k-forms" className="t-h2 mb-8">
          Campos y <em>tarjetas</em>
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <ArcBadge n={1} />
              <h3 className="t-h3">Elegí las fechas</h3>
            </div>
            <Field label="Nombre y apellido" placeholder="Ej.: Marta Pérez" />
            <Field label="Teléfono (WhatsApp)" error="Falta tu teléfono para poder confirmarte" defaultValue="" />
            <Field label="Email" optional hint="Solo si querés que te escribamos también por mail." />
            <TextArea label="Comentarios" optional />
            <ErrorMsg>Esas fechas ya están ocupadas. Probá con otro día.</ErrorMsg>
          </Card>
          <div className="flex flex-col gap-8">
            <ArcFrame className="mx-auto aspect-[4/5] w-full max-w-sm" />
            <ContactActions />
          </div>
        </div>
      </Section>

      <Section tone="blush">
        <p className="t-lead text-ink">Sección "cómo llegar" (blush).</p>
      </Section>
      <Section tone="olive">
        <Logo light />
      </Section>
    </main>
  );
}
