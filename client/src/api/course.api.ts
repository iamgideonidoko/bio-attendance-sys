/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import type { AddCourseInput, AddCourseResult } from '../interfaces/api.interface';
import { useBaseMutation } from '../helpers/store.helper';

export const useAddCourse = useBaseMutation<AddCourseResult, AddCourseInput>('/course');
