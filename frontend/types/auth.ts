import { type Role } from "@/lib/constants/roles";

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: Role[];
  status: "ACTIVE" | "INACTIVE" | "LOCKED";
}

export interface JWTPayload {
  sub: string;       // userId
  email: string;
  roles: Role[];
  iat: number;
  exp: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
