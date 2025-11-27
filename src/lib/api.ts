import axios from "axios";

const instance = axios.create({
  baseURL: "https://2c511dad9198.ngrok-free.app/api",
  withCredentials: true,
  withXSRFToken: true,
});

export const api = instance;
