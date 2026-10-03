import type { Metadata } from "next";
import { LogOut } from "lucide-react";
import { getSite } from "@/lib/get-site";
import { requireAdmin } from "@/lib/auth";
import { listBookings } from "@/lib/admin-data";
import { logout } from "@/app/admin/actions";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata: Metadata = { title: { default: "Administración", template: "%s · Administración" }, robots: { index: false } };

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const [site, bookings] = await Promise.all([getSite(), listBookings()]);
  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const linkClass = "inline-flex min-h-12 items-center gap-2 rounded-full px-4 text-lg font-bold underline-offset-4 hover:underline";

  return (
    <>
      <header className="bg-olive px-5 py-3 text-white sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3">
          <p className="flex flex-wrap items-center gap-3 font-display text-2xl font-semibold">
            {site.hosts}
            <span className="rounded-full border-2 border-white/60 px-3 py-0.5 font-sans text-base font-bold uppercase tracking-[0.14em]">Administración</span>
          </p>
          <div className="flex items-center gap-2">
            <a href="/" className={linkClass}>
              Ver la página
            </a>
            <form action={logout}>
              <button type="submit" className={linkClass}>
                <LogOut size={22} strokeWidth={1.7} aria-hidden /> Salir
              </button>
            </form>
          </div>
        </div>
      </header>
      <main id="contenido" className="px-5 pb-20 pt-8 sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8">
          <AdminNav pendingCount={pendingCount} />
          {children}
        </div>
      </main>
    </>
  );
}
