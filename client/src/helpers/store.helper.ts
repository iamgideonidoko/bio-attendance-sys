import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { axiosClient } from '../lib/axios-client';

export function useBaseMutation<TRes = unknown, TData = unknown>(url: string) {
  return (useMutationOptions: Omit<UseMutationOptions<TRes, unknown, TData, unknown>, 'mutationFn'> = {}) =>
    useMutation<TRes, unknown, TData>(async (data) => (await axiosClient.post(url, data)).data, useMutationOptions);
}
