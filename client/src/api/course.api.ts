/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import type { AddCourseInput, AddCourseResult, BaseError } from '../interfaces/api.interface';
import { useBaseMutation } from '../helpers/store.helper';

export const useAddCourse = useBaseMutation<AddCourseResult, BaseError, AddCourseInput>('/course');
