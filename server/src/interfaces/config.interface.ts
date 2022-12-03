import type { Secret } from 'jsonwebtoken';
export interface IEnvConfig {
  port: number;
  environment: string;
  isProduction: boolean;
  isDevelopment: boolean;
  isTest: boolean;
}
export interface IConstants {
  accessTokenSecret: Secret;
  refreshTokenSecret: Secret;
  accessTokenSpan: number | string;
  refreshTokenSpan: number | string;
}
