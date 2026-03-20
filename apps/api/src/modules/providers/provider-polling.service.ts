import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { TrackingGateway } from "../websocket/tracking.gateway";
import { ProvidersService } from "./providers.service";

@Injectable()
export class ProviderPollingService {
  private readonly logger = new Logger(ProviderPollingService.name);
  private hasAuthenticated = false;

  constructor(
    private readonly providersService: ProvidersService,
    private readonly trackingGateway: TrackingGateway,
  ) {}

  @Cron("*/5 * * * * *")
  async poll() {
    const provider = this.providersService.getProvider();

    if (!this.hasAuthenticated) {
      await provider.login();
      this.hasAuthenticated = true;
    }

    const positions = await provider.fetchLatestPositions();
    this.trackingGateway.emitPositionUpdate(positions);
    this.logger.log(`Broadcasted ${positions.length} live positions`);
  }
}
