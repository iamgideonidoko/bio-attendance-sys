import { Router } from 'express';
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getSingleCourse,
} from '../controllers/course.controller';
import { createCourseSchema, updateCourseSchema } from '../joi/course.joi';
import joiValidate from '../middlewares/joi.middleware';
import { paginateInputSchema } from '../joi/helper.joi';

const courseRoute = Router();

/*
@route 			GET /api/courses/staff/:id?page=$1 (get courses by a staff)
@description 	get courses
@access 		Public
*/
courseRoute.get('/courses/staff/:staff_id', joiValidate(paginateInputSchema, 'query'), getCourses);

/*
@route 			GET /api/course/:id/staff/:staff_id (get courses by a staff)
@description 	get single course by a staff
@access 		Public
*/
courseRoute.get('/course/:id', getSingleCourse);

/*
@route 			POST /api/course (create course)
@description 	add new course
@access 		Private
*/
courseRoute.post('/course', joiValidate(createCourseSchema), createCourse);

/*
@route 			PUT /api/course (update course)
@description update course
@access 		Private
*/
courseRoute.put('/course/:id', joiValidate(updateCourseSchema), updateCourse);

/*
@route 			DELETE /api/course (delete course)
@description 	delete course
@access 		Private
*/
courseRoute.delete('/course/:id', deleteCourse);

export default courseRoute;
