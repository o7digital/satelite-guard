import { Injectable } from "@nestjs/common";
import { DataStoreService } from "../../data/data-store.service";
import { PositionsQueryDto } from "./dto/positions-query.dto";

@Injectable()
export class PositionsService {
  constructor(private readonly dataStore: DataStoreService) {}

  getLatestPositions() {
    return this.dataStore.getLatestPositions();
  }

  getHistory(query: PositionsQueryDto) {
    return this.dataStore.getPositionHistory(
      query.deviceId,
      query.from ? new Date(query.from) : undefined,
      query.to ? new Date(query.to) : undefined,
      query.limit,
    );
  }
}
