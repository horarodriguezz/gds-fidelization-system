import { httpClient } from "../../http";
import { Service } from "../../http/Service";
import type { SuccessResponse } from "../../types/Response";
import type {
  CompleteRegistrationForm,
  LoginForm,
  LoginResponseData,
  MyInfoResponse,
  RegisterForm,
  ValidateUserRegistrationLinkResponse,
} from "./auth.types";

export class AuthService extends Service {
  constructor() {
    super(httpClient, "/business/auth");
  }

  public async register(data: RegisterForm): Promise<SuccessResponse> {
    const response = await this.client.post<SuccessResponse, RegisterForm>(
      `${this.resource}/register`,
      data
    );

    return response;
  }

  public async login(
    data: LoginForm
  ): Promise<SuccessResponse<LoginResponseData>> {
    const response = await this.client.post<
      SuccessResponse<LoginResponseData>,
      LoginForm
    >(`${this.resource}/login`, data);

    return response;
  }

  public async resendVerificationEmail(
    email: string
  ): Promise<SuccessResponse> {
    const response = await this.client.post<SuccessResponse>(
      `${this.resource}/revalidate-email`,
      { email }
    );

    return response;
  }

  public async logout(): Promise<SuccessResponse> {
    const response = await this.client.post<SuccessResponse>(
      `${this.resource}/logout`
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
      }/complete-registration/${userId}?signature=${encodeURIComponent(
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
    const response = await this.client.post<void>(
      `${this.resource}/complete-registration/${userId}`,
      data,
      { params: { signature, expires } }
    );

    return response;
  }

  public async getMyInfo(): Promise<SuccessResponse<MyInfoResponse>> {
    const response = await this.client.get<SuccessResponse<MyInfoResponse>>(
      `${this.resource}/me`
    );

    return response;
  }
}
