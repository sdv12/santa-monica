import { Logo, ContactActions, Button } from "@/components/ui";

export const metadata = { title: "Página no encontrada" };

export default function NotFound() {
  return (
    <main id="contenido" className="flex min-h-screen flex-col items-center justify-center gap-6 px-5 py-12 text-center">
      <Logo />
      <p className="eyebrow">Error 404</p>
      <h1 className="t-h2">
        Esta página <em>no existe</em>
      </h1>
      <p className="t-lead max-w-xl">Quizás el link está mal escrito o la página se movió. Podés volver al inicio o escribirnos.</p>
      <Button href="/">Volver al inicio</Button>
      <ContactActions />
    </main>
  );
}
