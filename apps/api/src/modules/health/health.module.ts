import { Module } from "@nestjs/common";
import { ProvidersModule } from "../providers/providers.module";
import { WebsocketModule } from "../websocket/websocket.module";
import { HealthController } from "./health.controller";
import { HealthService } from "./health.service";

@Module({
  imports: [ProvidersModule, WebsocketModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
