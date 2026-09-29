import { AdSlot, Section } from "@/components/ui";
import { ads } from "../../../config/ads";

/** Espacio de publicidad de la landing, entre "Cómo llegar" y el pie. Si no hay anuncios, no se muestra. */
export function Publicidad() {
  if (ads.length === 0) return null;
  return (
    <Section tone="sage" labelledBy="titulo-publicidad">
      <h2 id="titulo-publicidad" className="sr-only">
        Publicidad
      </h2>
      <div className={ads.length > 1 ? "grid gap-6 sm:grid-cols-2" : "mx-auto max-w-xl"}>
        {ads.map((ad) => (
          <AdSlot key={ad.href} ad={ad} />
        ))}
      </div>
    </Section>
  );
}
