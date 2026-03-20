import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { PositionsQueryDto } from "./dto/positions-query.dto";
import { PositionsService } from "./positions.service";

@Controller("positions")
@UseGuards(JwtAuthGuard)
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Get("latest")
  getLatestPositions() {
    return this.positionsService.getLatestPositions();
  }

  @Get("history")
  getHistory(@Query() query: PositionsQueryDto) {
    return this.positionsService.getHistory(query);
  }
}
