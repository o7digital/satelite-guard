import type {
  Alert,
  Device,
  Geofence,
  Position,
  Trip,
  VehicleType,
} from "@satelite-guard/types";

interface SeedOptions {
  now?: Date;
}

export interface SeedSnapshot {
  devices: Device[];
  positions: Position[];
  trips: Trip[];
  geofences: Geofence[];
  alerts: Alert[];
}

interface RouteSeed {
  id: string;
  name: string;
  imei: string;
  simNumber: string;
  plate: string;
  vehicleType: VehicleType;
  assignedTo: string;
  notes: string;
  status: Device["status"];
  base: [number, number];
  points: Array<[number, number]>;
  battery: number;
}

function iso(date: Date) {
  return date.toISOString();
}

function minutesAgo(now: Date, minutes: number) {
  return new Date(now.getTime() - minutes * 60_000);
}

function buildPosition(
  deviceId: string,
  index: number,
  point: [number, number],
  previousPoint: [number, number],
  now: Date,
  totalPoints: number,
  battery: number,
): Position {
  const timestamp = minutesAgo(now, (totalPoints - index) * 4);
  const latDiff = point[0] - previousPoint[0];
  const lngDiff = point[1] - previousPoint[1];

  return {
    id: `${deviceId}-pos-${index + 1}`,
    deviceId,
    lat: point[0],
    lng: point[1],
    speed: Math.max(0, 18 + index * 4 + (index % 2 === 0 ? 5 : -3)),
    heading:
      Math.round((Math.atan2(lngDiff, latDiff) * 180) / Math.PI + 180) % 360,
    altitude: 2240 + index * 2,
    accuracy: 4 + (index % 3),
    ignition: index !== 0,
    battery: Math.max(24, battery - index * 1.5),
    providerTimestamp: iso(timestamp),
    receivedAt: iso(new Date(timestamp.getTime() + 10_000)),
    rawPayload: {
      source: "mock-engine",
      satellites: 11 + (index % 4),
      hdop: 0.7 + index * 0.02,
    },
  };
}

function buildTrip(
  deviceId: string,
  positions: Position[],
  offset: number,
): Trip {
  const first = positions[0];
  const last = positions[positions.length - 1];

  if (!first || !last) {
    throw new Error(
      `Cannot build trip for device ${deviceId} without positions`,
    );
  }

  const distanceKm = Number((8.5 + offset * 3.2).toFixed(1));
  const durationSec = 2400 + offset * 780;
  const maxSpeed = Math.max(...positions.map((position) => position.speed));
  const avgSpeed = Number(
    (
      positions.reduce(
        (accumulator, position) => accumulator + position.speed,
        0,
      ) / positions.length
    ).toFixed(1),
  );

  return {
    id: `${deviceId}-trip-${offset + 1}`,
    deviceId,
    startAt: first.providerTimestamp,
    endAt: last.providerTimestamp,
    startLat: first.lat,
    startLng: first.lng,
    endLat: last.lat,
    endLng: last.lng,
    distanceKm,
    durationSec,
    maxSpeed,
    avgSpeed,
  };
}

export function buildSeedData({
  now = new Date(),
}: SeedOptions = {}): SeedSnapshot {
  const routes: RouteSeed[] = [
    {
      id: "dev-001",
      name: "Unidad Alpha",
      imei: "860012345678901",
      simNumber: "8952140001200000001",
      plate: "SG-101-A",
      vehicleType: "truck",
      assignedTo: "Operaciones Centro",
      notes: "Ruta urbana con sensor de ignición y corte remoto.",
      status: "online",
      base: [19.4326, -99.1332],
      points: [
        [19.4269, -99.1686],
        [19.4298, -99.1601],
        [19.4334, -99.1517],
        [19.4377, -99.1445],
        [19.4411, -99.136],
      ],
      battery: 92,
    },
    {
      id: "dev-002",
      name: "Custodia Delta",
      imei: "860012345678902",
      simNumber: "8952140001200000002",
      plate: "SG-204-D",
      vehicleType: "pickup",
      assignedTo: "Seguridad Norte",
      notes: "Unidad táctica con botón de pánico activo.",
      status: "online",
      base: [19.4782, -99.1806],
      points: [
        [19.4698, -99.1983],
        [19.4722, -99.1917],
        [19.4745, -99.1862],
        [19.4768, -99.1821],
        [19.4791, -99.1782],
      ],
      battery: 88,
    },
    {
      id: "dev-003",
      name: "Logística Sierra",
      imei: "860012345678903",
      simNumber: "8952140001200000003",
      plate: "SG-330-L",
      vehicleType: "van",
      assignedTo: "Distribución Metropolitana",
      notes: "Con geocercas de patios y horario restringido.",
      status: "idle",
      base: [19.3802, -99.0901],
      points: [
        [19.376, -99.1024],
        [19.3772, -99.0983],
        [19.3787, -99.0941],
        [19.3798, -99.0918],
        [19.3801, -99.0906],
      ],
      battery: 75,
    },
    {
      id: "dev-004",
      name: "Patrulla Orbital",
      imei: "860012345678904",
      simNumber: "8952140001200000004",
      plate: "SG-450-P",
      vehicleType: "sedan",
      assignedTo: "Respuesta Ejecutiva",
      notes: "Configurada para seguimiento de ejecutivo y alertas silenciosas.",
      status: "online",
      base: [20.6736, -103.344],
      points: [
        [20.6682, -103.3631],
        [20.6698, -103.3575],
        [20.6711, -103.351],
        [20.6725, -103.3473],
        [20.6731, -103.3449],
      ],
      battery: 81,
    },
    {
      id: "dev-005",
      name: "Activo Torre 7",
      imei: "860012345678905",
      simNumber: "8952140001200000005",
      plate: "SG-777-X",
      vehicleType: "asset",
      assignedTo: "Infraestructura",
      notes: "Tracker para activo fijo con batería de respaldo extendida.",
      status: "offline",
      base: [25.6866, -100.3161],
      points: [
        [25.6842, -100.325],
        [25.6842, -100.325],
        [25.6842, -100.325],
        [25.6842, -100.325],
        [25.6842, -100.325],
      ],
      battery: 58,
    },
    {
      id: "dev-006",
      name: "Moto Vector",
      imei: "860012345678906",
      simNumber: "8952140001200000006",
      plate: "SG-909-M",
      vehicleType: "motorbike",
      assignedTo: "Cobertura Express",
      notes: "Motocicleta de enlace con reportes cada 10 segundos.",
      status: "online",
      base: [19.4067, -99.1791],
      points: [
        [19.4011, -99.1874],
        [19.4037, -99.1846],
        [19.4052, -99.1828],
        [19.4064, -99.1806],
        [19.4069, -99.1797],
      ],
      battery: 69,
    },
  ];

  const devices = routes.map<Device>((route, index) => ({
    id: route.id,
    name: route.name,
    imei: route.imei,
    simNumber: route.simNumber,
    plate: route.plate,
    provider: "iopgps",
    status: route.status,
    lastSeenAt: iso(
      minutesAgo(now, route.status === "offline" ? 47 : index + 1),
    ),
    vehicleType: route.vehicleType,
    assignedTo: route.assignedTo,
    notes: route.notes,
  }));

  const positions = routes.flatMap((route) =>
    route.points.map((point, index) =>
      buildPosition(
        route.id,
        index,
        point,
        route.points[Math.max(index - 1, 0)] ?? point,
        now,
        route.points.length,
        route.battery,
      ),
    ),
  );

  const trips = routes
    .filter((route) => route.status !== "offline")
    .map((route, index) =>
      buildTrip(
        route.id,
        positions.filter((position) => position.deviceId === route.id),
        index,
      ),
    );

  const geofences: Geofence[] = [
    {
      id: "geo-001",
      name: "Patio Central Satelite Guard",
      type: "circle",
      centerLat: 19.4326,
      centerLng: -99.1332,
      radiusMeters: 450,
      polygonJson: null,
      active: true,
    },
    {
      id: "geo-002",
      name: "Corredor Logístico Norte",
      type: "polygon",
      centerLat: null,
      centerLng: null,
      radiusMeters: null,
      polygonJson: [
        [19.4881, -99.2094],
        [19.5021, -99.1844],
        [19.4968, -99.1529],
        [19.478, -99.1642],
      ],
      active: true,
    },
    {
      id: "geo-003",
      name: "Resguardo Ejecutivo Occidente",
      type: "circle",
      centerLat: 20.6736,
      centerLng: -103.344,
      radiusMeters: 320,
      polygonJson: null,
      active: true,
    },
  ];

  const alerts: Alert[] = [
    {
      id: "alert-001",
      deviceId: "dev-002",
      type: "panic",
      severity: "critical",
      message: "Botón de pánico activado en Custodia Delta.",
      createdAt: iso(minutesAgo(now, 14)),
      acknowledgedAt: null,
      payloadJson: { source: "panic-button", escalation: "dispatch" },
    },
    {
      id: "alert-002",
      deviceId: "dev-003",
      type: "after-hours",
      severity: "medium",
      message: "Movimiento detectado fuera de horario operativo.",
      createdAt: iso(minutesAgo(now, 31)),
      acknowledgedAt: iso(minutesAgo(now, 19)),
      payloadJson: { zone: "Corredor Logístico Norte" },
    },
    {
      id: "alert-003",
      deviceId: "dev-005",
      type: "offline",
      severity: "high",
      message: "Activo Torre 7 perdió comunicación con el proveedor.",
      createdAt: iso(minutesAgo(now, 52)),
      acknowledgedAt: null,
      payloadJson: { lastBattery: 58 },
    },
    {
      id: "alert-004",
      deviceId: "dev-001",
      type: "geofence-exit",
      severity: "low",
      message: "Unidad Alpha salió del perímetro autorizado.",
      createdAt: iso(minutesAgo(now, 9)),
      acknowledgedAt: null,
      payloadJson: { geofenceId: "geo-001" },
    },
  ];

  return {
    devices,
    positions,
    trips,
    geofences,
    alerts,
  };
}
