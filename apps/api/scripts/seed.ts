import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { config as loadEnv } from "dotenv";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { buildSeedData } from "../src/data/seed";

loadEnv({ path: resolve(process.cwd(), "../../.env") });
loadEnv({ path: resolve(process.cwd(), ".env"), override: true });

const prisma = new PrismaClient();

function requireEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} must be defined before running the seed script`);
  }

  return value;
}

async function run() {
  const outputPath = resolve(process.cwd(), "seed-data.json");
  const snapshot = buildSeedData();
  const seededUsers = [
    {
      email:
        process.env.SEED_SUPERADMIN_EMAIL?.toLowerCase() ??
        "admin@sateliteguard.com",
      passwordHash: await bcrypt.hash(
        requireEnv("SEED_SUPERADMIN_PASSWORD"),
        10,
      ),
      role: "superadmin",
    },
    {
      email:
        process.env.SEED_OPERATOR_EMAIL?.toLowerCase() ??
        "operador@sateliteguard.com",
      passwordHash: await bcrypt.hash(requireEnv("SEED_OPERATOR_PASSWORD"), 10),
      role: "operator",
    },
  ];

  await prisma.$transaction(async (tx) => {
    await tx.alert.deleteMany();
    await tx.trip.deleteMany();
    await tx.position.deleteMany();
    await tx.device.deleteMany();
    await tx.user.deleteMany();

    await tx.user.createMany({
      data: seededUsers,
    });

    await tx.device.createMany({
      data: snapshot.devices.map((device) => ({
        id: device.id,
        name: device.name,
        imei: device.imei,
        simNumber: device.simNumber,
        plate: device.plate,
        provider: device.provider,
        status: device.status,
        vehicleType: device.vehicleType,
        notes: device.notes,
        lastSeenAt: new Date(device.lastSeenAt),
      })),
    });

    await tx.position.createMany({
      data: snapshot.positions.map((position) => ({
        id: position.id,
        deviceId: position.deviceId,
        lat: position.lat,
        lng: position.lng,
        speed: position.speed,
        heading: position.heading,
        altitude: position.altitude,
        accuracy: position.accuracy,
        ignition: position.ignition,
        battery: position.battery,
        providerTimestamp: new Date(position.providerTimestamp),
        receivedAt: new Date(position.receivedAt),
        rawPayload: position.rawPayload as Prisma.InputJsonValue,
      })),
    });

    await tx.trip.createMany({
      data: snapshot.trips.map((trip) => ({
        id: trip.id,
        deviceId: trip.deviceId,
        startAt: new Date(trip.startAt),
        endAt: trip.endAt ? new Date(trip.endAt) : null,
        startLat: trip.startLat,
        startLng: trip.startLng,
        endLat: trip.endLat,
        endLng: trip.endLng,
        distanceKm: trip.distanceKm,
        durationSec: trip.durationSec,
        maxSpeed: trip.maxSpeed,
        avgSpeed: trip.avgSpeed,
      })),
    });

    await tx.alert.createMany({
      data: snapshot.alerts.map((alert) => ({
        id: alert.id,
        deviceId: alert.deviceId,
        type: alert.type,
        severity: alert.severity,
        message: alert.message,
        createdAt: new Date(alert.createdAt),
        acknowledgedAt: alert.acknowledgedAt
          ? new Date(alert.acknowledgedAt)
          : null,
        payloadJson: alert.payloadJson as Prisma.InputJsonValue,
      })),
    });
  });

  await writeFile(outputPath, JSON.stringify(snapshot, null, 2), "utf-8");

  console.log(
    `Database and snapshot seeded with ${snapshot.devices.length} devices, ${snapshot.positions.length} positions and ${seededUsers.length} users.`,
  );

  await prisma.$disconnect();
}

void run().catch(async (error: unknown) => {
  console.error(error);
  await prisma.$disconnect();
  process.exitCode = 1;
});
