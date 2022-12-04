import type { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { delRefreshToken, getNewTokens, getStaffFromDb } from '../services/auth.service';
import { createSuccess } from '../helpers/http.helper';

export const loginStaff = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  //check if all input fields have value
  if (!email || !password) {
    return next(createError(400, 'Please, enter all fields'));
    // return createSuccess(res, 200, 'Staff created');
  }

  try {
    const loggedInStaff = await getStaffFromDb(email, password);
    if (loggedInStaff) {
      return createSuccess(res, 200, 'Staff logged in successfully', { staff: loggedInStaff });
    }
  } catch (err) {
    return next(err);
  }
};

export const refreshStaffToken = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body;

  //check if all input fields have value
  if (!refreshToken) {
    return next(createError(400, 'Please, enter all fields'));
  }

  try {
    const tokens = await getNewTokens(refreshToken);
    if (tokens) {
      return createSuccess(res, 200, 'Token refreshed successfully', tokens);
    }
  } catch (err) {
    return next(err);
  }
};

export const logoutStaff = async (req: Request, res: Response, next: NextFunction) => {
  const { staff_id } = req.body;

  //check if all input fields have value
  if (!staff_id) {
    return next(createError(400, 'Please, enter all fields'));
  }

  try {
    await delRefreshToken(staff_id);
    return createSuccess(res, 200, 'Staff logged out successfully', {});
  } catch (err) {
    return next(err);
  }
};
