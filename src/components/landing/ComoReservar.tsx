import { getSite } from "@/lib/get-site";
import { ArcBadge, Card, ContactActions, HAccordion, Section } from "@/components/ui";

const steps = [
  { title: "Elegí las fechas", text: "Mirá el calendario y tocá el día de llegada y el de salida." },
  { title: "Dejá tus datos", text: "Solo tu nombre y tu teléfono. No hace falta crear una cuenta." },
  { title: "Recibí la confirmación", text: "Te escribimos por WhatsApp para coordinar la seña." },
];

export async function ComoReservar() {
  const site = await getSite();
  return (
    <Section tone="sage" id="como-reservar" labelledBy="titulo-reservar">
      <div className="reveal mb-6 max-w-2xl sm:mb-8 lg:mb-12">
        <p className="eyebrow mb-3">En tres pasos</p>
        <h2 id="titulo-reservar" className="t-h2">
          Cómo <em>reservar</em>
        </h2>
      </div>

      {/* Celular: acordeón horizontal (se despliega hacia la derecha) */}
      <div className="reveal sm:hidden">
        <HAccordion
          label="Pasos para reservar"
          items={steps.map((s, i) => ({
            id: s.title,
            short: String(i + 1),
            title: s.title,
            children: <p className="text-xl text-muted">{s.text}</p>,
          }))}
        />
      </div>

      {/* Tablet y escritorio: tres tarjetas */}
      <ol className="hidden gap-6 sm:grid md:grid-cols-3">
        {steps.map((s, i) => (
          <Card as="li" key={s.title} className="reveal flex flex-col gap-5">
            <ArcBadge n={i + 1} />
            <h3 className="t-h3">{s.title}</h3>
            <p className="text-xl text-muted">{s.text}</p>
          </Card>
        ))}
      </ol>

      <div className="reveal mt-6 flex flex-col gap-4 rounded-card bg-paper p-5 sm:mt-8 sm:gap-5 sm:p-7 lg:mt-10 lg:flex-row lg:items-center lg:justify-between">
        <p className="font-display text-xl font-semibold sm:text-2xl">
          ¿Preferís hacerlo por teléfono? Llamanos al {site.phone} y te ayudamos.
        </p>
        <ContactActions />
      </div>
    </Section>
  );
}
