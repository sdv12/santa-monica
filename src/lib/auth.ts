import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { hasSupabase } from "./data";
import { supabaseServer } from "./supabase-server";

/** Solo para desarrollo, sin Supabase: entrar con cualquier email y la clave "demo". Nunca en producción. */
export const DEV_COOKIE = "dev_admin";
export const devAuthEnabled = !hasSupabase && process.env.NODE_ENV !== "production";
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
