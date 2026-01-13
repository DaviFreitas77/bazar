import { api } from "@/lib/api";
import type { apiCategorie } from "./@types/categorie";



export const apiGetCategories = async () => {
  const response = await api.get<apiCategorie[]>("category/list");
  return response.data;
};
