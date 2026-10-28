"use client";

import { useEffect } from "react";

/**
 * Registra el service worker mínimo (public/sw.js) para que Android ofrezca "Instalar app".
 * El service worker no guarda nada en caché: nunca muestra disponibilidad o precios viejos.
 */
export function InstallSW() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Si falla (navegador viejo, modo privado, etc.), el sitio sigue funcionando igual.
      });
    }
  }, []);
  return null;
}
