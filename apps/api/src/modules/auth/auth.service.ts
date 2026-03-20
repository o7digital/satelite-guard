import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import type { LoginResponse } from "@satelite-guard/types";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(credentials: LoginDto): Promise<LoginResponse> {
    const user = this.usersService.findByEmail(credentials.email);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const passwordIsValid = await this.usersService.comparePassword(
      user,
      credentials.password,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const expiresIn = Number(
      this.configService.get<string>("JWT_EXPIRES_IN_SEC") ?? 43_200,
    );
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    return {
      accessToken,
      expiresIn,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
