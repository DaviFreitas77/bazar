import axios from "axios";

const instance = axios.create({
  baseURL: "https://bazar-production-4a07.up.railway.app/api",
});

export const api = instance;

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
