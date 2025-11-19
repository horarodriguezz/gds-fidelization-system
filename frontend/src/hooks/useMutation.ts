import { useMutation as useReactQueryMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";

export default function useMutation<TVariables, TData>(
  options: UseMutationOptions<TData, unknown, TVariables>
) {
  const mutation = useReactQueryMutation<TData, unknown, TVariables>(
    options,
    queryClient
  );

  return mutation;
}
