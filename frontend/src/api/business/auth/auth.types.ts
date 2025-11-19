import { z } from "astro/zod";
import type { UserModel } from "../../types/Models/User";
import type { Role } from "../../types/Enums/Role";

/**
 * POST register
 */
export interface RegisterForm {
  first_name: string;

  last_name?: string;

  email: string;

  password: string;

  password_confirmation: string;

  business_name: string;
}

/**
 * POST login
 */
export interface LoginForm {
  email: string;

  password: string;
}

export interface LoginResponseData {
  token: string;
}

/**
 * GET validateUserRegistgrationLink
 */

export interface ValidateUserRegistrationLinkResponse {
  user: UserModel;
}

/**
 * POST complete registration
 */

export interface CompleteRegistrationForm {
  first_name: string;

  last_name?: string;

  email: string;

  password: string;

  password_confirmation: string;

  phone_number?: string;

  role: Role;
}

/**
 * GET my info
 */

export interface MyInfoResponse {
  user: UserModel;
}
