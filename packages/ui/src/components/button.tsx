import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib";

const baseStyles =
  "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition duration-200";

const variantStyles = {
  primary:
    "bg-[linear-gradient(135deg,#0ea5e9,#2563eb)] text-white shadow-[0_18px_40px_rgba(37,99,235,0.35)] hover:-translate-y-0.5 hover:brightness-110",
  secondary:
    "border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10 hover:border-cyan-400/30",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles;
  children: ReactNode;
}

export function Button({
  className,
  children,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(baseStyles, variantStyles[variant], className)}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: keyof typeof variantStyles;
  children: ReactNode;
}

export function LinkButton({
  className,
  children,
  variant = "primary",
  ...props
}: LinkButtonProps) {
  return (
    <a className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {children}
    </a>
  );
}
