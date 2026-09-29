"use client";

import { createContext, useContext } from "react";
import type { SiteConfig } from "../../config/site";

const SiteContext = createContext<SiteConfig | null>(null);

/** Datos de la casa ya combinados (config + ajustes del admin), para los componentes de cliente. */
export function SiteProvider({ value, children }: { value: SiteConfig; children: React.ReactNode }) {
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteConfig {
  const v = useContext(SiteContext);
  if (!v) throw new Error("useSite se usa dentro de <SiteProvider>");
  return v;
}
