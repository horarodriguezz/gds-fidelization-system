import type { UserModel } from "../../types/Models/User";

/**
 * GET users
 */
export interface GetUsersResponse {
  users: UserModel[];
}
