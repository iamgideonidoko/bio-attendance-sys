import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import logger from '../helpers/logger.helper';

// Error handler for development environment
const handleDevError: ErrorRequestHandler = (err, _req: Request, res: Response) => {
  logger.error(`Global Error Handler - ${err.message}`);

  return res.status(err.statusCode).json({
    ...err,
    message: err.message,
  });
};

// Error handler for Production Environment
const handleProdError: ErrorRequestHandler = (err, req: Request, res: Response) => {
  if (req.originalUrl.startsWith('/api')) {
    // Operational, trusted error: send message to client
    logger.error(`Global Error Handler - ${err.message}`);
    if (err.isOperational || err.statusCode?.toString()?.startsWith('4')) {
      return res.status(err.statusCode).json({
        ...err,
        message: err.message,
      });
    }

    // Programming or other unknown error: don't leak error details
    // 1) Log error

    // 2) Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }

  // Programming or other unknown error: don't leak error details
  // 1) Log error
  logger.error(`Global Error Handler - ${err.message}`);
};

const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = `${err.statusCode}`.startsWith('4') ? 'fail' : 'error';

  // the node environment has to be declared
  if (process.env.NODE_ENV === 'development') {
    handleDevError(err, req, res, next);
  } else {
    // production or others
    handleProdError(err, req, res, next);
  }
};

export default errorHandler;
