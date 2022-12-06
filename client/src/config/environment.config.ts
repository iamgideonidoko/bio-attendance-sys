import type { IEnvConfig } from '../interfaces/config.interface';

const envConfig: IEnvConfig = {
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

export default envConfig;
