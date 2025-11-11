import { httpClient } from "../http";
import type { SuccessResponse } from "../types/Response";
import type {
  LoginForm,
  LoginResponseData,
  RegisterForm,
} from "./business.types";

export class BusinessService {
  private resource = "/business";

  public async register(data: RegisterForm): Promise<SuccessResponse> {
    const response = await httpClient.post<SuccessResponse, RegisterForm>(
      `${this.resource}/auth/register`,
      data
    );

    return response;
  }

  public async login(
    data: LoginForm
  ): Promise<SuccessResponse<LoginResponseData>> {
    const response = await httpClient.post<
      SuccessResponse<LoginResponseData>,
      LoginForm
    >(`${this.resource}/auth/login`, data);

    return response;
  }

  public async resendVerificationEmail(
    email: string
  ): Promise<SuccessResponse> {
    const response = await httpClient.post<SuccessResponse>(
      `${this.resource}/auth/revalidate-email`,
      { email }
    );

    return response;
  }

  public async logout(): Promise<SuccessResponse> {
    const response = await httpClient.post<SuccessResponse>(
      `${this.resource}/auth/logout`
    );

    return response;
  }
}
