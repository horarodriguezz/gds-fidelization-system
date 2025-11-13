import { AxiosHttpClient } from "./AxiosHttpClient";

const baseURL = import.meta.env.PUBLIC_API_BASE_URL || "http://localhost/api";

export const httpClient = new AxiosHttpClient(baseURL);
