import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import type { AuthUser } from "@satelite-guard/types";
import type { AuthenticatedRequest } from "../../common/interfaces/authenticated-request.interface";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  login(@Body() payload: LoginDto) {
    return this.authService.login(payload);
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  getMe(@Req() request: AuthenticatedRequest): AuthUser {
    return request.user;
  }
}
