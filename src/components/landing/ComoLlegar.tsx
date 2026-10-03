import { Clock, MapPin } from "lucide-react";
import { getSite } from "@/lib/get-site";
import { ContactActions, Section } from "@/components/ui";

export async function ComoLlegar() {
  const site = await getSite();
  return (
    <Section tone="blush" id="como-llegar" labelledBy="titulo-llegar">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="reveal flex flex-col gap-3 sm:gap-6">
          <p className="eyebrow">Ubicación</p>
          <h2 id="titulo-llegar" className="t-h2">
            Cómo <em>llegar</em>
          </h2>
          <p className="flex items-start gap-3 text-2xl font-bold">
            <MapPin size={30} strokeWidth={1.7} aria-hidden className="mt-1 shrink-0 text-terra" />
            {site.address}
          </p>
          <p className="flex items-start gap-3 text-xl">
            <Clock size={30} strokeWidth={1.7} aria-hidden className="mt-0.5 shrink-0 text-terra" />
            <span>
              Ingreso desde las <b>{site.checkIn}</b> · Salida hasta las <b>{site.checkOut}</b>
            </span>
          </p>
          <p className="text-xl text-ink/80">Te recibimos nosotros: {site.hosts}.</p>
          <p className="text-xl text-ink/80">¿Te perdés o tenés dudas para llegar? Escribinos o llamanos y te guiamos.</p>
          <ContactActions />
        </div>

        <div className="reveal overflow-hidden rounded-card border border-line bg-paper">
          {site.mapEmbedUrl ? (
            <iframe title={`Mapa: ${site.address}`} src={site.mapEmbedUrl} loading="lazy" className="h-[260px] w-full border-0 sm:h-[360px] lg:h-full lg:min-h-[420px]" />
          ) : (
            <div className="flex h-[260px] flex-col items-center justify-center gap-3 p-8 text-center text-xl text-muted sm:h-[360px] lg:h-full lg:min-h-[420px]">
              <MapPin size={44} strokeWidth={1.7} aria-hidden />
              El mapa va acá (falta cargar <code>mapEmbedUrl</code> en config/site.ts).
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
