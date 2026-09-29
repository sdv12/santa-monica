import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Logo, Card } from "@/components/ui";
import { getAdmin, devAuthEnabled } from "@/lib/auth";
import { hasSupabase } from "@/lib/data";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Ingresar", robots: { index: false } };

export default async function LoginPage() {
  if (await getAdmin()) redirect("/admin");
  return (
    <main id="contenido" className="flex min-h-screen flex-col items-center justify-center gap-8 px-5 py-12">
      <Logo />
      <Card className="w-full max-w-lg">
        <h1 className="t-h3 mb-2">
          Acceso <em>administrador</em>
        </h1>
        <p className="mb-6 text-xl text-muted">Ingresá con tu email y tu contraseña.</p>
        {!hasSupabase && (
          <p className="mb-6 rounded-2xl bg-pending-bg p-4 text-lg font-bold">
            {devAuthEnabled
              ? "Modo de prueba (sin Supabase): entrá con cualquier email y la contraseña demo."
              : "El panel todavía no está conectado: falta configurar Supabase."}
          </p>
        )}
        <LoginForm />
      </Card>
      <a href="/" className="text-xl font-bold text-olive underline underline-offset-4">
        Volver a la página
      </a>
    </main>
  );
}
