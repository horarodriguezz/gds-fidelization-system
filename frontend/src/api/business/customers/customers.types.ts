import type { PaginatedParams } from "../../types/Paginated";

/**
 * GET customers
 */
export interface GetCustomerParams extends PaginatedParams {
  search?: string;

  last_visited_before?: string;

  last_visited_after?: string;
}

/**
 * POST customer
 */

export interface CreateCustomerBody {
  first_name: string;

  last_name?: string;

  email?: string;

  phone_number: string;
}

/**
 * GET metrics
 */
export interface CustomersMetricsResponse {
  totalCustomers: number;

  totalVisits: number;

  totalPoints: number;

  visitsAverage: number;
}
