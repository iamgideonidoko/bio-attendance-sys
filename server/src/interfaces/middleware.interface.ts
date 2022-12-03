import type { Request } from 'express';
import type { JwtPayload } from 'jsonwebtoken';

export interface AuthReq extends Request {
  user: string | JwtPayload;
}
