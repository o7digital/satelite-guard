export type UserRole = "superadmin" | "admin" | "operator";

export type ProviderName = "mock" | "iopgps";

export type DeviceStatus = "online" | "offline" | "idle";

export type VehicleType =
  | "sedan"
  | "pickup"
  | "truck"
  | "van"
  | "motorbike"
  | "asset";

export type GeofenceType = "circle" | "polygon";

export type AlertSeverity = "low" | "medium" | "high" | "critical";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
  user: AuthUser;
}

export interface Device {
  id: string;
  name: string;
  imei: string;
  simNumber: string;
  plate: string;
  provider: ProviderName;
  status: DeviceStatus;
  lastSeenAt: string;
  vehicleType: VehicleType;
  assignedTo: string;
  notes: string;
}

export interface DeviceSummary extends Device {
  latestPosition: Position | null;
}

export interface Position {
  id: string;
  deviceId: string;
  lat: number;
  lng: number;
  speed: number;
  heading: number;
  altitude: number;
  accuracy: number;
  ignition: boolean;
  battery: number;
  providerTimestamp: string;
  receivedAt: string;
  rawPayload: Record<string, unknown>;
}

export interface NormalizedPosition {
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
}

export interface Trip {
  id: string;
  deviceId: string;
  startAt: string;
  endAt: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  distanceKm: number;
  durationSec: number;
  maxSpeed: number;
  avgSpeed: number;
}

export interface Geofence {
  id: string;
  name: string;
  type: GeofenceType;
  centerLat: number | null;
  centerLng: number | null;
  radiusMeters: number | null;
  polygonJson: number[][] | null;
  active: boolean;
}

export interface Alert {
  id: string;
  deviceId: string;
  type: string;
  severity: AlertSeverity;
  message: string;
  createdAt: string;
  acknowledgedAt: string | null;
  payloadJson: Record<string, unknown>;
}

export interface DeviceDetailsResponse {
  device: Device;
  latestPosition: Position | null;
  recentPositions: Position[];
  tripHistory: Trip[];
  alertHistory: Alert[];
}

export interface ProviderStatus {
  name: ProviderName;
  mode: ProviderName;
  connected: boolean;
  message: string;
}

export interface HealthStatus {
  status: "ok";
  service: string;
  timestamp: string;
  uptimeSec: number;
  providerMode: ProviderName;
  websocketClients: number;
}

export interface DeviceStatusEvent {
  deviceId: string;
  status: DeviceStatus;
  lastSeenAt: string;
}

export interface PositionUpdateEvent {
  deviceId: string;
  position: Position;
}

export interface AlertNewEvent {
  alert: Alert;
}
