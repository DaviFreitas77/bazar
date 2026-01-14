import type { login } from "@/components/auth/types/login";
import type { Register } from "@/components/auth/types/register";
import type { AxiosResponse } from "axios";
import axios from "axios";

export const ensureCsrf = async () => {
  await axios.get("https://web-production-edc6.up.railway.app/sanctum/csrf-cookie", {
    withCredentials: true,
    withXSRFToken: true,                                                                                                                                                                                                                                                                                                                                        
  });
};

export const getMe = async () => {
  const response = await axios.get("https://web-production-edc6.up.railway.app/auth/profile", {
    withCredentials: true,
    withXSRFToken: true,
  });
  return response.data;
};
export const registerUser = async (data: Register) => {
  const response: AxiosResponse = await axios.post("https://web-production-edc6.up.railway.app/auth/register", data, {
    withCredentials: true,
    withXSRFToken: true,
  });
  return response.data;
};

export const loginUser = async (data: login) => {
  const response: AxiosResponse = await axios.post("https://web-production-edc6.up.railway.app/auth/login", data, {
    withCredentials: true,
    withXSRFToken: true,
  });
  return response.data;
};

export const logout = async () => {
  const response: AxiosResponse = await axios.post(
    "https://web-production-edc6.up.railway.app/auth/logout",
    {},
    {
      withCredentials: true,
      withXSRFToken: true,
    }
  );

  return response;
};
