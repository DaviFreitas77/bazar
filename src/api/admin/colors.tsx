import { api } from "@/lib/api";


export const getColors = async () => {
  const response = await api.get("/admin/colors");
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get("/admin/categories");
  return response.data;
};

export const getSizes = async () => {
  const response = await api.get("/admin/sizes");
  return response.data;
};