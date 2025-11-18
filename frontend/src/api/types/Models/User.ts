import type { Role } from "../Enums/Role";

export interface UserModel {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  role: Role;
  createdAt: string;
  isActive: boolean;
}
