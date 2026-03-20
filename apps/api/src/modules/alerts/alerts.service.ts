import { Injectable } from "@nestjs/common";
import { DataStoreService } from "../../data/data-store.service";
import { AlertsQueryDto } from "./dto/alerts-query.dto";

@Injectable()
export class AlertsService {
  constructor(private readonly dataStore: DataStoreService) {}

  listAlerts(query: AlertsQueryDto) {
    const alerts = this.dataStore.listAlerts(query.deviceId);
    return typeof query.limit === "number"
      ? alerts.slice(0, query.limit)
      : alerts;
  }
}
