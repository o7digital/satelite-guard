import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { GeofencesService } from "./geofences.service";

@Controller("geofences")
@UseGuards(JwtAuthGuard)
export class GeofencesController {
  constructor(private readonly geofencesService: GeofencesService) {}

  @Get()
  listGeofences() {
    return this.geofencesService.listGeofences();
  }
}
