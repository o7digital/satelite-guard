export const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:4000";

export const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL?.replace(/\/$/, "") ?? `${API_URL}/tracking`;

export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
export const GOOGLE_MAP_ID =
  process.env.NEXT_PUBLIC_GOOGLE_MAP_ID ??
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID ??
  "";

export const adminNavigation = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/devices", label: "Devices" },
  { href: "/admin/trips", label: "Trips" },
  { href: "/admin/geofences", label: "Geofences" },
  { href: "/admin/alerts", label: "Alerts" },
  { href: "/admin/settings", label: "Settings" },
];
