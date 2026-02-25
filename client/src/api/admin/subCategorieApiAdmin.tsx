import { api } from "@/lib/api";

export const listSubCategoryByIdCategory = async (îdCategory: Number) => {
  const response = await api.get(`/subCategory/listSubCategoriesByIdCategory/${îdCategory}`);
  return response.data.subCategories;

}

export const apiCreateSubCategory = async (idCategory: number, name: string) => {
  const response = await api.post('/subCategory/create', { idCategory, name })
  return response.data
}


