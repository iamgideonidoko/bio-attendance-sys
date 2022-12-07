import type { Request, Response, NextFunction } from 'express';
import { createSuccess } from '../helpers/http.helper';
import createError from 'http-errors';
import { checkIfCourseExists, removeCourseFromDb, saveCourseToDb, updateCourseInDb } from '../services/course.service';
import { prisma } from '../db/prisma-client';
import type { Course } from '@prisma/client';
import type { PaginationMeta } from '../interfaces/helper.interface';

export const getCourses = async (req: Request, res: Response, next: NextFunction) => {
  // get courses that belongs to single staff
  const { staff_id } = req.params;
  const { per_page, page } = req.query;
  if (!staff_id) return next(new createError.BadRequest('Staff ID is required'));
  if (!per_page || !page) return next(new createError.BadRequest('Pagination info is required'));
  try {
    const courseCount = await prisma.course.count({
      where: {
        staff_id,
      },
    });
    const courses = await prisma.course.findMany({
      where: {
        staff_id,
      },
      skip: (Number(page) - 1) * Number(per_page),
      take: (Number(page) - 1) * Number(per_page) + Number(per_page),
      orderBy: {
        created_at: 'desc',
      },
    });
    const meta: PaginationMeta = {
      total_items: courseCount,
      total_pages: Math.ceil(courseCount / Number(per_page)) || 1,
      page: Number(page),
      per_page: Number(per_page),
    };
    return createSuccess(res, 200, 'Course fetched successfully', { courses, meta });
  } catch (err) {
    return next(err);
  }
};

export const getSingleCourse = async (req: Request, res: Response, next: NextFunction) => {
  // get courses that belongs to single staff
  const { id } = req.params;
  if (!id) return next(new createError.BadRequest('Course ID is required'));
  try {
    const course = await prisma.course.findUnique({
      where: {
        id,
      },
    });
    if (!course) throw new createError.NotFound('Course not found');
    return createSuccess(res, 200, 'Course fetched successfully', { course });
  } catch (err) {
    return next(err);
  }
};

export const createCourse = async (req: Request, res: Response, next: NextFunction) => {
  // create course
  const { staff_id, course_name, course_code } = req.body as Omit<Course, 'id' | 'created_at'>;

  if (!staff_id) return next(new createError.BadRequest('No staff ID provided'));

  if (!course_code) {
    return next(createError(400, 'The course_code field is required.'));
  }
  try {
    const courseExists = await checkIfCourseExists(course_code, staff_id);
    if (courseExists) {
      return next(
        createError(
          400,
          ...[
            {
              message: 'Course with the same code already exists.',
              errorType: 'COURSE_ALREADY_EXISTS',
            },
          ],
        ),
      );
    }
    const newCourse = { staff_id, course_name, course_code, created_at: new Date() };
    const savedCourse = await saveCourseToDb(newCourse);
    return createSuccess(res, 200, 'Course created successfully', { course: savedCourse });
  } catch (err) {
    return next(err);
  }
};

export const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
  // update course
  const { id } = req.params;
  if (!id) return next(createError(400, 'No course ID provided'));
  const newUpdate = req.body as Partial<Course>;
  try {
    const updatedCourse = await updateCourseInDb(id, newUpdate);
    return createSuccess(res, 200, 'Course updated successfully', { course: updatedCourse });
  } catch (err) {
    return next(err);
  }
};

export const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
  // delete course
  const { id } = req.params;
  if (!id) return next(createError(400, 'No course ID provided'));
  try {
    await removeCourseFromDb(id);
    return createSuccess(res, 200, 'Course deleted successfully', { deleted: true });
  } catch (err) {
    return next(err);
  }
};
