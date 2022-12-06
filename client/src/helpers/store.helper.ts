import type { UseMutationOptions, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosClient } from '../lib/axios-client';

export function useBaseMutation<TRes = unknown, TError = unknown, TData = unknown, TContext = unknown>(
  url: string,
  method: 'post' | 'put' | 'delete' = 'post',
) {
  return (useMutationOptions: Omit<UseMutationOptions<TRes, TError, TData, TContext>, 'mutationFn'> = {}) =>
    useMutation<TRes, TError, TData, TContext>(
      async (data) =>
        method === 'delete' ? (await axiosClient[method](url)).data : (await axiosClient[method](url, data)).data,
      useMutationOptions,
    );
}

export function useBaseQuery<
  TQueryFnData = unknown,
  TQueryKey extends QueryKey = QueryKey,
  TError = unknown,
  TData = TQueryFnData,
>(url: string) {
  return (useQueryOptions: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryFn'> = {}) =>
    useQuery<TQueryFnData, TError, TData, TQueryKey>({
      ...useQueryOptions,
      queryFn: async () => (await axiosClient.get(url)).data,
    });
}
