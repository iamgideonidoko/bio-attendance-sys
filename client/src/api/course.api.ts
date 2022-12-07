/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import type {
  AddCourseInput,
  AddCourseResult,
  BaseError,
  GetCoursesResult,
  UpdateCourseInput,
  UpdateCourseResult,
} from '../interfaces/api.interface';
import { useBaseMutation, useBaseQuery } from '../helpers/store.helper';
import { DeleteCourseResult } from '../interfaces/api.interface';

export const useAddCourse = useBaseMutation<AddCourseResult, BaseError, AddCourseInput>('/course');

export const useGetCourses = (staffId: string, page = 1, per_page = 10) =>
  useBaseQuery<GetCoursesResult, BaseError>(`/courses/staff/${staffId}?page=${page}&per_page=${per_page}`);

/* upon calling `mutate`, you can pass extra string data that will be attached to the url */
export const useDeleteCourse = useBaseMutation<DeleteCourseResult, BaseError, { url: string }>(`/course`, 'delete');

export const useUpdateCourse = useBaseMutation<UpdateCourseResult, BaseError, UpdateCourseInput>(`/course`, 'put');
