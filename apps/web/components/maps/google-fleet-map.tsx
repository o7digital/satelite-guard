"use client";

import type { DeviceSummary, Position } from "@satelite-guard/types";
import { Loader } from "@googlemaps/js-api-loader";
import { GlassCard, StatusPill } from "@satelite-guard/ui";
import { useEffect, useRef, useState } from "react";
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAP_ID } from "@/lib/constants";

let loaderPromise: Promise<Loader> | null = null;

function getLoader() {
  if (!loaderPromise) {
    loaderPromise = Promise.resolve(
      new Loader({
        apiKey: GOOGLE_MAPS_API_KEY,
        version: "weekly",
        libraries: ["maps", "marker"],
      }),
    );
  }

  return loaderPromise;
}

function toneForStatus(status: DeviceSummary["status"]) {
  if (status === "online") {
    return "#34d399";
  }

  if (status === "idle") {
    return "#fbbf24";
  }

  return "#fb7185";
}

function markerNode(device: DeviceSummary) {
  const node = document.createElement("div");
  node.className =
    "rounded-2xl border border-white/10 bg-slate-950/90 px-3 py-2 text-xs text-white shadow-2xl";
  node.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="height:10px;width:10px;border-radius:999px;background:${toneForStatus(device.status)};"></span>
      <div>
        <div style="font-weight:700;letter-spacing:0.08em;">${device.name}</div>
        <div style="color:#94a3b8;">${device.plate} · ${device.status}</div>
      </div>
    </div>
  `;
  return node;
}

interface GoogleFleetMapProps {
  devices: DeviceSummary[];
  focusedDeviceId?: string | undefined;
  routePoints?: Position[] | undefined;
  heightClassName?: string;
}

export function GoogleFleetMap({
  devices,
  focusedDeviceId,
  routePoints = [],
  heightClassName = "h-[420px]",
}: GoogleFleetMapProps) {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const routeRef = useRef<google.maps.Polyline | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY || !GOOGLE_MAP_ID || !mapElementRef.current) {
      return;
    }

    let cancelled = false;

    async function renderMap() {
      try {
        const loader = await getLoader();
        const google = await loader.load();

        const centerDevice =
          devices.find((device) => device.id === focusedDeviceId && device.latestPosition) ??
          devices.find((device) => device.latestPosition) ??
          null;

        const defaultCenter = centerDevice?.latestPosition
          ? { lat: centerDevice.latestPosition.lat, lng: centerDevice.latestPosition.lng }
          : { lat: 19.4326, lng: -99.1332 };

        if (!mapRef.current) {
          mapRef.current = new google.maps.Map(mapElementRef.current!, {
            center: defaultCenter,
            zoom: focusedDeviceId ? 13 : 6,
            mapId: GOOGLE_MAP_ID,
            disableDefaultUI: true,
            gestureHandling: "greedy",
          });
        } else {
          mapRef.current.panTo(defaultCenter);
          mapRef.current.setZoom(focusedDeviceId ? 13 : 6);
        }

        markersRef.current.forEach((marker) => {
          marker.map = null;
        });
        markersRef.current = [];

        const { AdvancedMarkerElement } = (await google.maps.importLibrary(
          "marker",
        )) as google.maps.MarkerLibrary;

        devices
          .filter((device) => device.latestPosition)
          .forEach((device) => {
            const marker = new AdvancedMarkerElement({
              map: mapRef.current!,
              position: {
                lat: device.latestPosition!.lat,
                lng: device.latestPosition!.lng,
              },
              title: device.name,
              content: markerNode(device),
            });

            markersRef.current.push(marker);
          });

        if (routeRef.current) {
          routeRef.current.setMap(null);
          routeRef.current = null;
        }

        if (routePoints.length > 1) {
          routeRef.current = new google.maps.Polyline({
            path: [...routePoints]
              .reverse()
              .map((point) => ({ lat: point.lat, lng: point.lng })),
            geodesic: true,
            strokeColor: "#38bdf8",
            strokeOpacity: 0.9,
            strokeWeight: 4,
          });
          routeRef.current.setMap(mapRef.current);
        }
      } catch {
        if (!cancelled) {
          setError("No fue posible cargar Google Maps.");
        }
      }
    }

    void renderMap();

    return () => {
      cancelled = true;
    };
  }, [devices, focusedDeviceId, routePoints]);

  if (!GOOGLE_MAPS_API_KEY || !GOOGLE_MAP_ID || error) {
    return (
      <GlassCard className={`p-6 ${heightClassName}`}>
        <div className="flex h-full flex-col justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/90">
              Google Maps
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              Mapa listo para Advanced Markers
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              Agrega `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` y `NEXT_PUBLIC_GOOGLE_MAP_ID` para
              activar el mapa en vivo con Advanced Markers, foco por dispositivo e historial de
              ruta.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {devices.slice(0, 6).map((device) => (
              <div
                key={device.id}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">{device.name}</p>
                    <p className="mt-1 text-sm text-slate-400">{device.plate}</p>
                  </div>
                  <StatusPill label={device.status} tone={device.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className={`overflow-hidden p-2 ${heightClassName}`}>
      <div className="h-full min-h-[300px] w-full rounded-[22px]" ref={mapElementRef} />
    </GlassCard>
  );
}
