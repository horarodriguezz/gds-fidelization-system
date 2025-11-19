import type { HttpStatusCode } from "axios";

export interface SuccessResponse<T = null> {
  success: true;

  message: string | null;

  status: HttpStatusCode;

  data: T;
}
