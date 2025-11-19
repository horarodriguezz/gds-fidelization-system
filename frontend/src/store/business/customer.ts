import { atom, map } from "nanostores";
import type { CustomerBusinessModel } from "../../api/types/Models/CustomerBusinessModel";
import type { PaginationMetadata } from "../../api/types/Paginated";
import type { CustomersMetricsResponse } from "../../api/business/customers/customers.types";
import type { CustomerModel } from "../../api/types/Models/CustomerModel";

export const $search = atom("");
export const $last_visited_after = atom<string | undefined>(undefined);
export const $last_visited_before = atom<string | undefined>(undefined);
export const $current_page = atom(1);

export const $metrics = atom<CustomersMetricsResponse | null>(null);

export const $customers = atom<CustomerBusinessModel[]>([]);

export const $customersPagination = map<PaginationMetadata>({
  currentPage: 1,
  total: 0,
  perPage: 10,
  hasNextPage: false,
  hasPreviousPage: false,
  lastPage: 1,
  from: null,
  to: null,
});

export const $isLoadingCustomers = atom(false);

export const $customerPopupOpen = atom(false);

export const $editingCustomer = atom<CustomerModel | undefined>(undefined);
