import { api } from "@/lib/api";
import type { AxiosResponse } from "axios";
import axios from "axios";

export const ensureCsrf = async () => {
  await axios.get("https://web-production-72b71.up.railway.app/sanctum/csrf-cookie", {
    withCredentials: true,
    withXSRFToken: true,
  });
};

export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
export const registerUser = async (data: Auth.register) => {
  const response: AxiosResponse = await axios.post("https://web-production-72b71.up.railway.app/auth/register", data,{
      withCredentials: true,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
  });
  return response.data;
};

export const loginUser = async (data: Auth.login) => {
  const response: AxiosResponse = await axios.post("https://web-production-72b71.up.railway.app/auth/login", data, {
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
 
  });
  return response.data;
};
