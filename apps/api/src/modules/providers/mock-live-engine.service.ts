import { Injectable, Logger } from "@nestjs/common";
import type { Alert, Device, Position } from "@satelite-guard/types";
import { randomUUID } from "node:crypto";
import { DataStoreService } from "../../data/data-store.service";
import { TrackingGateway } from "../websocket/tracking.gateway";

@Injectable()
export class MockLiveEngineService {
  private readonly logger = new Logger(MockLiveEngineService.name);
  private tickCount = 0;
  private hasLoggedReady = false;

  constructor(
    private readonly dataStore: DataStoreService,
    private readonly trackingGateway: TrackingGateway,
  ) {}

  tick() {
    if (!this.hasLoggedReady) {
      this.logger.log("Mock live engine ready for scheduled polling");
      this.hasLoggedReady = true;
    }
    this.tickCount += 1;

    const devices = this.dataStore
      .listDevices()
      .filter((device) => device.status !== "offline");

    if (devices.length === 0) {
      return;
    }

    devices.forEach((device, index) => {
      const latestPosition = this.dataStore.getLatestPosition(device.id);

      if (!latestPosition) {
        return;
      }

      const nextPosition = this.createNextPosition(
        device,
        latestPosition,
        index,
      );
      this.dataStore.pushPosition(nextPosition);

      const nextStatus = nextPosition.speed > 8 ? "online" : "idle";
      const updatedDevice = this.dataStore.updateDevice(device.id, {
        status: nextStatus,
        lastSeenAt: nextPosition.receivedAt,
      });

      this.trackingGateway.emitPositionUpdate(device.id, nextPosition);
      this.trackingGateway.emitDeviceStatus({
        deviceId: updatedDevice.id,
        status: updatedDevice.status,
        lastSeenAt: updatedDevice.lastSeenAt,
      });
    });

    if (this.tickCount % 3 === 0) {
      const alert = this.createSyntheticAlert(
        devices[this.tickCount % devices.length],
      );
      this.dataStore.pushAlert(alert);
      this.trackingGateway.emitAlert(alert);
    }
  }

  private createNextPosition(
    device: Device,
    latestPosition: Position,
    index: number,
  ): Position {
    const drift = 0.0011 + index * 0.00015;
    const heading = (latestPosition.heading + 24 + index * 3) % 360;
    const phase = this.tickCount / 3 + index;
    const lat = latestPosition.lat + Math.sin(phase) * drift * 0.35;
    const lng = latestPosition.lng + Math.cos(phase) * drift * 0.55;
    const speed = Number((18 + (Math.sin(phase) + 1) * 22).toFixed(1));
    const now = new Date().toISOString();

    return {
      ...latestPosition,
      id: randomUUID(),
      lat: Number(lat.toFixed(6)),
      lng: Number(lng.toFixed(6)),
      speed,
      heading,
      altitude: latestPosition.altitude + 1,
      ignition: speed > 0,
      battery: Math.max(22, Number((latestPosition.battery - 0.2).toFixed(1))),
      providerTimestamp: now,
      receivedAt: now,
      rawPayload: {
        source: "mock-live-engine",
        provider: device.provider,
        tick: this.tickCount,
      },
    };
  }

  private createSyntheticAlert(device: Device | undefined): Alert {
    const targetDevice = device ?? this.dataStore.listDevices()[0];

    if (!targetDevice) {
      throw new Error("No device available for synthetic alert emission");
    }

    const createdAt = new Date().toISOString();

    return {
      id: randomUUID(),
      deviceId: targetDevice.id,
      type: this.tickCount % 2 === 0 ? "speeding" : "geofence-enter",
      severity: this.tickCount % 2 === 0 ? "high" : "medium",
      message:
        this.tickCount % 2 === 0
          ? `${targetDevice.name} superó el umbral de velocidad configurado.`
          : `${targetDevice.name} cruzó una geocerca activa.`,
      createdAt,
      acknowledgedAt: null,
      payloadJson: {
        tick: this.tickCount,
        deviceName: targetDevice.name,
      },
    };
  }
}
