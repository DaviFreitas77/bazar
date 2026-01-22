import type { login } from "@/@types/login";
import type { Register } from "@/@types/auth/register";
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
  const response = await api.get("/auth/profile");
  return response.data;
};
export const registerUser = async (data: Register) => {
  const response: AxiosResponse = await api.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data: login) => {
  const response: AxiosResponse = await api.post("/auth/login", data);
  return response.data;
};

export const logout = async () => {
  const response: AxiosResponse = await api.post(
    "/auth/logout",
    {},
    {

    }
  );

  return response;
};

