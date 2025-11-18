import { httpClient } from "../../http";
import { Service } from "../../http/Service";
import type { SuccessResponse } from "../../types/Response";
import type { GetUsersResponse } from "./users.types";

export class UsersService extends Service {
  constructor() {
    super(httpClient, "/business/users");
  }

  public async getUsers(): Promise<SuccessResponse<GetUsersResponse>> {
    const response = await this.client.get<SuccessResponse<GetUsersResponse>>(
      this.resource
    );

    return response;
  }
}
