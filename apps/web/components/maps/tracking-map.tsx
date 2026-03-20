"use client";

import type { NormalizedPosition } from "@satelite-guard/types";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react";
import { GOOGLE_MAP_ID, GOOGLE_MAPS_API_KEY } from "@/lib/constants";

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

export default function TrackingMap({
  devices,
}: {
  devices: NormalizedPosition[];
}) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let map: google.maps.Map | null = null;
    let markers: google.maps.marker.AdvancedMarkerElement[] = [];

    async function initMap() {
      if (!mapRef.current || !GOOGLE_MAPS_API_KEY) {
        return;
      }

      const loader = await getLoader();
      const google = await loader.load();
      const { Map } = (await google.maps.importLibrary(
        "maps",
      )) as google.maps.MapsLibrary;
      const { AdvancedMarkerElement, PinElement } =
        (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;

      map = new Map(mapRef.current, {
        center: { lat: 19.4326, lng: -99.1332 },
        zoom: 11,
        mapId: GOOGLE_MAP_ID || "DEMO_MAP_ID",
      });

      markers = devices.map((device) => {
        const pin = new PinElement({
          glyph: "G",
          scale: 1.1,
        });

        return new AdvancedMarkerElement({
          map,
          position: { lat: device.lat, lng: device.lng },
          title: device.deviceExternalId,
          content: pin.element,
        });
      });
    }

    void initMap();

    return () => {
      markers.forEach((marker) => {
        marker.map = null;
      });
    };
  }, [devices]);

  return (
    <div
      className="h-[600px] w-full overflow-hidden rounded-3xl"
      ref={mapRef}
    />
  );
}
