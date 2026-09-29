# Casa de campo

Landing + reservas + panel de administración. Next.js (App Router) · Tailwind 4 · Supabase.

## Correr en local
```bash
npm install
npm run dev
```
Sin Supabase configurado funciona en **modo de prueba**: las reservas se guardan en `.data/dev.json` y el panel (`/admin`) acepta cualquier email con la contraseña `demo`. Ese modo se apaga solo en producción.

## Editar textos y datos
Todo lo que está entre `[corchetes]` vive en `config/site.ts`. Precios, seña, horarios, teléfono, WhatsApp y descripción los edita el admin desde **Precios y datos** (tabla `settings`) y pisan a los de `config/site.ts`.

## Conectar Supabase
1. Creá un proyecto en supabase.com y pegá `supabase/schema.sql` en el SQL Editor.
2. En **Authentication → Providers → Email**, desactivá **"Allow new users to sign up"** (cualquier usuario autenticado es administrador).
3. En **Authentication → Users**, creá el usuario administrador (email + contraseña).
4. Copiá `.env.example` a `.env.local` y completá la URL y la clave *anon* (Project Settings → API).
5. Reiniciá `npm run dev`.

## Avisos al administrador
`src/lib/notify.ts` es el hook que se llama al llegar un pedido nuevo. Falta conectar el proveedor (WhatsApp, email).
