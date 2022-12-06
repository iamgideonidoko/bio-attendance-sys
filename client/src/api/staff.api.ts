/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import type { RegisterStaffInput, RegisterStaffResult } from '../interfaces/api.interface';
import { useBaseMutation } from '../helpers/store.helper';

export const useRegisterStaff = useBaseMutation<RegisterStaffResult, RegisterStaffInput>('/staff/register');
