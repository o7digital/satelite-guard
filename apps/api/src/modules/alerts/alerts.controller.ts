import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { AlertsQueryDto } from "./dto/alerts-query.dto";
import { AlertsService } from "./alerts.service";

@Controller("alerts")
@UseGuards(JwtAuthGuard)
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Get()
  listAlerts(@Query() query: AlertsQueryDto) {
    return this.alertsService.listAlerts(query);
  }
}
