import { listSubCategoryBynameCategory } from "@/api/site/subCategory.api"
import { useQuery } from "@tanstack/react-query"


export const useListSubCategories = (nameCategory:string)=>{
  return useQuery({
    queryKey: ['subCategories',nameCategory],
    queryFn: () => listSubCategoryBynameCategory(nameCategory),
    enabled: !!nameCategory
  })
}