import Joi from 'joi';
import type { Attendance, StudentAttendance } from '@prisma/client';

export const addStudentToAttendanceSchema = Joi.object<StudentAttendance>({
  attendance_id: Joi.string().min(3).max(128).required(),
  student_id: Joi.string().min(3).max(128).required(),
});

export const createAttendanceSchema = Joi.object<Omit<Attendance, 'id' | 'created_at'>>({
  staff_id: Joi.string().min(3).max(128).required(),
  course_id: Joi.string().min(3).max(128).required(),
  name: Joi.string().min(3).max(128).required(),
  date: Joi.string().min(3).max(128).required(),
});

export const updateAttendanceSchema = Joi.object<Partial<Attendance>>({
  id: Joi.string().min(3).max(128).required(),
  staff_id: Joi.string().min(3).max(128),
  course_id: Joi.string().min(3).max(128),
  name: Joi.string().min(3).max(128),
  date: Joi.string().min(3).max(128),
});
