import { Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { AuthUser, UserRole } from "@satelite-guard/types";
import bcrypt from "bcryptjs";

interface StoredUser extends AuthUser {
  passwordHash: string;
}

interface SeedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  passwordEnv: string;
}

const seedUsers: SeedUser[] = [
  {
    id: "user-001",
    name: "Satelite Guard Master Admin",
    email: "admin@sateliteguard.com",
    role: "superadmin",
    passwordEnv: "SEED_SUPERADMIN_PASSWORD",
  },
  {
    id: "user-002",
    name: "Centro Operativo",
    email: "operador@sateliteguard.com",
    role: "operator",
    passwordEnv: "SEED_OPERATOR_PASSWORD",
  },
];

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly users = new Map<string, StoredUser>();

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    await Promise.all(
      seedUsers.map(async (user) => {
        const password = this.configService.get<string>(user.passwordEnv);

        if (!password) {
          throw new Error(
            `${user.passwordEnv} must be defined to seed admin authentication`,
          );
        }

        const passwordHash = await bcrypt.hash(password, 10);
        this.users.set(user.id, {
          id: user.id,
          name: user.name,
          email: (
            this.configService.get<string>(
              user.role === "superadmin"
                ? "SEED_SUPERADMIN_EMAIL"
                : "SEED_OPERATOR_EMAIL",
            ) ?? user.email
          ).toLowerCase(),
          role: user.role,
          passwordHash,
        });
      }),
    );
  }

  listUsers() {
    return [...this.users.values()].map((user) => this.sanitizeUser(user));
  }

  findByEmail(email: string) {
    return (
      [...this.users.values()].find(
        (user) => user.email === email.toLowerCase(),
      ) ?? null
    );
  }

  getById(id: string) {
    const user = this.users.get(id);

    if (!user) {
      throw new NotFoundException(`User ${id} was not found`);
    }

    return this.sanitizeUser(user);
  }

  async comparePassword(user: StoredUser, password: string) {
    return bcrypt.compare(password, user.passwordHash);
  }

  private sanitizeUser(user: StoredUser): AuthUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}
