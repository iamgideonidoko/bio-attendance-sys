/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import type {
  RegisterStaffInput,
  RegisterStaffResult,
  LoginStaffInput,
  LoginStaffResult,
} from '../interfaces/api.interface';
import { useBaseMutation } from '../helpers/store.helper';

export const useRegisterStaff = useBaseMutation<RegisterStaffResult, RegisterStaffInput>('/staff/register');

export const useLoginStaff = useBaseMutation<LoginStaffResult, LoginStaffInput>('/auth/staff/login');
