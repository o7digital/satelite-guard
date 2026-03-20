import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  constructor(configService: ConfigService) {
    super({
      datasources: {
        db: {
          url:
            configService.get<string>("DATABASE_URL") ??
            "postgresql://postgres:postgres@localhost:5432/satelite_guard?schema=public",
        },
      },
      log: ["warn", "error"],
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
