import { Injectable } from "@nestjs/common";
import type { HealthStatus } from "@satelite-guard/types";
import { ProvidersService } from "../providers/providers.service";
import { TrackingGateway } from "../websocket/tracking.gateway";

@Injectable()
export class HealthService {
  constructor(
    private readonly providersService: ProvidersService,
    private readonly trackingGateway: TrackingGateway,
  ) {}

  getHealth(): HealthStatus {
    return {
      status: "ok",
      service: "Satelite Guard API",
      timestamp: new Date().toISOString(),
      uptimeSec: Math.round(process.uptime()),
      providerMode: this.providersService.getProviderMode(),
      websocketClients: this.trackingGateway.getClientCount(),
    };
  }
}
