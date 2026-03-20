"use client";

import { cn, StatusPill } from "@satelite-guard/ui";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { adminNavigation } from "@/lib/constants";
import { useAuth } from "../auth/auth-provider";

export function AppShell({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();

  return (
    <div className="relative min-h-screen">
      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 gap-6 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6">
        <aside className="panel-sheen rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.94),rgba(8,15,33,0.82))] p-6 shadow-[0_32px_120px_rgba(2,8,23,0.5)]">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-[20px] border border-cyan-400/30 bg-cyan-400/10 text-2xl">
              🛰️
            </div>
            <div>
              <p className="font-display text-lg font-semibold tracking-[0.18em] text-white">
                SATELITE GUARD
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.26em] text-cyan-300/80">
                Control Center
              </p>
            </div>
          </div>

          <div className="mt-10 space-y-2">
            {adminNavigation.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium",
                    active
                      ? "border-cyan-400/30 bg-cyan-400/10 text-white shadow-[0_16px_32px_rgba(14,165,233,0.12)]"
                      : "border-transparent bg-white/[0.02] text-slate-300 hover:border-white/10 hover:bg-white/[0.05] hover:text-white",
                  )}
                >
                  <span>{item.label}</span>
                  {active ? <span className="h-2 w-2 rounded-full bg-cyan-300" /> : null}
                </Link>
              );
            })}
          </div>

          <div className="mt-10 rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Operador activo</p>
            <p className="mt-3 text-lg font-semibold text-white">{user?.name}</p>
            <div className="mt-3 flex items-center justify-between">
              <StatusPill label={user?.role ?? "operator"} tone="online" />
              <button
                className="text-sm text-slate-300 hover:text-white"
                onClick={() => {
                  logout();
                  router.replace("/login");
                }}
                type="button"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </aside>

        <main className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(2,6,23,0.88),rgba(7,11,32,0.94))] p-5 shadow-[0_24px_120px_rgba(2,8,23,0.45)] md:p-8">
          <header className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/85">
                Satelite Guard
              </p>
              <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {title}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
                {subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <StatusPill label="Mock live engine" tone="online" />
              <StatusPill label="IOPGPS ready" tone="warning" />
            </div>
          </header>

          <div className="scrollbar-thin space-y-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
