import type { CustomerModel } from "./CustomerModel";

export interface CustomerBusinessModel {
  customer: CustomerModel;

  businessId: string;

  createdAt: string;

  lastVisitAt: string | null;

  cachedPoints: number;
}
