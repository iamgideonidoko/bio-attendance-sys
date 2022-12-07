/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import type {
  AddAttendanceInput,
  AddAttendanceResult,
  BaseError,
  GetAttendancesResult,
  UpdateAttendanceInput,
  UpdateAttendanceResult,
} from '../interfaces/api.interface';
import { useBaseMutation, useBaseQuery } from '../helpers/store.helper';
import { DeleteAttendanceResult } from '../interfaces/api.interface';

export const useAddAttendance = useBaseMutation<AddAttendanceResult, BaseError, AddAttendanceInput>('/attendance');

export const useGetAttendances = (staffId: string, page = 1, per_page = 10) =>
  useBaseQuery<GetAttendancesResult, BaseError>(`/attendances/staff/${staffId}?page=${page}&per_page=${per_page}`);

/* upon calling `mutate`, you can pass extra string data that will be attached to the url */
export const useDeleteAttendance = useBaseMutation<DeleteAttendanceResult, BaseError, { url: string }>(
  `/attendance`,
  'delete',
);

export const useUpdateAttendance = useBaseMutation<UpdateAttendanceResult, BaseError, UpdateAttendanceInput>(
  `/attendance`,
  'put',
);
