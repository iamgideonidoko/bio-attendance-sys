import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { addStaffToDb } from '../services/staff.service';
import { createSuccess } from '../helpers/http.helper';

export const registerStaff = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, retype_password } = req.body;

  //check if all input fields have value
  if (!name || !email || !password || !retype_password) {
    return next(createError(400, 'Please, enter all fields'));
  }

  if (password !== retype_password) {
    return next(createError(400, 'Passwords must be same'));
  }

  try {
    const registeredStaff = await addStaffToDb(req.body);
    if (registeredStaff) {
      return createSuccess(res, 200, 'Staff registered successfully', { staff: registeredStaff });
    }
  } catch (err) {
    return next(err);
  }
};
