"use client";

import type { DeviceSummary } from "@satelite-guard/types";
import { GlassCard, SectionHeading, StatusPill } from "@satelite-guard/ui";
import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { GoogleFleetMap } from "@/components/maps/google-fleet-map";
import { useAuth } from "@/components/auth/auth-provider";
import { getDevices } from "@/lib/api-client";
import { formatRelativeTime, formatSpeed } from "@/lib/formatters";
import { useRealtimeFeed } from "@/hooks/use-realtime-feed";

export default function DevicesPage() {
  const { token } = useAuth();
  const [devices, setDevices] = useState<DeviceSummary[]>([]);
  const [query, setQuery] = useState("");
  const [focusedDeviceId, setFocusedDeviceId] = useState<string | undefined>();
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    async function loadDevices() {
      if (!token) {
        return;
      }

      const nextDevices = await getDevices(token);
      setDevices(nextDevices);
      setFocusedDeviceId(nextDevices[0]?.id);
    }

    void loadDevices();
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
  });

  const filteredDevices = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return devices;
    }

    return devices.filter((device) =>
      [device.name, device.plate, device.imei, device.assignedTo]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [deferredQuery, devices]);

  return (
    <AppShell
      title="Devices"
      subtitle="Inventario operativo con status, última telemetría, IMEI, asignación y foco directo sobre el mapa."
    >
      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <GlassCard className="p-6">
          <SectionHeading
            eyebrow="Fleet inventory"
            title="All tracked units"
            description="Busca por nombre, placa, IMEI o área asignada para centrar la revisión."
          />
          <div className="mt-6">
            <input
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/40"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar unidad, placa o IMEI..."
              value={query}
            />
          </div>

          <div className="mt-6 space-y-3">
            {filteredDevices.map((device) => (
              <div
                key={device.id}
                className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-lg font-semibold text-white">{device.name}</p>
                      <StatusPill label={device.status} tone={device.status} />
                    </div>
                    <p className="mt-2 text-sm text-slate-400">
                      {device.plate} · {device.vehicleType} · {device.assignedTo}
                    </p>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                      {device.notes}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white hover:border-cyan-400/30 hover:bg-white/10"
                      onClick={() => setFocusedDeviceId(device.id)}
                      type="button"
                    >
                      Centrar mapa
                    </button>
                    <Link
                      className="rounded-2xl bg-[linear-gradient(135deg,#0ea5e9,#2563eb)] px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(37,99,235,0.35)] hover:-translate-y-0.5"
                      href={`/admin/devices/${device.id}`}
                    >
                      Ver detalle
                    </Link>
                  </div>
                </div>

                {device.latestPosition ? (
                  <div className="mt-4 grid gap-3 text-sm text-slate-300 md:grid-cols-4">
                    <div>Velocidad: {formatSpeed(device.latestPosition.speed)}</div>
                    <div>Batería: {device.latestPosition.battery}%</div>
                    <div>Ignición: {device.latestPosition.ignition ? "Activa" : "Inactiva"}</div>
                    <div>Última señal: {formatRelativeTime(device.latestPosition.receivedAt)}</div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-6">
          <SectionHeading
            eyebrow="Map focus"
            title="Spatial context"
            description="Visualiza inmediatamente la unidad seleccionada y el resto de la flota activa."
          />
          <GoogleFleetMap devices={devices} focusedDeviceId={focusedDeviceId} heightClassName="h-[640px]" />
        </div>
      </section>
    </AppShell>
  );
}
