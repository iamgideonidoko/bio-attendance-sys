import { config } from 'dotenv';
import type { Secret } from 'jsonwebtoken';
import { IConstants } from '../interfaces/config.interface';

// make env variable available
config();

/**
 * For value that will constant in the app
 */
const constants: IConstants = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as Secret,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as Secret,
  accessTokenSpan: '1h',
  refreshTokenSpan: '2d',
};

export default constants;
