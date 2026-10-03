import { ArcFrame, Section } from "@/components/ui";
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
        <p className="t-lead mt-2">Ideas para el rato libre, cerca de la casa.</p>
      </div>
      <ul className="reveal flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible">
        {localGuide.map((g) => (
          <li key={g.title} className="flex w-[70vw] shrink-0 flex-col gap-2 sm:w-auto sm:gap-4">
            <ArcFrame variant="rect" className="aspect-[3/2] sm:aspect-[4/3]" />
            <div>
              <p className="font-display text-xl font-semibold">{g.title}</p>
              <p className="text-lg text-muted">{g.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
