import Joi from 'joi';

export const registerStaffSchema = Joi.object({
  name: Joi.string().min(3).max(128).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(15).required(),
  retype_password: Joi.ref('password'),
}).with('password', 'retype_password');
