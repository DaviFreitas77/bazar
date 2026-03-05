import axios from "axios";

const instance = axios.create({
  baseURL: "https://back-end-production-fef8.up.railway.app/api",
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
