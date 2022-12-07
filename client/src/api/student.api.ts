/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import type {
  AddStudentInput,
  AddStudentResult,
  BaseError,
  GetStudentsResult,
  UpdateStudentInput,
  UpdateStudentResult,
} from '../interfaces/api.interface';
import { useBaseMutation, useBaseQuery } from '../helpers/store.helper';
import { DeleteStudentResult } from '../interfaces/api.interface';

export const useAddStudent = useBaseMutation<AddStudentResult, BaseError, AddStudentInput>('/student');

export const useGetStudents = (staffId: string, page = 1, per_page = 10) =>
  useBaseQuery<GetStudentsResult, BaseError>(`/students/staff/${staffId}?page=${page}&per_page=${per_page}`);

/* upon calling `mutate`, you can pass extra string data that will be attached to the url */
export const useDeleteStudent = useBaseMutation<DeleteStudentResult, BaseError, { url: string }>(`/student`, 'delete');

export const useUpdateStudent = useBaseMutation<UpdateStudentResult, BaseError, UpdateStudentInput>(`/student`, 'put');
