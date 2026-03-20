"use client";

import type { Geofence } from "@satelite-guard/types";
import { GlassCard, SectionHeading, StatusPill } from "@satelite-guard/ui";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { useAuth } from "@/components/auth/auth-provider";
import { getGeofences } from "@/lib/api-client";

export default function GeofencesPage() {
  const { token } = useAuth();
  const [geofences, setGeofences] = useState<Geofence[]>([]);

  useEffect(() => {
    async function loadGeofences() {
      if (!token) {
        return;
      }

      setGeofences(await getGeofences(token));
    }

    void loadGeofences();
  }, [token]);

  return (
    <AppShell
      title="Geofences"
      subtitle="Perímetros operativos activos para patios, corredores y resguardos estratégicos."
    >
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {geofences.map((geofence) => (
          <GlassCard key={geofence.id} className="p-6">
            <SectionHeading
              eyebrow={geofence.type}
              title={geofence.name}
              description={
                geofence.type === "circle"
                  ? `Radio configurado: ${geofence.radiusMeters} m`
                  : "Polígono multi punto listo para validación visual."
              }
            />
            <div className="mt-6 flex items-center justify-between">
              <StatusPill label={geofence.active ? "active" : "inactive"} tone="online" />
              <p className="text-sm text-slate-400">{geofence.id}</p>
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
              {geofence.type === "circle" ? (
                <p>
                  Centro: {geofence.centerLat}, {geofence.centerLng}
                </p>
              ) : (
                <p>{geofence.polygonJson?.length ?? 0} vértices registrados</p>
              )}
            </div>
          </GlassCard>
        ))}
      </section>
    </AppShell>
  );
}
