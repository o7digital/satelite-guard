"use client";

import type { DeviceSummary, Trip } from "@satelite-guard/types";
import { GlassCard, SectionHeading } from "@satelite-guard/ui";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { useAuth } from "@/components/auth/auth-provider";
import { getDevices, getTrips } from "@/lib/api-client";
import { formatDateTime, formatDuration, formatSpeed } from "@/lib/formatters";

export default function TripsPage() {
  const { token } = useAuth();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [devices, setDevices] = useState<DeviceSummary[]>([]);

  useEffect(() => {
    async function loadTrips() {
      if (!token) {
        return;
      }

      const [nextTrips, nextDevices] = await Promise.all([getTrips(token), getDevices(token)]);
      setTrips(nextTrips);
      setDevices(nextDevices);
    }

    void loadTrips();
  }, [token]);

  const devicesById = useMemo(
    () => Object.fromEntries(devices.map((device) => [device.id, device])),
    [devices],
  );

  return (
    <AppShell
      title="Trips"
      subtitle="Historial operativo consolidado con distancia, duración, velocidad y vínculo a la unidad correspondiente."
    >
      <GlassCard className="p-6">
        <SectionHeading
          eyebrow="Daily operations"
          title="Trip ledger"
          description="Auditoría visual de recorridos recientes para análisis y control de conducción."
        />

        <div className="mt-6 space-y-3">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-lg font-semibold text-white">
                    {devicesById[trip.deviceId]?.name ?? trip.deviceId}
                  </p>
                  <p className="mt-2 text-sm text-slate-400">
                    Inicio {formatDateTime(trip.startAt)} · Fin {formatDateTime(trip.endAt)}
                  </p>
                </div>
                <div className="grid gap-3 text-sm text-slate-300 md:grid-cols-3">
                  <span>{trip.distanceKm} km</span>
                  <span>{formatDuration(trip.durationSec)}</span>
                  <span>Máxima {formatSpeed(trip.maxSpeed)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </AppShell>
  );
}
