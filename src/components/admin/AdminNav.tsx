"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";

const tabs = [
  { href: "/admin", label: "Reservas" },
  { href: "/admin/calendario", label: "Calendario" },
  { href: "/admin/precios", label: "Precios y datos" },
];

export function AdminNav({ pendingCount }: { pendingCount: number }) {
  const path = usePathname();
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <nav aria-label="Secciones del panel" className="flex flex-wrap gap-2">
        {tabs.map((t) => {
          const active = t.href === "/admin" ? path === "/admin" : path.startsWith(t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "inline-flex min-h-[60px] items-center gap-2 rounded-full border-2 px-6 text-xl font-bold",
                active ? "border-olive bg-olive text-white" : "border-line-strong bg-paper text-ink hover:bg-sage",
              )}
            >
              {t.label}
              {t.href === "/admin" && pendingCount > 0 && (
                <span className={cn("rounded-full px-3 py-0.5 text-base", active ? "bg-white text-olive" : "bg-terra text-white")}>
                  {pendingCount}
                  <span className="sr-only"> para responder</span>
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <Button href="/admin/nueva" variant="terra" size="lg" icon={<Plus size={28} strokeWidth={2} aria-hidden />}>
        Nueva reserva
      </Button>
    </div>
  );
}
