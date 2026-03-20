"use client";

import type { HealthStatus, ProviderStatus } from "@satelite-guard/types";
import { GlassCard, SectionHeading, StatusPill } from "@satelite-guard/ui";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { useAuth } from "@/components/auth/auth-provider";
import { getHealth, getProviderStatuses } from "@/lib/api-client";
import { formatDateTime } from "@/lib/formatters";

export default function SettingsPage() {
  const { token } = useAuth();
  const [providers, setProviders] = useState<ProviderStatus[]>([]);
  const [health, setHealth] = useState<HealthStatus | null>(null);

  useEffect(() => {
    async function loadSettings() {
      if (!token) {
        return;
      }

      const [nextProviders, nextHealth] = await Promise.all([
        getProviderStatuses(token),
        getHealth(),
      ]);

      setProviders(nextProviders);
      setHealth(nextHealth);
    }

    void loadSettings();
  }, [token]);

  return (
    <AppShell
      title="Settings"
      subtitle="Estado del backend, modo de proveedor, healthcheck y variables esperadas para activar integraciones reales."
    >
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <GlassCard className="p-6">
          <SectionHeading
            eyebrow="Health"
            title="Platform status"
            description="Resumen operativo del backend NestJS y del namespace WebSocket."
          />
          {health ? (
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-slate-400">Service</p>
                <p className="mt-2 text-lg font-semibold text-white">{health.service}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-slate-400">Provider mode</p>
                <p className="mt-2 text-lg font-semibold text-white">{health.providerMode}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-slate-400">WebSocket clients</p>
                <p className="mt-2 text-lg font-semibold text-white">{health.websocketClients}</p>
              </div>
              <p className="text-sm text-slate-400">
                Última lectura: {formatDateTime(health.timestamp)}
              </p>
            </div>
          ) : null}
        </GlassCard>

        <GlassCard className="p-6">
          <SectionHeading
            eyebrow="Providers"
            title="Connector readiness"
            description="Mock mode activo para el MVP y capa iopgps aislada para integración posterior sin reescritura del dominio."
          />
          <div className="mt-6 space-y-3">
            {providers.map((provider) => (
              <div
                key={provider.name}
                className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-white">{provider.name}</p>
                    <p className="mt-2 text-sm text-slate-400">{provider.message}</p>
                  </div>
                  <StatusPill
                    label={provider.connected ? provider.mode : "standby"}
                    tone={provider.connected ? "online" : "warning"}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm font-semibold text-white">Variables esperadas</p>
            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              <div>`PORT`, `JWT_SECRET`, `GPS_PROVIDER`, `CORS_ORIGIN`</div>
              <div>`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_WS_URL`, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`, `NEXT_PUBLIC_GOOGLE_MAP_ID`</div>
              <div>`IOPGPS_BASE_URL`, `IOPGPS_USERNAME`, `IOPGPS_PASSWORD`, `IOPGPS_SECRET_KEY` para iopgps</div>
              <div>`SEED_SUPERADMIN_EMAIL`, `SEED_SUPERADMIN_PASSWORD`, `SEED_OPERATOR_EMAIL`, `SEED_OPERATOR_PASSWORD` para accesos seed</div>
            </div>
          </div>
        </GlassCard>
      </section>
    </AppShell>
  );
}
