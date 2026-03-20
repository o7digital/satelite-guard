"use client";

import type { Alert, DeviceSummary } from "@satelite-guard/types";
import { GlassCard, SectionHeading, StatusPill } from "@satelite-guard/ui";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { useAuth } from "@/components/auth/auth-provider";
import { getAlerts, getDevices } from "@/lib/api-client";
import { formatDateTime } from "@/lib/formatters";
import { useRealtimeFeed } from "@/hooks/use-realtime-feed";

export default function AlertsPage() {
  const { token } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [devices, setDevices] = useState<DeviceSummary[]>([]);

  useEffect(() => {
    async function loadAlerts() {
      if (!token) {
        return;
      }

      const [nextAlerts, nextDevices] = await Promise.all([getAlerts(token), getDevices(token)]);
      setAlerts(nextAlerts);
      setDevices(nextDevices);
    }

    void loadAlerts();
  }, [token]);

  useRealtimeFeed({
    enabled: Boolean(token),
    onAlertNew: ({ alert }) => {
      setAlerts((current) => [alert, ...current]);
    },
  });

  const devicesById = useMemo(
    () => Object.fromEntries(devices.map((device) => [device.id, device])),
    [devices],
  );

  return (
    <AppShell
      title="Alerts"
      subtitle="Feed priorizado de eventos críticos, operativos y de seguridad con trazabilidad por dispositivo."
    >
      <GlassCard className="p-6">
        <SectionHeading
          eyebrow="Event stream"
          title="Alert queue"
          description="Monitorea alertas nuevas por WebSocket y revisa las históricas desde la misma vista."
        />

        <div className="mt-6 space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-lg font-semibold text-white">{alert.message}</p>
                    <StatusPill
                      label={alert.severity}
                      tone={alert.severity === "critical" ? "critical" : "warning"}
                    />
                  </div>
                  <p className="mt-2 text-sm text-slate-400">
                    {devicesById[alert.deviceId]?.name ?? alert.deviceId} · {alert.type}
                  </p>
                </div>
                <div className="text-sm text-slate-400">{formatDateTime(alert.createdAt)}</div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </AppShell>
  );
}
