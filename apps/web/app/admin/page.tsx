"use client";

import type { Alert, DeviceSummary, Trip } from "@satelite-guard/types";
import { GlassCard, SectionHeading, StatCard, StatusPill } from "@satelite-guard/ui";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { GoogleFleetMap } from "@/components/maps/google-fleet-map";
import { useAuth } from "@/components/auth/auth-provider";
import { getAlerts, getDevices, getTrips } from "@/lib/api-client";
import { formatDateTime, formatRelativeTime, formatSpeed } from "@/lib/formatters";
import { useRealtimeFeed } from "@/hooks/use-realtime-feed";

export default function AdminDashboardPage() {
  const { token } = useAuth();
  const [devices, setDevices] = useState<DeviceSummary[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [focusedDeviceId, setFocusedDeviceId] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      if (!token) {
        return;
      }

      setLoading(true);
      const [nextDevices, nextAlerts, nextTrips] = await Promise.all([
        getDevices(token),
        getAlerts(token),
        getTrips(token),
      ]);

      setDevices(nextDevices);
      setAlerts(nextAlerts);
      setTrips(nextTrips);
      setFocusedDeviceId(nextDevices.find((device) => device.status === "online")?.id);
      setLoading(false);
    }

    void loadDashboard();
  }, [token]);

  useRealtimeFeed({
    enabled: Boolean(token),
    onPositionUpdate: ({ deviceId, position }) => {
      setDevices((current) =>
        current.map((device) =>
          device.id === deviceId ? { ...device, latestPosition: position } : device,
        ),
      );
    },
    onDeviceStatus: ({ deviceId, status, lastSeenAt }) => {
      setDevices((current) =>
        current.map((device) =>
          device.id === deviceId ? { ...device, status, lastSeenAt } : device,
        ),
      );
    },
    onAlertNew: ({ alert }) => {
      setAlerts((current) => [alert, ...current].slice(0, 10));
    },
  });

  const metrics = useMemo(() => {
    const online = devices.filter((device) => device.status === "online").length;
    const offline = devices.filter((device) => device.status === "offline").length;
    const activeAlerts = alerts.filter((alert) => !alert.acknowledgedAt).length;
    const tripsToday = trips.filter((trip) => {
      const now = new Date();
      const tripDate = new Date(trip.startAt);
      return tripDate.toDateString() === now.toDateString();
    }).length;

    return { online, offline, activeAlerts, tripsToday };
  }, [alerts, devices, trips]);

  const recentActivity = useMemo(
    () =>
      [...devices]
        .filter((device) => device.latestPosition)
        .sort(
          (left, right) =>
            new Date(right.latestPosition!.receivedAt).getTime() -
            new Date(left.latestPosition!.receivedAt).getTime(),
        )
        .slice(0, 5),
    [devices],
  );

  return (
    <AppShell
      title="Operational Dashboard"
      subtitle="Supervisa dispositivos activos, alertas críticas, actividad reciente y foco geoespacial en una sola consola premium."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Online devices" value={loading ? "..." : String(metrics.online)} />
        <StatCard
          label="Offline devices"
          value={loading ? "..." : String(metrics.offline)}
          accent="text-slate-200"
        />
        <StatCard
          label="Active alerts"
          value={loading ? "..." : String(metrics.activeAlerts)}
          accent="text-rose-300"
        />
        <StatCard
          label="Trips today"
          value={loading ? "..." : String(metrics.tripsToday)}
          accent="text-blue-300"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Live tracking"
            title="Fleet map"
            description="Mapa operativo con foco por dispositivo, status en vivo y soporte listo para Google Maps Advanced Markers."
          />
          <GoogleFleetMap devices={devices} focusedDeviceId={focusedDeviceId} />
        </div>

        <GlassCard className="p-6">
          <SectionHeading
            eyebrow="Focus queue"
            title="Activity spotlight"
            description="Selecciona un equipo para centrar la vista principal."
          />
          <div className="mt-6 space-y-3">
            {recentActivity.map((device) => (
              <button
                key={device.id}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left hover:border-cyan-400/25 hover:bg-white/[0.06]"
                onClick={() => setFocusedDeviceId(device.id)}
                type="button"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">{device.name}</p>
                    <p className="mt-1 text-sm text-slate-400">{device.plate}</p>
                  </div>
                  <StatusPill label={device.status} tone={device.status} />
                </div>
                {device.latestPosition ? (
                  <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
                    <span>{formatSpeed(device.latestPosition.speed)}</span>
                    <span>{formatRelativeTime(device.latestPosition.receivedAt)}</span>
                  </div>
                ) : null}
              </button>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <GlassCard className="p-6">
          <SectionHeading
            eyebrow="Alerts"
            title="Recent alerts"
            description="Eventos críticos y operativos ordenados por prioridad y tiempo."
          />
          <div className="mt-6 space-y-3">
            {alerts.slice(0, 6).map((alert) => (
              <div
                key={alert.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="font-semibold text-white">{alert.message}</p>
                  <StatusPill
                    label={alert.severity}
                    tone={alert.severity === "critical" ? "critical" : "warning"}
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-400">
                  <span>{alert.deviceId}</span>
                  <span>{formatDateTime(alert.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <SectionHeading
            eyebrow="Live activity"
            title="Recent device activity"
            description="Últimas posiciones recibidas por cada unidad con velocidad y refresco relativo."
          />
          <div className="mt-6 space-y-3">
            {recentActivity.map((device) =>
              device.latestPosition ? (
                <div
                  key={device.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-white">{device.name}</p>
                      <p className="mt-1 text-sm text-slate-400">
                        {device.latestPosition.lat.toFixed(4)}, {device.latestPosition.lng.toFixed(4)}
                      </p>
                    </div>
                    <StatusPill label={device.status} tone={device.status} />
                  </div>
                  <div className="mt-3 flex justify-between text-sm text-slate-300">
                    <span>{formatSpeed(device.latestPosition.speed)}</span>
                    <span>{formatRelativeTime(device.latestPosition.receivedAt)}</span>
                  </div>
                </div>
              ) : null,
            )}
          </div>
        </GlassCard>
      </section>
    </AppShell>
  );
}
