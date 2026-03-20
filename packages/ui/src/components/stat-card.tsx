import { cn } from "../lib";

interface StatCardProps {
  label: string;
  value: string;
  accent?: string;
  className?: string;
  helper?: string;
}

export function StatCard({
  label,
  value,
  accent = "text-cyan-300",
  className,
  helper,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5",
        className,
      )}
    >
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{label}</p>
      <div className={cn("mt-3 text-3xl font-semibold tracking-tight", accent)}>{value}</div>
      {helper ? <p className="mt-2 text-sm text-slate-400">{helper}</p> : null}
    </div>
  );
}
