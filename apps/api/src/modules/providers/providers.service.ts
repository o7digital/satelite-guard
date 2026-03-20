import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { ProviderName, ProviderStatus } from "@satelite-guard/types";
import type { GpsProvider } from "./gps-provider.interface";
import { IopGpsProvider } from "./iopgps.provider";
import { MockGpsProvider } from "./mock-gps.provider";

@Injectable()
export class ProvidersService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mockGpsProvider: MockGpsProvider,
    private readonly iopGpsProvider: IopGpsProvider,
  ) {}

  getRequestedProviderMode(): ProviderName {
    const configuredProvider =
      this.configService.get<ProviderName>("GPS_PROVIDER") ??
      this.configService.get<ProviderName>("GPS_PROVIDER_MODE");

    return configuredProvider === "iopgps" ? "iopgps" : "mock";
  }

  getProviderMode(): ProviderName {
    if (this.getRequestedProviderMode() === "iopgps") {
      if (this.iopGpsProvider.canUseOpenApi()) {
        return "iopgps";
      }

      this.iopGpsProvider.warnIfFallbackIsRequired();
    }

    return "mock";
  }

  getProvider(): GpsProvider {
    if (this.getProviderMode() === "iopgps") {
      return this.iopGpsProvider;
    }

    return this.mockGpsProvider;
  }

  getStatuses(): Promise<ProviderStatus[]> {
    const requestedMode = this.getRequestedProviderMode();
    const effectiveMode = this.getProviderMode();

    return Promise.resolve([
      {
        name: "mock",
        mode: "mock",
        connected: effectiveMode === "mock",
        message:
          requestedMode === "mock"
            ? "Mock provider active for seeded fleet simulation and realtime demo movement."
            : "Mock provider is active because IOPGPS is not fully ready for Open API polling.",
      },
      {
        name: "iopgps",
        mode: "iopgps",
        connected:
          effectiveMode === "iopgps" &&
          this.iopGpsProvider.hasConfiguredCredentials() &&
          this.iopGpsProvider.hasSecretKey(),
        message:
          requestedMode === "iopgps"
            ? this.iopGpsProvider.getAvailabilityMessage()
            : "IOPGPS stays isolated behind a dedicated provider service until live activation is requested.",
      },
    ]);
  }
}
