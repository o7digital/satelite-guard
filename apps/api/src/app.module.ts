import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { resolve } from "node:path";
import { DataModule } from "./data/data.module";
import { AlertsModule } from "./modules/alerts/alerts.module";
import { AuthModule } from "./modules/auth/auth.module";
import { DevicesModule } from "./modules/devices/devices.module";
import { GeofencesModule } from "./modules/geofences/geofences.module";
import { HealthModule } from "./modules/health/health.module";
import { PositionsModule } from "./modules/positions/positions.module";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { ProvidersModule } from "./modules/providers/providers.module";
import { TripsModule } from "./modules/trips/trips.module";
import { UsersModule } from "./modules/users/users.module";
import { WebsocketModule } from "./modules/websocket/websocket.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        resolve(process.cwd(), ".env"),
        resolve(process.cwd(), "../../.env"),
      ],
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    DataModule,
    AuthModule,
    UsersModule,
    DevicesModule,
    PositionsModule,
    TripsModule,
    GeofencesModule,
    AlertsModule,
    ProvidersModule,
    HealthModule,
    WebsocketModule,
  ],
})
export class AppModule {}
