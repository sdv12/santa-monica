import { cn } from "@/lib/cn";

export function Card({ children, className, as: Tag = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "article" | "section" | "li" }) {
  return <Tag className={cn("rounded-card border border-line bg-paper p-5 sm:p-8", className)}>{children}</Tag>;
}
