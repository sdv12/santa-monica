import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Filtro rápido para /admin: refresca la sesión de Supabase y manda al login a quien no entró.
 * La protección real está en el layout del panel y en cada Server Action (requireAdmin).
 */
export async function proxy(request: NextRequest) {
  const isLogin = request.nextUrl.pathname === "/admin/login";
  const toLogin = () => NextResponse.redirect(new URL("/admin/login", request.url));
  let response = NextResponse.next({ request });

  if (url && anon) {
    const supabase = createServerClient(url, anon, {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (list) => {
          for (const { name, value } of list) request.cookies.set(name, value);
          response = NextResponse.next({ request });
          for (const { name, value, options } of list) response.cookies.set(name, value, options);
        },
      },
    });
    const { data } = await supabase.auth.getUser();
    return !data.user && !isLogin ? toLogin() : response;
  }

  const demoAuth = process.env.NODE_ENV !== "production" || process.env.ALLOW_DEMO_ADMIN === "1";
  if (demoAuth && !isLogin && request.cookies.get("dev_admin")?.value !== "1") return toLogin();
  return response;
}

export const config = { matcher: ["/admin/:path*"] };
