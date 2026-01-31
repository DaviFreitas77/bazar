import { listSubCategoryByIdCategory } from "@/api/site/subCategory.api"
import { useQuery } from "@tanstack/react-query"


export const useListSubCategories = (idCategory:number)=>{
  return useQuery({
    queryKey: ['subCategories',idCategory],
    queryFn: () => listSubCategoryByIdCategory(idCategory),
    enabled: !!idCategory
  })
}