"use client";

import { useState } from "react";
import { Button, Field, TextArea } from "@/components/ui";
import { crearEvento } from "@/app/admin/actions";
import { FeedbackMsg, useAction } from "./useAction";

/** Alta de un evento local (fiesta, feria, etc.). Los feriados nacionales se traen solos de una API. */
export function EventForm() {
  const [fecha, setFecha] = useState("");
  const [nombre, setNombre] = useState("");
  const [texto, setTexto] = useState("");
  const { pending, feedback, run, setFeedback } = useAction();
  const fieldError = (name: string) => (feedback && !feedback.ok && feedback.field === name ? feedback.text : undefined);

  const submit = () =>
    run(
      () => crearEvento(fecha, nombre, texto),
      () => {
        setFecha("");
        setNombre("");
        setTexto("");
      },
    );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="flex flex-col gap-4 rounded-card border border-line bg-paper p-5"
    >
      <p className="text-xl font-bold">Agregar un evento</p>
      <Field
        label="Fecha"
        type="date"
        value={fecha}
        onChange={(e) => {
          setFecha(e.target.value);
          setFeedback(null);
        }}
        error={fieldError("fecha")}
      />
      <Field
        label="Nombre"
        placeholder="Ej.: Oktoberfest en Villa General Belgrano"
        value={nombre}
        onChange={(e) => {
          setNombre(e.target.value);
          setFeedback(null);
        }}
        error={fieldError("nombre")}
      />
      <TextArea label="Texto para el aviso" optional hint="Lo que ve el visitante al tocar el evento." value={texto} onChange={(e) => setTexto(e.target.value)} />
      {feedback && !feedback.field && <FeedbackMsg feedback={feedback} />}
      <Button type="submit" disabled={pending || !fecha || !nombre}>
        {pending ? "Guardando…" : "Agregar evento"}
      </Button>
    </form>
  );
}
