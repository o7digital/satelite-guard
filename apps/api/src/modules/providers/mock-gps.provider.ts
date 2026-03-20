import { Injectable } from "@nestjs/common";
import type { GpsProvider, NormalizedPosition } from "./gps-provider.interface";

@Injectable()
export class MockGpsProvider implements GpsProvider {
  private positions: NormalizedPosition[] = [
    {
      deviceExternalId: "SG-001",
      lat: 19.4326,
      lng: -99.1332,
      speed: 24,
      ignition: true,
      battery: 88,
      providerTimestamp: new Date().toISOString(),
      rawPayload: { source: "mock" },
    },
    {
      deviceExternalId: "SG-002",
      lat: 19.427,
      lng: -99.127,
      speed: 12,
      ignition: true,
      battery: 76,
      providerTimestamp: new Date().toISOString(),
      rawPayload: { source: "mock" },
    },
  ];

  login(): Promise<void> {
    return Promise.resolve();
  }

  fetchDevices(): Promise<any[]> {
    return Promise.resolve([
      { externalId: "SG-001", name: "Tracker 1", status: "online" },
      { externalId: "SG-002", name: "Tracker 2", status: "online" },
    ]);
  }

  fetchLatestPositions(): Promise<NormalizedPosition[]> {
    this.positions = this.positions.map((position) => ({
      ...position,
      lat: position.lat + (Math.random() - 0.5) * 0.002,
      lng: position.lng + (Math.random() - 0.5) * 0.002,
      speed: Math.max(0, (position.speed ?? 0) + (Math.random() - 0.5) * 8),
      providerTimestamp: new Date().toISOString(),
    }));

    return Promise.resolve(this.positions);
  }

  fetchHistory(
    deviceExternalId: string,
    from: Date,
    to: Date,
  ): Promise<NormalizedPosition[]> {
    void deviceExternalId;
    void from;
    void to;
    return Promise.resolve(this.positions);
  }
}
