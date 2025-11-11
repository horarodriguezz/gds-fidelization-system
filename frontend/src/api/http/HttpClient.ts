export interface HttpRequestConfig {
  headers?: Record<string, string>;

  params?: Record<string, any>;
}

export interface HttpClient {
  get<T>(url: string, config?: HttpRequestConfig): Promise<T>;

  post<T, D = any>(
    url: string,
    data?: D,
    config?: HttpRequestConfig
  ): Promise<T>;

  put<T, D = any>(
    url: string,
    data?: D,
    config?: HttpRequestConfig
  ): Promise<T>;

  patch<T, D = any>(
    url: string,
    data?: D,
    config?: HttpRequestConfig
  ): Promise<T>;

  delete<T>(url: string, config?: HttpRequestConfig): Promise<T>;
}
