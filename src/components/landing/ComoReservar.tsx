import { getSite } from "@/lib/get-site";
import { ArcBadge, Card, ContactActions, Section } from "@/components/ui";

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

      <ol className="grid gap-4 sm:gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <Card as="li" key={s.title} className="reveal flex flex-col gap-3 sm:gap-5">
            <ArcBadge n={i + 1} />
            <h3 className="t-h3">{s.title}</h3>
            <p className="text-xl text-muted">{s.text}</p>
          </Card>
        ))}
      </ol>

      <div className="reveal mt-6 flex flex-col gap-4 rounded-card bg-paper p-5 sm:mt-8 sm:gap-5 sm:p-8 lg:mt-10 lg:flex-row lg:items-center lg:justify-between">
        <p className="font-display text-2xl font-semibold sm:text-3xl">
          ¿Preferís hacerlo por teléfono? Llamanos al {site.phone} y te ayudamos.
        </p>
        <ContactActions />
      </div>
    </Section>
  );
}
