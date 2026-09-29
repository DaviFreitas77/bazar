import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
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
