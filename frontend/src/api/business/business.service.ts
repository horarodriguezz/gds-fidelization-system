import { httpClient } from "../http";
import type { SuccessResponse } from "../types/Response";
import type {
  CompleteRegistrationForm,
  LoginForm,
  LoginResponseData,
  RegisterForm,
  ValidateUserRegistrationLinkResponse,
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

  public async validateUserRegistgrationLink(
    userId: string,
    signature: string,
    expires: string
  ): Promise<SuccessResponse<ValidateUserRegistrationLinkResponse>> {
    const response = await httpClient.get<
      SuccessResponse<ValidateUserRegistrationLinkResponse>
    >(
      `${
        this.resource
      }/auth/complete-registration/${userId}?signature=${encodeURIComponent(
        signature
      )}&expires=${encodeURIComponent(expires)}`
    );

    return response;
  }

  public async completeUserRegistration(
    userId: string,
    signature: string,
    expires: string,
    data: CompleteRegistrationForm
  ): Promise<void> {
    const response = await httpClient.post<void>(
      `${this.resource}/auth/complete-registration/${userId}`,
      data,
      { params: { signature, expires } }
    );

    return response;
  }
}
