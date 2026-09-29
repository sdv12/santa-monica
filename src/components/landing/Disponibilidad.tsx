import { getSite } from "@/lib/get-site";
import { getOccupiedRanges } from "@/lib/data";
import { Button, Card, Section } from "@/components/ui";
import { Calendar } from "@/components/calendar/Calendar";

const priceRows = (site: Awaited<ReturnType<typeof getSite>>) => [
  { label: "Lunes a jueves", value: site.prices.weekdays },
  { label: "Viernes a domingo", value: site.prices.weekend },
  { label: "Feriados y fines de semana largos", value: site.prices.holidays },
];

const conditions = (site: Awaited<ReturnType<typeof getSite>>) => [
  { label: "Seña", value: `${site.depositPercent}% del total` },
  { label: "Ingreso", value: `desde las ${site.checkIn}` },
  { label: "Salida", value: `hasta las ${site.checkOut}` },
  { label: "Estadía mínima", value: `${site.minNights} noches` },
  { label: "Capacidad", value: `hasta ${site.maxGuests} personas` },
];

export async function Disponibilidad() {
  const [occupied, site] = await Promise.all([getOccupiedRanges(), getSite()]);
  return (
    <Section tone="cream" id="precios" labelledBy="titulo-precios">
      <div className="reveal mb-12 max-w-2xl">
        <p className="eyebrow mb-3">Antes de reservar</p>
        <h2 id="titulo-precios" className="t-h2">
          Disponibilidad y <em>precios</em>
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="reveal">
          <Calendar occupied={occupied} size="md" />
        </Card>

        <Card className="reveal flex flex-col gap-6">
          <h3 className="t-h3">Precio por <em>noche</em></h3>
          <dl className="flex flex-col divide-y divide-line">
            {priceRows(site).map((r) => (
              <div key={r.label} className="flex items-baseline justify-between gap-4 py-3">
                <dt className="text-xl">{r.label}</dt>
                <dd className="text-right font-display text-2xl font-semibold">{r.value}</dd>
              </div>
            ))}
          </dl>
          <dl className="flex flex-col gap-2 rounded-2xl bg-sage p-5 text-xl">
            {conditions(site).map((c) => (
              <div key={c.label} className="flex justify-between gap-4">
                <dt className="text-muted">{c.label}</dt>
                <dd className="text-right font-bold">{c.value}</dd>
              </div>
            ))}
          </dl>
          <Button href="/reservar" size="lg">
            Reservar estas fechas
          </Button>
        </Card>
      </div>
    </Section>
  );
}
