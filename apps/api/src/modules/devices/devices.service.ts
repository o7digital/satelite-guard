import { Injectable } from "@nestjs/common";
import type { DeviceDetailsResponse } from "@satelite-guard/types";
import { DataStoreService } from "../../data/data-store.service";

@Injectable()
export class DevicesService {
  constructor(private readonly dataStore: DataStoreService) {}

  listDevices() {
    return this.dataStore.listDevices().map((device) => ({
      ...device,
      latestPosition: this.dataStore.getLatestPosition(device.id),
    }));
  }

  getDeviceDetails(id: string): DeviceDetailsResponse {
    return {
      device: this.dataStore.getDevice(id),
      latestPosition: this.dataStore.getLatestPosition(id),
      recentPositions: this.dataStore.getPositionsForDevice(id).slice(0, 20),
      tripHistory: this.dataStore.listTrips(id).slice(0, 12),
      alertHistory: this.dataStore.listAlerts(id).slice(0, 12),
    };
  }
}
