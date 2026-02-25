import { api } from "@/lib/api";
import type { apiCategorie } from "../@types/categorie";


export const getCategories = async () => {
  const response = await api.get<apiCategorie[]>("category/list");
  return response.data;
};

export const apiCreateCategory = async(category:string) =>{
  const response = await api.post("/category/create",{name:category})
  return response.data;
}