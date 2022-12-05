import type { ObjectSchema } from 'joi';
import type { Request, Response, NextFunction } from 'express';
import logger from '../helpers/logger.helper';
import createError from 'http-errors';

const joiValidate = (schema: ObjectSchema, type: 'body' | 'query' = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[type]);
    if (!error) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');
      logger.error('Validation Error', message);
      return next(createError(422, ...[{ validation_error: message }]));
    }
  };
};

export default joiValidate;
