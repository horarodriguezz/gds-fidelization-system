import {
  useQuery as useReactQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";

export function useQuery<TData = unknown, TError = unknown>(
  options: UseQueryOptions<TData, TError>,
  query = queryClient
) {
  return useReactQuery<TData, TError>(options, query);
}
