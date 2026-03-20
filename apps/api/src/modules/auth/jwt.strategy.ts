import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import type { AuthUser, UserRole } from "@satelite-guard/types";
import { ExtractJwt, Strategy } from "passport-jwt";
import { getRequiredConfig } from "../../common/config/get-required-config";
import { UsersService } from "../users/users.service";

interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  name: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getRequiredConfig(configService, "JWT_SECRET"),
    });
  }

  validate(payload: JwtPayload): AuthUser {
    const user = this.usersService.getById(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
