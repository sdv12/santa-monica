"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui";

/** Confirmación con texto claro. Usa <dialog>: el foco queda dentro y Esc lo cierra. */
export function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel,
  cancelLabel = "No, volver",
  busy,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onCancel={(e) => {
        e.preventDefault();
        onCancel();
      }}
      aria-labelledby="confirm-title"
      className="m-auto w-[min(92vw,34rem)] rounded-card border border-line bg-paper p-6 text-ink shadow-soft backdrop:bg-ink/50 sm:p-8"
    >
      <h2 id="confirm-title" className="t-h3 mb-3">
        {title}
      </h2>
      <div className="mb-8 text-xl text-muted">{children}</div>
      <div className="flex flex-col gap-3 sm:flex-row-reverse">
        <Button variant="terra" onClick={onConfirm} disabled={busy} className="sm:flex-1">
          {busy ? "Un momento…" : confirmLabel}
        </Button>
        <Button variant="outline" onClick={onCancel} disabled={busy} className="sm:flex-1">
          {cancelLabel}
        </Button>
      </div>
    </dialog>
  );
}
