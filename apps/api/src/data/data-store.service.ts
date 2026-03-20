import { Injectable, NotFoundException } from "@nestjs/common";
import type {
  Alert,
  Device,
  Geofence,
  Position,
  Trip,
} from "@satelite-guard/types";
import { buildSeedData } from "./seed";

@Injectable()
export class DataStoreService {
  private readonly devices = new Map<string, Device>();
  private readonly positions: Position[] = [];
  private readonly trips: Trip[] = [];
  private readonly geofences: Geofence[] = [];
  private readonly alerts: Alert[] = [];

  constructor() {
    const snapshot = buildSeedData();

    snapshot.devices.forEach((device) => this.devices.set(device.id, device));
    this.positions.push(...snapshot.positions);
    this.trips.push(...snapshot.trips);
    this.geofences.push(...snapshot.geofences);
    this.alerts.push(...snapshot.alerts);
  }

  listDevices() {
    return [...this.devices.values()].sort((left, right) =>
      left.name.localeCompare(right.name),
    );
  }

  getDevice(id: string) {
    const device = this.devices.get(id);

    if (!device) {
      throw new NotFoundException(`Device ${id} was not found`);
    }

    return device;
  }

  updateDevice(id: string, patch: Partial<Device>) {
    const device = this.getDevice(id);
    const updated = { ...device, ...patch };
    this.devices.set(id, updated);
    return updated;
  }

  getLatestPositions() {
    return this.listDevices()
      .map((device) => this.getLatestPosition(device.id))
      .filter((position): position is Position => Boolean(position));
  }

  getLatestPosition(deviceId: string) {
    return this.getPositionsForDevice(deviceId)[0] ?? null;
  }

  getPositionsForDevice(deviceId: string) {
    return this.positions
      .filter((position) => position.deviceId === deviceId)
      .sort(
        (left, right) =>
          new Date(right.providerTimestamp).getTime() -
          new Date(left.providerTimestamp).getTime(),
      );
  }

  getPositionHistory(
    deviceId?: string,
    from?: Date,
    to?: Date,
    limit?: number,
  ) {
    const start = from?.getTime();
    const end = to?.getTime();

    const filtered = this.positions
      .filter((position) => (deviceId ? position.deviceId === deviceId : true))
      .filter((position) => {
        const timestamp = new Date(position.providerTimestamp).getTime();

        if (start && timestamp < start) {
          return false;
        }

        if (end && timestamp > end) {
          return false;
        }

        return true;
      })
      .sort(
        (left, right) =>
          new Date(right.providerTimestamp).getTime() -
          new Date(left.providerTimestamp).getTime(),
      );

    return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
  }

  pushPosition(position: Position) {
    this.positions.unshift(position);
    return position;
  }

  listTrips(deviceId?: string) {
    return this.trips
      .filter((trip) => (deviceId ? trip.deviceId === deviceId : true))
      .sort(
        (left, right) =>
          new Date(right.startAt).getTime() - new Date(left.startAt).getTime(),
      );
  }

  listGeofences() {
    return [...this.geofences];
  }

  listAlerts(deviceId?: string) {
    return this.alerts
      .filter((alert) => (deviceId ? alert.deviceId === deviceId : true))
      .sort(
        (left, right) =>
          new Date(right.createdAt).getTime() -
          new Date(left.createdAt).getTime(),
      );
  }

  pushAlert(alert: Alert) {
    this.alerts.unshift(alert);
    return alert;
  }
}
