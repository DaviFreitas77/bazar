import axios from "axios";

const instance = axios.create({
  baseURL: "https://0de3-2804-214-8023-5dee-3889-2636-57ba-eb64.ngrok-free.app/api",
  headers:{
    "ngrok-skip-browser-warning": "true"
  }
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
