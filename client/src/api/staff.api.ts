/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import type {
  RegisterStaffInput,
  RegisterStaffResult,
  LoginStaffInput,
  LoginStaffResult,
  BaseError,
} from '../interfaces/api.interface';
import { useBaseMutation } from '../helpers/store.helper';

export const useRegisterStaff = useBaseMutation<RegisterStaffResult, BaseError, RegisterStaffInput>('/staff/register');

export const useLoginStaff = useBaseMutation<LoginStaffResult, BaseError, LoginStaffInput>('/auth/staff/login');
