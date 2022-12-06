/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import type { AddCourseInput, AddCourseResult, BaseError, GetCoursesResult } from '../interfaces/api.interface';
import { useBaseMutation, useBaseQuery } from '../helpers/store.helper';

export const useAddCourse = useBaseMutation<AddCourseResult, BaseError, AddCourseInput>('/course');

export const useGetCourses = (staffId: string, page = 1, per_page = 10) =>
  useBaseQuery<GetCoursesResult, BaseError>(`/courses/staff/${staffId}?page=${page}&per_page=${per_page}`);
