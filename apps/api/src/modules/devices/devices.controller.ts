import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { DevicesService } from "./devices.service";

@Controller("devices")
@UseGuards(JwtAuthGuard)
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  listDevices() {
    return this.devicesService.listDevices();
  }

  @Get(":id")
  getDeviceDetails(@Param("id") id: string) {
    return this.devicesService.getDeviceDetails(id);
  }
}
