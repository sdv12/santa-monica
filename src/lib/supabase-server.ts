import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseAnon, supabaseUrl } from "./data";

/** Cliente de Supabase con la sesión del administrador (cookies). null si no hay Supabase configurado. */
export async function supabaseServer() {
  if (!supabaseUrl || !supabaseAnon) return null;
  const store = await cookies();
  return createServerClient(supabaseUrl, supabaseAnon, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try {
          for (const { name, value, options } of list) store.set(name, value, options);
        } catch {
          // Desde un Server Component no se pueden escribir cookies: proxy.ts refresca la sesión.
        }
      },
    },
  });
}
