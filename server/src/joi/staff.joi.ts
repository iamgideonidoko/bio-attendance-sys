import Joi from 'joi';
import type { NewStaff } from '../interfaces/staff.interface';

export const registerStaffSchema = Joi.object<NewStaff>({
  name: Joi.string().min(2).max(128).required(),
  email: Joi.string().email().min(2).max(128).required(),
  password: Joi.string().min(4).max(15).required(),
  retype_password: Joi.ref('password'),
}).with('password', 'retype_password');
