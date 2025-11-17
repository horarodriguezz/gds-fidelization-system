import type { AxiosInstance } from "axios";
import type { HttpClient, HttpRequestConfig } from "./HttpClient";
import axios from "axios";
import { BUSINESS_TOKEN_KEY } from "../../config/localStorage";

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

  private setupInterceptors() {
    this.client.interceptors.request.use((config) => {
      // validate if "localStorage" is available
      if (typeof localStorage === "undefined") {
        return config;
      }

      const token = localStorage.getItem(BUSINESS_TOKEN_KEY);

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
