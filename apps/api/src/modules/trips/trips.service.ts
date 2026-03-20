import { Injectable } from "@nestjs/common";
import { DataStoreService } from "../../data/data-store.service";
import { TripsQueryDto } from "./dto/trips-query.dto";

@Injectable()
export class TripsService {
  constructor(private readonly dataStore: DataStoreService) {}

  listTrips(query: TripsQueryDto) {
    const trips = this.dataStore.listTrips(query.deviceId);
    return typeof query.limit === "number"
      ? trips.slice(0, query.limit)
      : trips;
  }
}
