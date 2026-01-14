import axios from "axios";

const instance = axios.create({
  baseURL: "http://web-production-edc6.up.railway.app/api",
  withCredentials: true,
  withXSRFToken: true,
});

export const api = instance;
