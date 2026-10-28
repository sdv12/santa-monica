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
      <ul className="reveal mx-auto mt-6 grid max-w-4xl grid-cols-2 gap-x-4 gap-y-4 sm:mt-10 sm:gap-x-6 sm:gap-y-5 lg:grid-cols-3">
        {site.amenities.map((a) => {
          const Icon = icons[a.icon];
          return (
            <li key={a.label} className="flex items-start gap-3 sm:gap-4">
              <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage text-olive sm:h-14 sm:w-14">
                <Icon size={22} strokeWidth={1.7} className="sm:hidden" />
                <Icon size={28} strokeWidth={1.7} className="hidden sm:block" />
              </span>
              <span className="flex flex-col pt-1 sm:pt-3">
                <span className="text-lg font-bold sm:text-xl">{a.label}</span>
                {a.detail && <span className="text-sm text-muted sm:text-base">{a.detail}</span>}
              </span>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
