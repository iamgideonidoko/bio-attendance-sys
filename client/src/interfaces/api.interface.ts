import type { StaffInfo, Tokens } from '../interfaces/store.interface';
import { AxiosError } from 'axios';

/* STAFF */
export interface RegisterStaffInput {
  name: string;
  email: string;
  password: string;
  retype_password: string;
}

export interface BaseResult<TData> {
  message: string;
  status: 'sucess';
  statusCode: number;
  data: TData;
}

export type BaseError = AxiosError<{
  message: string;
  status: string;
  statusCode: number;
}>;

export type RegisterStaffResult = BaseResult<{
  staff: Tokens & {
    staff: StaffInfo;
  };
}>;

export interface LoginStaffInput {
  email: string;
  password: string;
}

export type LoginStaffResult = RegisterStaffResult;

/* COURSE */

export interface Course {
  id: string;
  course_name: string;
  course_code: string;
  created_at: string;
}

export interface AddCourseInput {
  staff_id: string;
  course_name: string;
  course_code: string;
}

export type AddCourseResult = BaseResult<{
  course: Course;
}>;
