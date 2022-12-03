import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import constants from '../config/constants.config';
import { AuthReq } from '../interfaces/middleware.interface';

const auth = (req: AuthReq, _: Response, next: NextFunction): void => {
  // get the token from the request header
  const bearerToken = req.header('Authorization');

  // check if token is available
  if (!bearerToken) return next(createError(401, 'No token, authorisation denied.'));

  const bearer = bearerToken.split(' ')[0];
  const token = bearerToken.split(' ')[1];

  if (bearer.trim() !== 'Bearer' || !token) return next();

  try {
    //if there is a token, then verify
    const decoded = jwt.verify(token, constants.accessTokenSecret);

    //add the user from payload
    req.user = decoded;
    next();
  } catch (e) {
    return next(createError('Token is not valid'));
  }
};

export default auth;
