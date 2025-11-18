import type { AxiosInstance } from "axios";
import type { HttpClient, HttpRequestConfig } from "./HttpClient";
import axios from "axios";
import { CookieName } from "../../config/cookies";

export class AxiosHttpClient implements HttpClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    this.setupInterceptors();
  }

  public setAuthorizationToken(token: string) {
    this.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  private setupInterceptors() {
    function getCookie(name: string): string | undefined {
      if (typeof document === "undefined") return undefined;

      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
    }

    this.client.interceptors.request.use((config) => {
      const token = getCookie(CookieName.BUSINESS_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.client.interceptors.response.use(
      (r) => r,
      (error) => {
        console.error("API Error:", error);
        throw error.response?.data || error;
      }
    );
  }

  async get<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    const { data } = await this.client.get(url, config);
    return data;
  }

  async post<T, D = any>(
    url: string,
    data?: D,
    config?: HttpRequestConfig
  ): Promise<T> {
    const { data: res } = await this.client.post(url, data, config);
    return res;
  }

  async put<T, D = any>(
    url: string,
    data?: D,
    config?: HttpRequestConfig
  ): Promise<T> {
    const { data: res } = await this.client.put(url, data, config);
    return res;
  }

  async patch<T, D = any>(
    url: string,
    data?: D,
    config?: HttpRequestConfig
  ): Promise<T> {
    const { data: res } = await this.client.patch(url, data, config);
    return res;
  }

  async delete<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    const { data: res } = await this.client.delete(url, config);
    return res;
  }
}
