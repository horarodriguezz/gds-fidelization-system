import type { HttpStatusCode } from "axios";

export interface Paginated<T> {
  success: true;

  message: string | null;

  status: HttpStatusCode;

  data: T[];

  pagination: PaginationMetadata;
}

export interface PaginationMetadata {
  total: number;

  perPage: number;

  currentPage: number;

  lastPage: number;

  from: number | null;

  to: number | null;

  hasNextPage: boolean;

  hasPreviousPage: boolean;
}

export interface PaginatedParams {
  page?: number;

  per_page?: number;
}
