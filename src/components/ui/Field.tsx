import { useId } from "react";
import { cn } from "@/lib/cn";
import { ErrorMsg } from "./ErrorMsg";

type Shared = {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  className?: string;
};

const base =
  "w-full border-2 bg-white text-xl text-ink placeholder:text-muted/70 " +
  "border-line-strong focus:border-olive aria-[invalid=true]:border-error";

function Shell({
  id,
  label,
  hint,
  error,
  optional,
  className,
  children,
}: Shared & { id: string; children: React.ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-xl font-bold text-ink">
        {label}
        {optional && <span className="ml-2 font-normal text-muted">(opcional)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-base text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && <ErrorMsg id={`${id}-error`}>{error}</ErrorMsg>}
    </div>
  );
}

function describedBy(id: string, hint?: string, error?: string) {
  return [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
}

export function Field({
  label,
  hint,
  error,
  optional,
  className,
  ...input
}: Shared & Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof Shared>) {
  const id = useId();
  return (
    <Shell {...{ id, label, hint, error, optional, className }}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(base, "min-h-[60px] rounded-full px-6")}
        {...input}
      />
    </Shell>
  );
}

export function TextArea({
  label,
  hint,
  error,
  optional,
  className,
  ...area
}: Shared & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, keyof Shared>) {
  const id = useId();
  return (
    <Shell {...{ id, label, hint, error, optional, className }}>
      <textarea
        id={id}
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(base, "rounded-[28px] px-6 py-4")}
        {...area}
      />
    </Shell>
  );
}
