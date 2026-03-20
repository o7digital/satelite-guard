"use client";

import type { DeviceDetailsResponse } from "@satelite-guard/types";
import { GlassCard, SectionHeading, StatusPill } from "@satelite-guard/ui";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { GoogleFleetMap } from "@/components/maps/google-fleet-map";
import { useAuth } from "@/components/auth/auth-provider";
import { getDeviceDetails } from "@/lib/api-client";
import { formatDateTime, formatDuration, formatRelativeTime, formatSpeed } from "@/lib/formatters";
import { useRealtimeFeed } from "@/hooks/use-realtime-feed";

export default function DeviceDetailPage() {
  const params = useParams<{ id: string }>();
  const deviceId = params.id;
  const { token } = useAuth();
  const [detail, setDetail] = useState<DeviceDetailsResponse | null>(null);

  useEffect(() => {
    async function loadDetail() {
      if (!token || !deviceId) {
        return;
      }

      const nextDetail = await getDeviceDetails(token, deviceId);
      setDetail(nextDetail);
    }

    void loadDetail();
  }, [deviceId, token]);

  useRealtimeFeed({
    enabled: Boolean(token && deviceId),
    onPositionUpdate: ({ deviceId: updatedId, position }) => {
      if (updatedId !== deviceId) {
        return;
      }

      setDetail((current) =>
        current
          ? {
              ...current,
              latestPosition: position,
              recentPositions: [position, ...current.recentPositions].slice(0, 20),
              device: {
                ...current.device,
                lastSeenAt: position.receivedAt,
              },
            }
          : current,
      );
    },
    onDeviceStatus: ({ deviceId: updatedId, status, lastSeenAt }) => {
      if (updatedId !== deviceId) {
        return;
      }

      setDetail((current) =>
        current
          ? {
              ...current,
              device: {
                ...current.device,
                status,
                lastSeenAt,
              },
            }
          : current,
      );
    },
    onAlertNew: ({ alert }) => {
      if (alert.deviceId !== deviceId) {
        return;
      }

      setDetail((current) =>
        current
          ? {
              ...current,
              alertHistory: [alert, ...current.alertHistory].slice(0, 12),
            }
          : current,
      );
    },
  });

  const summaryDevice = detail
    ? [{ ...detail.device, latestPosition: detail.latestPosition }]
    : [];

  return (
    <AppShell
      title={detail?.device.name ?? "Device detail"}
      subtitle="Detalle completo con telemetría, historial reciente, trazado sobre mapa, viajes y eventos asociados."
    >
      <section className="flex items-center justify-between">
        <Link className="text-sm text-cyan-300 hover:text-cyan-200" href="/admin/devices">
          ← Volver a devices
        </Link>
        {detail ? <StatusPill label={detail.device.status} tone={detail.device.status} /> : null}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <GlassCard className="p-6">
            <SectionHeading
              eyebrow="Current state"
              title="Latest device info"
              description="Identidad, última señal, velocidad, ignición y estado operativo."
            />
            {detail ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm text-slate-400">Placa</p>
                  <p className="mt-2 text-lg font-semibold text-white">{detail.device.plate}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm text-slate-400">IMEI</p>
                  <p className="mt-2 text-lg font-semibold text-white">{detail.device.imei}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm text-slate-400">Última señal</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {formatRelativeTime(detail.device.lastSeenAt)}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm text-slate-400">Velocidad actual</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {detail.latestPosition ? formatSpeed(detail.latestPosition.speed) : "Sin dato"}
                  </p>
                </div>
              </div>
            ) : null}
          </GlassCard>

          <GoogleFleetMap
            devices={summaryDevice}
            focusedDeviceId={deviceId}
            heightClassName="h-[520px]"
            routePoints={detail?.recentPositions ?? []}
          />
        </div>

        <div className="space-y-6">
          <GlassCard className="p-6">
            <SectionHeading
              eyebrow="Recent positions"
              title="Telemetry feed"
              description="Últimos puntos de posición recibidos del proveedor activo."
            />
            <div className="mt-6 space-y-3">
              {detail?.recentPositions.slice(0, 8).map((position) => (
                <div
                  key={position.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="flex justify-between gap-4">
                    <p className="font-semibold text-white">
                      {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
                    </p>
                    <span className="text-sm text-slate-400">
                      {formatRelativeTime(position.receivedAt)}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-300">
                    <span>{formatSpeed(position.speed)}</span>
                    <span>Batería {position.battery}%</span>
                    <span>{position.ignition ? "Ignición activa" : "Ignición inactiva"}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <GlassCard className="p-6">
          <SectionHeading
            eyebrow="Trips"
            title="Trip history"
            description="Resumen de recorridos recientes con distancia, duración y velocidad máxima."
          />
          <div className="mt-6 space-y-3">
            {detail?.tripHistory.map((trip) => (
              <div
                key={trip.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex justify-between gap-4">
                  <p className="font-semibold text-white">{formatDateTime(trip.startAt)}</p>
                  <span className="text-sm text-slate-400">{trip.distanceKm} km</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-300">
                  <span>Duración {formatDuration(trip.durationSec)}</span>
                  <span>Máxima {formatSpeed(trip.maxSpeed)}</span>
                  <span>Promedio {formatSpeed(trip.avgSpeed)}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <SectionHeading
            eyebrow="Alerts"
            title="Alert history"
            description="Eventos del dispositivo ordenados desde el más reciente."
          />
          <div className="mt-6 space-y-3">
            {detail?.alertHistory.map((alert) => (
              <div
                key={alert.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex justify-between gap-4">
                  <p className="font-semibold text-white">{alert.message}</p>
                  <StatusPill
                    label={alert.severity}
                    tone={alert.severity === "critical" ? "critical" : "warning"}
                  />
                </div>
                <p className="mt-3 text-sm text-slate-400">{formatDateTime(alert.createdAt)}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>
    </AppShell>
  );
}
