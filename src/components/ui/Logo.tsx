import Link from "next/link";
import { site } from "../../../config/site";
import { cn } from "@/lib/cn";

export function ArchMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 44" className={cn("h-11 w-9", className)} aria-hidden fill="none">
      <path d="M2 42V18C2 8.6 9.2 2 18 2s16 6.6 16 16v24H2Z" fill="currentColor" />
      <path d="M11 42V21c0-4.4 3.1-7.5 7-7.5s7 3.1 7 7.5v21H11Z" fill="var(--logo-hole, var(--cream))" />
    </svg>
  );
}

export function Logo({ light, className }: { light?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name}, ir al inicio`}
      className={cn("inline-flex items-center gap-3 font-display text-2xl font-semibold", light ? "text-white [--logo-hole:var(--olive)]" : "text-olive", className)}
    >
      <ArchMark />
      <span>{site.name}</span>
    </Link>
  );
}
