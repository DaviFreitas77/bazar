import axios from "axios";

const instance = axios.create({
  baseURL: "https://web-production-72b71.up.railway.app/api",
  withCredentials: true,
  withXSRFToken: true,
   xsrfCookieName: 'XSRF-TOKEN', 
  xsrfHeaderName: 'X-XSRF-TOKEN',
});

export const api = instance;
