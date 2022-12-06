import Joi from 'joi';

export const loginStaffSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(15).required(),
});

export const logoutStaffSchema = Joi.object({
  staff_id: Joi.string().required(),
});

export const refreshStaffTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});
