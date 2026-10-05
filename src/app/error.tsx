"use client";

import { useEffect } from "react";
import { Logo, Button, ContactActions } from "@/components/ui";

/** Error inesperado: mensaje en lenguaje simple y una salida clara (reintentar o llamar). */
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="contenido" className="flex min-h-screen flex-col items-center justify-center gap-6 px-5 py-12 text-center">
      <Logo />
      <p className="eyebrow">Algo salió mal</p>
      <h1 className="t-h2">
        No pudimos <em>cargar</em> la página
      </h1>
      <p className="t-lead max-w-xl">Puede ser un problema de conexión. Probá de nuevo en un momento, o llamanos y te ayudamos.</p>
      <Button onClick={reset}>Intentar de nuevo</Button>
      <ContactActions />
    </main>
  );
}
