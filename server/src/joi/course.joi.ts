import Joi from 'joi';
import type { Course } from '@prisma/client';

export const createCourseSchema = Joi.object<Omit<Course, 'id' | 'created_at'>>({
  course_name: Joi.string().min(2).max(128).required(),
  staff_id: Joi.string().min(3).max(128).required(),
  course_code: Joi.string().min(2).max(128).required(),
});

export const updateCourseSchema = Joi.object<Partial<Course>>({
  id: Joi.string().min(3).max(128).required(),
  course_name: Joi.string().min(2).max(128),
  staff_id: Joi.string().min(3).max(128),
  course_code: Joi.string().min(2).max(128),
});
