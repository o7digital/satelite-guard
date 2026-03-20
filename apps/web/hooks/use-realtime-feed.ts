"use client";

import type {
  AlertNewEvent,
  DeviceStatusEvent,
  NormalizedPosition,
  PositionUpdateEvent,
} from "@satelite-guard/types";
import { useEffect, useEffectEvent } from "react";
import { io } from "socket.io-client";
import { WS_URL } from "@/lib/constants";

interface UseRealtimeFeedOptions {
  enabled: boolean;
  onPositionUpdate?: (event: PositionUpdateEvent) => void;
  onPositionsBatch?: (positions: NormalizedPosition[]) => void;
  onDeviceStatus?: (event: DeviceStatusEvent) => void;
  onAlertNew?: (event: AlertNewEvent) => void;
}

export function useRealtimeFeed({
  enabled,
  onPositionUpdate,
  onPositionsBatch,
  onDeviceStatus,
  onAlertNew,
}: UseRealtimeFeedOptions) {
  const handlePositionUpdate = useEffectEvent(
    (payload: PositionUpdateEvent | NormalizedPosition[]) => {
      if (Array.isArray(payload)) {
        onPositionsBatch?.(payload);
        return;
      }

      onPositionUpdate?.(payload);
    },
  );
  const handleDeviceStatus = useEffectEvent((event: DeviceStatusEvent) => {
    onDeviceStatus?.(event);
  });
  const handleAlertNew = useEffectEvent((event: AlertNewEvent) => {
    onAlertNew?.(event);
  });

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const socket = io(WS_URL, {
      transports: ["websocket"],
    });

    socket.on("position:update", handlePositionUpdate);
    socket.on("device:status", handleDeviceStatus);
    socket.on("alert:new", handleAlertNew);

    return () => {
      socket.disconnect();
    };
  }, [enabled]);
}
