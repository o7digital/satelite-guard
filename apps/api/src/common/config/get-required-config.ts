import { InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export function getRequiredConfig(
  configService: ConfigService,
  key: string,
): string {
  const value = configService.get<string>(key);

  if (!value) {
    throw new InternalServerErrorException(
      `Missing required configuration: ${key}`,
    );
  }

  return value;
}
