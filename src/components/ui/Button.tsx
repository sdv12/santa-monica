import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "terra" | "outline" | "light";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-olive text-white border-2 border-olive hover:bg-[#28331f]",
  terra: "bg-terra text-white border-2 border-terra hover:bg-[#833519]",
  outline: "bg-transparent text-olive border-2 border-olive hover:bg-sage",
  light: "bg-paper text-olive border-2 border-paper hover:bg-white",
};

const sizes: Record<Size, string> = {
  md: "min-h-[60px] px-8 text-xl",
  lg: "min-h-[72px] px-10 text-2xl",
};

type Common = {
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

type AsButton = Common & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof Common> & { href?: undefined };
type AsLink = Common & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof Common> & { href: string };

export function Button(props: AsButton | AsLink) {
  const { variant = "primary", size = "md", icon, className, children, ...rest } = props;
  const classes = cn(
    "inline-flex items-center justify-center gap-3 rounded-full font-bold leading-tight text-center transition-colors",
    "disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchor } = rest as AsLink;
    const internal = href.startsWith("/") || href.startsWith("#");
    return internal ? (
      <Link href={href} className={classes} {...anchor}>
        {content}
      </Link>
    ) : (
      <a href={href} className={classes} {...anchor}>
        {content}
      </a>
    );
  }
  const { type = "button", ...button } = rest as AsButton;
  return (
    <button type={type} className={classes} {...button}>
      {content}
    </button>
  );
}
