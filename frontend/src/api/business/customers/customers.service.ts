import { httpClient } from "../../http";
import { Service } from "../../http/Service";
import type { CustomerBusinessModel } from "../../types/Models/CustomerBusinessModel";
import type { Paginated } from "../../types/Paginated";
import type { SuccessResponse } from "../../types/Response";
import type {
  CreateCustomerBody,
  CustomersMetricsResponse,
  GetCustomerParams,
} from "./customers.types";

export class CustomersService extends Service {
  constructor() {
    super(httpClient, "/business/customers");
  }

  public async getCustomers(params?: GetCustomerParams) {
    const { last_visited_after, last_visited_before, search, page, per_page } =
      params ?? {};

    const response = await this.client.get<Paginated<CustomerBusinessModel>>(
      `${this.resource}`,
      {
        params: {
          last_visited_after,
          last_visited_before,
          search,
          page,
          per_page,
        },
      }
    );

    return response;
  }

  public async createCustomer(data: CreateCustomerBody) {
    const response = await this.client.post(`${this.resource}`, data);

    return response;
  }

  public async updateCustomer(customerId: string, data: CreateCustomerBody) {
    const response = await this.client.put(
      `${this.resource}/${customerId}`,
      data
    );

    return response;
  }

  public async deleteCustomer(customerId: string) {
    const response = await this.client.delete(`${this.resource}/${customerId}`);

    return response;
  }

  public async getCustomersMetrics() {
    const response = await this.client.get<
      SuccessResponse<CustomersMetricsResponse>
    >(`${this.resource}/metrics`);

    return response;
  }
}
