"use client";

import { useState, useTransition } from "react";
import { Check } from "lucide-react";
import { ErrorMsg } from "@/components/ui";
import type { ActionResult } from "@/app/admin/actions";

export type Feedback = { ok: boolean; text: string; field?: string } | null;

/** Ejecuta una acción del servidor y guarda el mensaje de resultado (siempre con texto, no solo color). */
export function useAction() {
  const [pending, start] = useTransition();
  const [feedback, setFeedback] = useState<Feedback>(null);
  const run = (fn: () => Promise<ActionResult>, onOk?: () => void) => {
    setFeedback(null);
    start(async () => {
      const r = await fn();
      setFeedback(r.ok ? { ok: true, text: r.message } : { ok: false, text: r.error, field: r.field });
      if (r.ok) onOk?.();
    });
  };
  return { pending, feedback, run, setFeedback };
}

export function FeedbackMsg({ feedback }: { feedback: Feedback }) {
  return (
    <div role="status" aria-live="polite">
      {feedback &&
        (feedback.ok ? (
          <p className="flex items-center gap-2 text-xl font-bold text-olive">
            <Check size={26} strokeWidth={2.2} aria-hidden />
            {feedback.text}
          </p>
        ) : (
          <ErrorMsg>{feedback.text}</ErrorMsg>
        ))}
    </div>
  );
}
