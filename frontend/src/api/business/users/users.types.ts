import type { UserModel } from "../../types/Models/User";

/**
 * GET users
 */
export interface GetUsersResponse {
  users: UserModel[];
}

/**
 * POST create user
 */
export interface CreateUserRequest {
  first_name: string;
  last_name?: string;
  email: string;
  phone_number?: string;
  role: string;
}

export interface CreateUserResponse {
  user: UserModel;
}
