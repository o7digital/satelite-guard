"use client";

import type {
  Alert,
  AuthUser,
  DeviceDetailsResponse,
  DeviceSummary,
  Geofence,
  HealthStatus,
  LoginRequest,
  LoginResponse,
  ProviderStatus,
  Trip,
} from "@satelite-guard/types";
import { API_URL } from "./constants";

class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit, token?: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const fallback = await response.text();
    throw new ApiError(response.status, fallback || "Request failed");
  }

  return response.json() as Promise<T>;
}

export { ApiError };

export function loginRequest(payload: LoginRequest) {
  return request<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getMe(token: string) {
  return request<AuthUser>("/auth/me", undefined, token);
}

export function getDevices(token: string) {
  return request<DeviceSummary[]>("/devices", undefined, token);
}

export function getDeviceDetails(token: string, deviceId: string) {
  return request<DeviceDetailsResponse>(`/devices/${deviceId}`, undefined, token);
}

export function getTrips(token: string, deviceId?: string) {
  const search = deviceId ? `?deviceId=${deviceId}` : "";
  return request<Trip[]>(`/trips${search}`, undefined, token);
}

export function getGeofences(token: string) {
  return request<Geofence[]>("/geofences", undefined, token);
}

export function getAlerts(token: string, deviceId?: string) {
  const search = deviceId ? `?deviceId=${deviceId}` : "";
  return request<Alert[]>(`/alerts${search}`, undefined, token);
}

export function getProviderStatuses(token: string) {
  return request<ProviderStatus[]>("/providers/status", undefined, token);
}

export function getHealth() {
  return request<HealthStatus>("/health");
}
