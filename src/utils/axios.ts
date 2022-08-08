import axios from "axios";
import { parseCookies } from "nookies";

export const api = axios.create();

export function getAPIClient(ctx?: any) {
  const { "nextauth.token": token } = parseCookies(ctx);

  api.interceptors.request.use((config) => {
    return config;
  });

  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return api;
}
