import { Router } from 'express';
import { loginStaff, logoutStaff, refreshStaffToken } from '../controllers/auth.controller';
import joiValidate from '../middlewares/joi.middleware';
import { loginStaffSchema, logoutStaffSchema, refreshStaffTokenSchema } from '../joi/auth.joi';

const authRoute = Router();

/*
@route 			POST /api/auth/login (login staff)
@description 	authenticate staff.
@access 		Public
*/
authRoute.post('/auth/staff/login', joiValidate(loginStaffSchema), loginStaff);

/*
@route 			POST /api/auth/login (logout staff)
@description 	logout staff
@access 		Public
*/
authRoute.post('/auth/staff/logout', joiValidate(logoutStaffSchema), logoutStaff);

/*
@route 			POST /api/auth/refresh (refresh token)
@description 	refresh staff token
@access 		Public
*/
authRoute.post('/auth/staff/refresh', joiValidate(refreshStaffTokenSchema), refreshStaffToken);

export default authRoute;
