import { api } from "@/lib/api";

  export const listSubCategoryByIdCategory = async(îdCategory:Number) => {
    const response = await api.get(`/subCategory/listSubCategoriesByIdCategory/${îdCategory}`);
    return response.data.subCategories;
  
  }