# Satelite Guard

This repository contains two distinct surfaces for the `Satelite Guard` brand:

- the public landing page at the repo root
- the premium GPS monitoring platform in the monorepo under `apps/*` and `packages/*`

## Platform architecture

```text
.
├── app/                    # public landing page
├── components/             # landing page components
├── apps/
│   ├── api/                # NestJS backend
│   └── web/                # Next.js admin dashboard
├── packages/
│   ├── config/             # shared TS and ESLint config
│   ├── types/              # shared TypeScript contracts
│   └── ui/                 # shared React UI primitives
└── .env.example
```

## Stack

- `apps/api`: NestJS, Prisma, PostgreSQL, JWT auth, Socket.io, Nest Schedule
- `apps/web`: Next.js App Router, TypeScript, Tailwind CSS, Google Maps JavaScript API
- `packages/types`: shared contracts for auth, devices, positions, alerts and realtime events
- `packages/ui`: shared premium dark UI primitives

## Features delivered

- admin authentication with JWT roles: `superadmin`, `admin`, `operator`
- devices, positions, trips, alerts and provider status endpoints
- WebSocket events:
  - `position:update`
  - `device:status`
  - `alert:new`
- provider abstraction with:
  - `MockGpsProvider`
  - `IopGpsProvider`
- scheduled mock live movement for demo mode
- premium dark admin UI with live fleet map
- Google Maps Advanced Markers integration on the admin frontend
- Prisma schema and real seed script for PostgreSQL demo data

## Environment

Copy the root env file and adjust it before running the platform:

```bash
cp .env.example .env
```

Important variables:

- `DATABASE_URL`: PostgreSQL connection used by Prisma
- `GPS_PROVIDER`: `mock` or `iopgps`
- `IOPGPS_BASE_URL`, `IOPGPS_USERNAME`, `IOPGPS_PASSWORD`, `IOPGPS_SECRET_KEY`: reserved for the IOPGPS connector
- `SEED_SUPERADMIN_PASSWORD`, `SEED_OPERATOR_PASSWORD`: demo login passwords loaded from environment, never hardcoded in source
- `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_WS_URL`, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`, `NEXT_PUBLIC_GOOGLE_MAP_ID`: required for admin API, realtime tracking and Google Maps rendering

Current provider behavior:

- `mock`: seeded fleet data with simulated realtime movement
- `iopgps`: isolated provider stub using environment variables; if live polling is not available, the platform falls back to mock mode

## Local run

Install dependencies from the repository root:

```bash
npm install
```

Prepare Prisma and demo data:

```bash
npm run prisma:generate
npm run prisma:push
npm run seed:platform
```

Run the admin platform:

```bash
npm run dev:platform
```

Endpoints:

- admin frontend: `http://localhost:3000`
- API: `http://localhost:4000`
- API healthcheck: `http://localhost:4000/health`

Run the public landing page only:

```bash
npm run dev:landing
```

## Useful scripts

```bash
npm run dev:platform
npm run build:platform
npm run lint:platform
npm run prisma:generate
npm run prisma:push
npm run prisma:studio
npm run seed:platform
```

## Admin pages

- `/login`
- `/admin`
- `/admin/devices`
- `/admin/devices/[id]`
- `/admin/trips`
- `/admin/alerts`
- `/admin/settings`

## Docker

Build images from the repository root:

```bash
docker build -f apps/api/Dockerfile -t satelite-guard-api .
docker build -f apps/web/Dockerfile -t satelite-guard-web .
```

## Notes

- branding is `Satelite Guard` across the platform
- the public landing page in the root app remains separate from the admin monorepo
- the current IOPGPS service is intentionally isolated so the real connector can replace the stub without rewriting the rest of the app
