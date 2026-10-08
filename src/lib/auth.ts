import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { hasSupabase } from "./data";
import { supabaseServer } from "./supabase-server";

/**
 * Login de prueba, sin Supabase: entrar con cualquier email y la clave "demo".
 * Activo en desarrollo siempre; en producción solo si se prende a propósito con la variable de
 * entorno ALLOW_DEMO_ADMIN=1 (para poder probar el panel en un sitio de demostración). Sacar esa
 * variable (o no cargarla) en el sitio real.
 */
export const DEV_COOKIE = "dev_admin";
export const devAuthEnabled = !hasSupabase && (process.env.NODE_ENV !== "production" || process.env.ALLOW_DEMO_ADMIN === "1");
export const DEV_PASSWORD = "demo";

export type AdminUser = { email: string };

export async function getAdmin(): Promise<AdminUser | null> {
  if (hasSupabase) {
    const db = await supabaseServer();
    const { data } = (await db?.auth.getUser()) ?? { data: { user: null } };
    return data.user ? { email: data.user.email ?? "" } : null;
  }
  if (devAuthEnabled) {
    const store = await cookies();
    return store.get(DEV_COOKIE)?.value === "1" ? { email: "demo@local" } : null;
  }
  return null;
}

/** Cortar el paso si no hay administrador: se usa en el panel y en cada acción. */
export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}
