import type { IEnvConfig } from '../interfaces/config.interface';

const envConfig: IEnvConfig = {
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};

export default envConfig;
