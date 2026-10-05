import { Section } from "@/components/ui";
import { localGuide } from "../../../config/local-guide";

export function GuiaLocal() {
  if (localGuide.length === 0) return null;
  return (
    <Section tone="paper" labelledBy="titulo-guia">
      <div className="reveal mb-6 max-w-2xl sm:mb-8 lg:mb-10">
        <p className="eyebrow mb-3">Para el resto del día</p>
        <h2 id="titulo-guia" className="t-h2">
          Disfrutá <em>Córdoba</em>
        </h2>
        <p className="t-lead mt-2">Trekkings, fiestas, dónde comer y cómo moverse, cerca de la casa.</p>
      </div>

      <div className="reveal grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {localGuide.map((g) => (
          <section key={g.title} aria-labelledby={`guia-${g.title}`} className="flex flex-col gap-3 rounded-card border border-line bg-cream p-5 sm:p-6">
            <h3 id={`guia-${g.title}`} className="font-display text-2xl font-semibold">
              {g.title}
            </h3>
            <ul className="flex flex-col divide-y divide-line">
              {g.items.map((it) => (
                <li key={it.name} className="py-3">
                  <p className="text-lg font-bold">{it.name}</p>
                  <p className="text-base text-muted">{it.detail}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Section>
  );
}
