import type { login } from "@/components/auth/types/login";
import type { Register } from "@/components/auth/types/register";
import { api } from "@/lib/api";
import type { AxiosResponse } from "axios";
import axios from "axios";

export const ensureCsrf = async () => {
  await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
    withCredentials: true,
    withXSRFToken: true,
  });
};

export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
export const registerUser = async (data: Register) => {
  const response: AxiosResponse = await axios.post("http://localhost:8000/auth/register", data, {
    withCredentials: true,
    withXSRFToken: true,
  });
  return response.data;
};

export const loginUser = async (data: login) => {
  const response: AxiosResponse = await axios.post("http://localhost:8000/auth/login", data, {
    withCredentials: true,
    withXSRFToken: true,
  });
  return response.data;
};




export const logout = async () => {
  const response: AxiosResponse = await axios.post(
    "http://localhost:8000/auth/logout",
    {},
    {
      withCredentials: true,
      withXSRFToken: true,
    }
  );

  return response;
};
