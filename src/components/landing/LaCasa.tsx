import { Bath, BedDouble, Car, Flame, Thermometer, Trees, Waves, Wifi, type LucideIcon } from "lucide-react";
import { getSite } from "@/lib/get-site";
import { ArcFrame, Section } from "@/components/ui";

const icons: Record<string, LucideIcon> = {
  bed: BedDouble,
  bath: Bath,
  waves: Waves,
  flame: Flame,
  trees: Trees,
  wifi: Wifi,
  thermometer: Thermometer,
  car: Car,
};

export async function LaCasa() {
  const site = await getSite();
  return (
    <Section tone="paper" id="la-casa" labelledBy="titulo-casa">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="reveal flex flex-col gap-4 sm:gap-6">
          <p className="eyebrow">La casa</p>
          <h2 id="titulo-casa" className="t-h2">
            Todo lo que hace falta para <em>descansar</em>
          </h2>
          <p className="t-lead">{site.description}</p>
          <ul className="mt-1 grid gap-x-6 gap-y-3 sm:mt-2 sm:grid-cols-2 sm:gap-y-5">
            {site.amenities.map((a) => {
              const Icon = icons[a.icon];
              return (
                <li key={a.label} className="flex items-center gap-4 text-xl font-bold">
                  <span aria-hidden className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sage text-olive">
                    <Icon size={28} strokeWidth={1.7} />
                  </span>
                  {a.label}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="reveal mx-auto w-full max-w-md">
          <ArcFrame src="/casa/casa-exterior.jpg" alt="Frente de la casa al atardecer, con la pileta y el jardín" className="aspect-[4/5] w-full" />
        </div>
      </div>
    </Section>
  );
}
