import { Module } from "@nestjs/common";
import { WebsocketModule } from "../websocket/websocket.module";
import { ProvidersController } from "./providers.controller";
import { IopGpsProvider } from "./iopgps.provider";
import { MockGpsProvider } from "./mock-gps.provider";
import { MockLiveEngineService } from "./mock-live-engine.service";
import { ProviderPollingService } from "./provider-polling.service";
import { ProvidersService } from "./providers.service";

@Module({
  imports: [WebsocketModule],
  controllers: [ProvidersController],
  providers: [
    MockGpsProvider,
    IopGpsProvider,
    ProvidersService,
    MockLiveEngineService,
    ProviderPollingService,
  ],
  exports: [ProvidersService],
})
export class ProvidersModule {}
