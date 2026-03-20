export type NormalizedPosition = {
  deviceExternalId: string;
  lat: number;
  lng: number;
  speed?: number;
  heading?: number;
  altitude?: number;
  accuracy?: number;
  ignition?: boolean;
  battery?: number;
  providerTimestamp?: string;
  rawPayload?: unknown;
};

export interface GpsProvider {
  login(): Promise<void>;
  fetchDevices(): Promise<any[]>;
  fetchLatestPositions(): Promise<NormalizedPosition[]>;
  fetchHistory(
    deviceExternalId: string,
    from: Date,
    to: Date,
  ): Promise<NormalizedPosition[]>;
}
