import { z } from "astro/zod";

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
