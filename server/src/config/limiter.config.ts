import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

/**
 * Prevent agains DDOS
 * timeToReEntry is in minutes, it would be converted to seconds
 */
const limiter = (maxNumOfRequests = 100, timeToReEntry = 2): RateLimitRequestHandler =>
  rateLimit({
    max: maxNumOfRequests,
    windowMs: timeToReEntry * 60000, // 60000ms = 60s = 1m
    message: `Too many requests from this IP address`,
    handler: (_, res) => {
      res.status(500).json({
        status: 'fail',
        message: 'Too many requests from this IP address',
      });
    },
  });

export default limiter;
