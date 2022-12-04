import { Router } from 'express';
import { registerStaff } from '../controllers/staff.controller';
import { registerStaffSchema } from '../joi/staff.joi';
import joiValidate from '../middlewares/joi.middleware';

const staffRoute = Router();

/*
@route          POST /api/staff/register (register staff)
@description    Register a new staff.
@access         Public
*/

staffRoute.post('/staff/register', joiValidate(registerStaffSchema), registerStaff);

export default staffRoute;
