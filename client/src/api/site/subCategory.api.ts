import { api } from "@/lib/api"


export const listSubCategoryBynameCategory = async(nameCategory:string) => {
  const response = await api.get(`/subCategory/listSubCategories/${nameCategory}`);
  return response.data.subCategories;

}