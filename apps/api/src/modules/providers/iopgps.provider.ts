import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { GpsProvider, NormalizedPosition } from "./gps-provider.interface";

@Injectable()
export class IopGpsProvider implements GpsProvider {
  private readonly logger = new Logger(IopGpsProvider.name);
  private missingCredentialsWarned = false;
  private missingSecretWarned = false;

  constructor(private readonly configService: ConfigService) {}

  hasConfiguredCredentials() {
    return Boolean(
      this.configService.get<string>("IOPGPS_BASE_URL") &&
      this.configService.get<string>("IOPGPS_USERNAME") &&
      this.configService.get<string>("IOPGPS_PASSWORD"),
    );
  }

  hasSecretKey() {
    return Boolean(this.configService.get<string>("IOPGPS_SECRET_KEY"));
  }

  canUseOpenApi() {
    return this.hasConfiguredCredentials() && this.hasSecretKey();
  }

  warnIfFallbackIsRequired() {
    if (!this.hasConfiguredCredentials()) {
      if (!this.missingCredentialsWarned) {
        this.logger.warn(
          "IOPGPS credentials are incomplete. Falling back to mock mode.",
        );
        this.missingCredentialsWarned = true;
      }

      return;
    }

    if (!this.hasSecretKey() && !this.missingSecretWarned) {
      this.logger.warn(
        "IOPGPS_SECRET_KEY is missing. Open API connection is not fully configured yet. Falling back to mock mode.",
      );
      this.missingSecretWarned = true;
    }
  }

  getAvailabilityMessage() {
    if (!this.hasConfiguredCredentials()) {
      return "IOPGPS credentials are incomplete. Mock mode remains active until the provider account is fully configured.";
    }

    if (!this.hasSecretKey()) {
      return "IOPGPS secret key is missing. Mock mode remains active until the provider grants Open API access.";
    }

    return "IOPGPS credentials are present and the connector is ready for the official Open API wiring.";
  }

  login(): Promise<void> {
    const username = this.configService.get<string>("IOPGPS_USERNAME");
    const password = this.configService.get<string>("IOPGPS_PASSWORD");
    const secretKey = this.configService.get<string>("IOPGPS_SECRET_KEY");

    this.logger.log(`Initializing IOPGPS provider for account ${username}`);

    if (!username || !password) {
      this.warnIfFallbackIsRequired();
      return Promise.resolve();
    }

    if (!secretKey) {
      this.warnIfFallbackIsRequired();
      return Promise.resolve();
    }

    // TODO:
    // 1. Authenticate with official IOPGPS Open API
    // 2. Persist token / session
    // 3. Handle token refresh
    return Promise.resolve();
  }

  fetchDevices(): Promise<any[]> {
    return Promise.resolve([]);
  }

  fetchLatestPositions(): Promise<NormalizedPosition[]> {
    return Promise.resolve([]);
  }

  fetchHistory(
    deviceExternalId: string,
    from: Date,
    to: Date,
  ): Promise<NormalizedPosition[]> {
    void deviceExternalId;
    void from;
    void to;
    return Promise.resolve([]);
  }
}
