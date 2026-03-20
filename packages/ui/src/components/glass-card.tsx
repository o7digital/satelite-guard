import type { ReactNode } from "react";
import { cn } from "../lib";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-white/10 bg-white/[0.04] shadow-[0_24px_80px_rgba(2,8,23,0.45)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
