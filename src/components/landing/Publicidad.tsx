import { AdSlot, Section } from "@/components/ui";
import { ads } from "../../../config/ads";

/** Espacio de publicidad de la landing, entre "Cómo llegar" y el pie. Si no hay anuncios, no se muestra. */
export function Publicidad() {
  const ad = ads[0];
  if (!ad) return null;
  return (
    <Section tone="paper" labelledBy="titulo-publicidad">
      <h2 id="titulo-publicidad" className="sr-only">
        Publicidad
      </h2>
      <AdSlot ad={ad} />
    </Section>
  );
}
