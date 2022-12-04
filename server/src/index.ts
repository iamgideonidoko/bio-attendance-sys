import { createServer } from 'http';
import express from 'express';
import type { Application, Request, Response /*, NextFunction */ } from 'express';
import { config } from 'dotenv';
import { envConfig } from './config/environment.config';
import xss from 'xss-clean';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import limiter from './config/limiter.config';
import appCors from './config/cors.config';
import { prisma } from './db/prisma-client';
import constants from './config/constants.config';
import errorHandler from './middlewares/error.middleware';
// import auth from './middlewares/auth.middleware';
// Routes import
import authRoute from './routes/auth.route';
import staffRoute from './routes/staff.route';

config();

(async () => {
  const app: Application = express();

  // development logging
  if (envConfig.isProduction) {
    app.use(morgan('common'));
  } else {
    app.use(morgan('dev'));
  }

  // limit size of request payload
  app.use(express.json({ limit: '1MB' }));

  // parse urlencoded payloads with qs library
  app.use(express.urlencoded({ extended: true }));

  // sanitize data against xss
  app.use(xss());

  // compress payload
  app.use(compression());

  // parse cookies
  app.use(cookieParser());

  // add secure http headers
  app.use(
    helmet({
      crossOriginEmbedderPolicy: !envConfig.isDevelopment,
      contentSecurityPolicy: !envConfig.isDevelopment,
    }),
  );

  // register rate limiter
  app.use(limiter());

  // cors
  app.use(appCors());

  // global authentication
  // app.use(auth as (_: Request, __: Response, ___: NextFunction) => void);

  // test prisma connection
  try {
    await prisma.$connect();
    console.log('\x1b[32m%s\x1b[0m', '😎 Prisma connected to database');
  } catch (err) {
    console.log('\x1b[31m%s\x1b[0m', '😔 Prisma failed to connect database');
  }

  // Routes
  app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'success',
      message: 'Service is up and running!',
    });
  });

  app.get(constants.apiBase, (_req: Request, res: Response) => {
    res.status(200).json({
      name: 'Core API',
      description: 'Service is up and running!',
    });
  });

  app.use(constants.apiBase, staffRoute);
  app.use(constants.apiBase, authRoute);

  const httpServer = createServer(app);

  // Error for unhandled routes
  app.use((_, res: Response) => {
    res.status(404).json({
      status: 'fail',
      message: 'Route not found!',
    });
  });

  app.use(errorHandler);

  // throw unhandled rejection to a fallback handler
  process.on('unhandledRejection', (reason: Error) => {
    console.log('\x1b[31m%s\x1b[0m', `Unhandled Rejection: ${reason}`);
    throw reason;
  });

  // kill app if there's an uncaught exception
  process.on('uncaughtException', (error: Error) => {
    console.log('\x1b[31m%s\x1b[0m', `UncaughtException Error: ${error}`);
    process.exit(1);
  });

  await new Promise<void>((resolve) => httpServer.listen({ port: envConfig.port }, resolve));
  console.log(`🚀 HTTP Server ready at http://localhost:${envConfig.port}`);
})();
