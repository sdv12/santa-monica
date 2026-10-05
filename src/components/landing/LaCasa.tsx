import { Bath, BedDouble, Camera, Car, Flame, Shirt, Thermometer, Trees, Waves, WashingMachine, Wifi, type LucideIcon } from "lucide-react";
import { getSite } from "@/lib/get-site";
import { Section } from "@/components/ui";

const icons: Record<string, LucideIcon> = {
  bed: BedDouble,
  bath: Bath,
  waves: Waves,
  flame: Flame,
  trees: Trees,
  wifi: Wifi,
  thermometer: Thermometer,
  car: Car,
  camera: Camera,
  washer: WashingMachine,
  shirt: Shirt,
};

export async function LaCasa() {
  const site = await getSite();
  return (
    <Section tone="paper" id="la-casa" labelledBy="titulo-casa">
      <div className="reveal mx-auto flex max-w-3xl flex-col gap-4 text-center sm:gap-6">
        <p className="eyebrow">La casa</p>
        <h2 id="titulo-casa" className="t-h2">
          Todo lo que hace falta para <em>descansar</em>
        </h2>
        <p className="t-lead">{site.description}</p>
      </div>
      <ul className="reveal mx-auto mt-8 grid max-w-4xl gap-x-6 gap-y-3 sm:mt-10 sm:grid-cols-2 sm:gap-y-5 lg:grid-cols-3">
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
    </Section>
  );
}
