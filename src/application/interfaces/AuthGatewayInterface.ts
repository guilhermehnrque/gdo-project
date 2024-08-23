import { Request } from "express";

export interface AuthGateway {
  login(request: Request): Promise<any>;
  register(request: Request): Promise<any>;
  forgotPassword(request: Request): Promise<any>;
  resetPassword(request: Request): Promise<any>;
}
