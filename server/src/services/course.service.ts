import createError from 'http-errors';
import { prisma } from '../db/prisma-client';
import type { Course } from '@prisma/client';

export const saveCourseToDb = (course: Omit<Course, 'id'>): Promise<Course> => {
  return new Promise<Course>(async (resolve, reject) => {
    try {
      const savedCourse = await prisma.course.create({
        data: course,
      });
      resolve(savedCourse);
    } catch (err) {
      reject(err);
    }
  });
};

export const removeCourseFromDb = (courseId: string): Promise<boolean> => {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      const res = await prisma.course.delete({
        where: {
          id: courseId,
        },
      });
      if (res) resolve(true);
      reject(new createError.NotFound('Course not found'));
    } catch (err) {
      reject(err);
    }
  });
};

export const updateCourseInDb = (id: string, newUpdate: Partial<Course>): Promise<Course> => {
  return new Promise<Course>(async (resolve, reject) => {
    try {
      const course = await prisma.course.update({
        where: {
          id,
        },
        data: newUpdate,
      });
      resolve(course);
    } catch (err) {
      reject(err);
    }
  });
};
