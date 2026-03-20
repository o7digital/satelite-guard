import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { TripsQueryDto } from "./dto/trips-query.dto";
import { TripsService } from "./trips.service";

@Controller("trips")
@UseGuards(JwtAuthGuard)
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  listTrips(@Query() query: TripsQueryDto) {
    return this.tripsService.listTrips(query);
  }
}
