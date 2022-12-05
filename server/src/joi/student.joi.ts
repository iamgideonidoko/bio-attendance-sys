import Joi from 'joi';
import type { Student } from '@prisma/client';

export const createStudentSchema = Joi.object<Omit<Student, 'id' | 'created_at'> & { courses: string[] }>({
  name: Joi.string().min(2).max(128).required(),
  matric_no: Joi.string().min(3).max(128).required(),
  fingerprint: Joi.string().min(2).max(1000).required(),
  courses: Joi.array().items(Joi.string().min(3).max(128)).required,
});

export const updateStudentSchema = Joi.object<Partial<Student> & { courses: string[] }>({
  id: Joi.string().min(3).max(128).required(),
  name: Joi.string().min(2).max(128).required(),
  matric_no: Joi.string().min(3).max(128).required(),
  fingerprint: Joi.string().min(2).max(1000).required(),
  courses: Joi.array().items(Joi.string().min(3).max(128)),
});
