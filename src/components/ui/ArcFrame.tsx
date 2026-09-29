import { cn } from "@/lib/cn";

/** Marco en arco para fotos. Sin children muestra una ilustración provisoria hasta tener la foto real. */
export function ArcFrame({
  children,
  className,
  variant = "arc",
}: {
  children?: React.ReactNode;
  className?: string;
  variant?: "arc" | "rect";
}) {
  return (
    <div className={cn("relative overflow-hidden bg-sage-deep", variant === "arc" ? "arc" : "rounded-card", className)}>
      {children ?? <PhotoPlaceholder />}
    </div>
  );
}

export function PhotoPlaceholder() {
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" role="img" aria-label="Ilustración provisoria: la foto de la casa va acá">
      <rect width="400" height="500" fill="#C9D3B0" />
      <circle cx="290" cy="140" r="46" fill="#EBD3C1" />
      <path d="M0 340c60-50 120-60 200-30s140 20 200-20v210H0Z" fill="#B5C19A" />
      <path d="M0 400c80-40 160-30 240 0s110 10 160-10v110H0Z" fill="#33402F" opacity=".9" />
      <path d="M130 400v-92l70-52 70 52v92Z" fill="#FBF8F2" />
      <path d="M118 312l82-62 82 62" stroke="#9A3F24" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M182 400v-46c0-10 8-18 18-18s18 8 18 18v46Z" fill="#9A3F24" />
    </svg>
  );
}
