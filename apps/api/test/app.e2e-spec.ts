import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "./../src/app.module";

describe("HealthController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/health (GET)", () => {
    const server = app.getHttpServer() as Parameters<typeof request>[0];

    return request(server)
      .get("/health")
      .expect(200)
      .expect(({ body }) => {
        const response = body as { status: string; service: string };
        expect(response.status).toBe("ok");
        expect(response.service).toBe("Satelite Guard API");
      });
  });
});
