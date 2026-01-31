import { api } from "@/lib/api"


export const listSubCategoryByIdCategory = async(idCategory:number) => {
  const response = await api.get(`/subCategory/listSubCategories/${idCategory}`);
  return response.data.subCategories;

}