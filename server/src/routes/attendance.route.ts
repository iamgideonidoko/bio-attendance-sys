import { Router } from 'express';
import {
  getAttendances,
  createAttendance,
  updateAttendance,
  deleteAttendance,
  getSingleAttendance,
} from '../controllers/attendance.controller';
import { addStudentToAttendanceSchema, createAttendanceSchema, updateAttendanceSchema } from '../joi/attendance.joi';
import joiValidate from '../middlewares/joi.middleware';
import { paginateInputSchema } from '../joi/helper.joi';
import { addStudentToAttendance, getAttendanceList } from '../controllers/attendance.controller';

const attendanceRoute = Router();

/*
@route 			GET /api/attendance/:attendance_id/students (get attendance list)
@description 	get attendance list
@access 		Public
*/
attendanceRoute.get('/attendance/:attendance_id/students', getAttendanceList);

/*
@route 			GET /api/attendances/staff/:id?page=$1 (get attendances by a staff)
@description 	get attendances
@access 		Public
*/
attendanceRoute.get('/attendances/staff/:staff_id', joiValidate(paginateInputSchema, 'query'), getAttendances);

/*
@route 			GET /api/attendance/:id/staff/:staff_id (get attendances by a staff)
@description 	get single attendance by a staff
@access 		Public
*/
attendanceRoute.get('/attendance/:id', getSingleAttendance);

/*
@route 			POST /api/attendance/student (create attendance)
@description 	add new attendance
@access 		Private
*/
attendanceRoute.post('/attendance/student', joiValidate(addStudentToAttendanceSchema), addStudentToAttendance);

/*
@route 			POST /api/attendance (create attendance)
@description 	add new attendance
@access 		Private
*/
attendanceRoute.post('/attendance', joiValidate(createAttendanceSchema), createAttendance);

/*
@route 			PUT /api/attendance (update attendance)
@description update attendance
@access 		Private
*/
attendanceRoute.put('/attendance/:id', joiValidate(updateAttendanceSchema), updateAttendance);

/*
@route 			DELETE /api/attendance (delete attendance)
@description 	delete attendance
@access 		Private
*/
attendanceRoute.delete('/attendance/:id', deleteAttendance);

export default attendanceRoute;
