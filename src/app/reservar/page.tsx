import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui";
import { getEvents, getOccupiedRanges, getSettings } from "@/lib/data";
import { getUpcomingHolidays } from "@/lib/holidays";
import { mergeCalendarDays } from "@/lib/calendar-days";
import { todayISO } from "@/lib/dates";
import { AyudaFija } from "@/components/reserva/AyudaFija";
import { ReservaFlow } from "./ReservaFlow";

export const metadata: Metadata = { title: "Reservar" };
export const dynamic = "force-dynamic";

type Params = Promise<Record<string, string | string[] | undefined>>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function ReservarPage({ searchParams }: { searchParams: Params }) {
  const params = await searchParams;
  const today = todayISO();
  const [occupied, settings, events, holidays] = await Promise.all([getOccupiedRanges(), getSettings(), getEvents(), getUpcomingHolidays(today)]);
  const days = mergeCalendarDays(holidays, events);
  return (
    <>
      <header className="px-5 py-4 sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">
          <Logo />
          <a href="/" className="inline-flex min-h-12 items-center gap-2 rounded-full px-4 text-lg font-bold text-olive underline underline-offset-4">
            <ArrowLeft size={22} strokeWidth={1.7} aria-hidden /> Volver al inicio
          </a>
        </div>
      </header>
      <main id="contenido" className="px-5 pb-40 pt-4 sm:px-10 lg:px-20">
        <ReservaFlow
          occupied={occupied}
          settings={settings}
          days={days}
          initial={{ llegada: first(params.llegada), salida: first(params.salida), personas: Number(first(params.personas)) || 2 }}
        />
      </main>
      <AyudaFija />
    </>
  );
}
