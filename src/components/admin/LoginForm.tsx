"use client";

import { useState, useTransition } from "react";
import { Button, ErrorMsg, Field } from "@/components/ui";
import { login } from "@/app/admin/actions";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        start(async () => {
          const res = await login(email, password); // si sale bien, redirige al panel
          if (res) setError(res.error);
        });
      }}
      className="flex flex-col gap-6"
    >
      <Field label="Email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
      <Field label="Contraseña" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Entrando…" : "Entrar"}
      </Button>
    </form>
  );
}
