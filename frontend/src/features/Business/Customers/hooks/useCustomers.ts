import { useStore } from "@nanostores/react";
import { keepPreviousData } from "@tanstack/react-query";
import {
  $customers,
  $customersPagination,
  $isLoadingCustomers,
  $last_visited_after,
  $last_visited_before,
  $metrics,
  $search,
} from "../../../../store/business/customer";
import { CustomersService } from "../../../../api/business/customers/customers.service";
import { useEffect } from "react";
import { useQuery } from "../../../../hooks/useQuery";

const service = new CustomersService();

export default function useCustomers() {
  const search = useStore($search);
  const last_visited_after = useStore($last_visited_after);
  const last_visited_before = useStore($last_visited_before);
  const current_page = useStore($customersPagination, {
    keys: ["currentPage", "perPage"],
  });

  const {
    data: response,
    error,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: [
      service.getResource(),
      search,
      last_visited_after,
      last_visited_before,
      current_page.currentPage,
      current_page.perPage,
    ],
    queryFn: ({ queryKey }) =>
      service.getCustomers({
        search: queryKey[1] as string,
        last_visited_after: queryKey[2] as string | undefined,
        last_visited_before: queryKey[3] as string | undefined,
        page: queryKey[4] as number,
        per_page: queryKey[5] as number,
      }),
    placeholderData: keepPreviousData,
  });

  const { isPending: metricsArePending, data: metrics } = useQuery({
    queryKey: [service.getResource(), "metrics"],
    queryFn: () => service.getCustomersMetrics(),
  });

  useEffect(() => {
    if (response?.data) {
      $customers.set(response.data);
      $customersPagination.set(response.pagination);
    }
  }, [response]);

  useEffect(() => {
    $isLoadingCustomers.set(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (metrics?.data) {
      $metrics.set(metrics.data);
    }
  }, [metrics]);

  return { error, isPending: isPending || metricsArePending };
}
