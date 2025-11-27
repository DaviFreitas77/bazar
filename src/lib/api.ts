import axios from "axios";

const instance = axios.create({
  baseURL: "http://web-production-72b71.up.railway.app/api",
  withCredentials: true,
  withXSRFToken: true,
});

export const api = instance;
