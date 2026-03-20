import { cn } from "../lib";

type Tone = "online" | "offline" | "idle" | "critical" | "warning" | "neutral";

const toneMap: Record<Tone, string> = {
  online: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/20",
  offline: "bg-rose-500/15 text-rose-300 ring-rose-400/20",
  idle: "bg-amber-500/15 text-amber-200 ring-amber-400/20",
  critical: "bg-rose-500/15 text-rose-300 ring-rose-400/20",
  warning: "bg-amber-500/15 text-amber-200 ring-amber-400/20",
  neutral: "bg-white/10 text-slate-200 ring-white/10",
};

interface StatusPillProps {
  label: string;
  tone?: Tone;
  className?: string;
}

export function StatusPill({
  label,
  tone = "neutral",
  className,
}: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1",
        toneMap[tone],
        className,
      )}
    >
      {label}
    </span>
  );
}
