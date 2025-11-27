import axios from "axios";

const instance = axios.create({
  baseURL: "web-production-72b71.up.railway.app/api",
  withCredentials: true,
  withXSRFToken: true,
});

export const api = instance;
