import { config } from 'dotenv';
import { IEnvConfig } from '../interfaces/config.interface';

config();

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'development';

export const envConfig: IEnvConfig = {
  port: (process.env.PORT as unknown as number) || (process.env.APP_PORT as unknown as number) || 5000,
  environment: NODE_ENV,
  isProduction: NODE_ENV === 'production',
  isDevelopment: NODE_ENV === 'development',
  isTest: NODE_ENV === 'test',
};
