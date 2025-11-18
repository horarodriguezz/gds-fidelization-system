import { httpClient } from "../../http";
import { Service } from "../../http/Service";
import type { SuccessResponse } from "../../types/Response";
import type {
  CreateUserRequest,
  CreateUserResponse,
  GetUsersResponse,
} from "./users.types";

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

  public async createUser(
    data: CreateUserRequest
  ): Promise<SuccessResponse<CreateUserResponse>> {
    const response = await this.client.post<
      SuccessResponse<CreateUserResponse>,
      CreateUserRequest
    >(this.resource, data);

    return response;
  }

  public async deleteUser(userId: string): Promise<SuccessResponse> {
    const response = await this.client.delete<SuccessResponse>(
      `${this.resource}/${userId}`
    );

    return response;
  }

  public async updateUser(
    userId: string,
    data: CreateUserRequest
  ): Promise<SuccessResponse<CreateUserResponse>> {
    const response = await this.client.put<
      SuccessResponse<CreateUserResponse>,
      CreateUserRequest
    >(`${this.resource}/${userId}`, data);

    return response;
  }
}
