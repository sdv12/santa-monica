import { Check } from "lucide-react";
import { getSite } from "@/lib/get-site";
import { ArcFrame, Section } from "@/components/ui";
import { BarraReserva } from "./BarraReserva";

export async function Hero() {
  const site = await getSite();
  const checks = ["Sin registrarte", "Confirmación por WhatsApp", `Seña del ${site.depositPercent}%`];
  return (
    <Section tone="cream" labelledBy="titulo-hero" className="!pb-12 !pt-10 lg:!pt-16">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <p className="eyebrow">Casa de campo · {site.locality}</p>
          <h1 id="titulo-hero" className="t-h1">
            Un lugar para <em>quedarse</em> un rato.
          </h1>
          <p className="t-lead max-w-xl">{site.description}</p>
          <ul className="mt-2 flex flex-col gap-3">
            {checks.map((c) => (
              <li key={c} className="flex items-center gap-3 text-xl font-bold">
                <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-deep text-olive">
                  <Check size={22} strokeWidth={2.2} />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <ArcFrame className="aspect-[4/5] w-full" />
          <div className="absolute -bottom-6 -left-2 flex h-36 w-36 flex-col items-center justify-center rounded-full bg-ochre p-3 text-center text-ink sm:-left-10 sm:h-40 sm:w-40">
            <span className="text-base font-bold">Desde</span>
            <span className="font-display text-2xl font-semibold leading-tight sm:text-3xl">{site.pricePerNight}</span>
            <span className="text-base font-bold">la noche</span>
          </div>
        </div>
      </div>

      <div className="mt-16 lg:mt-20">
        <BarraReserva />
      </div>
    </Section>
  );
}
