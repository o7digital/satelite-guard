import type { AuthUser } from "@satelite-guard/types";
import type { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user: AuthUser;
}
