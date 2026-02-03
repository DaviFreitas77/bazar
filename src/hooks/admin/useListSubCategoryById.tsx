



import { listSubCategoryByIdCategory } from "@/api/admin/subCategorieApiAdmin"
import { useQuery } from "@tanstack/react-query"

export const useListSubCategoriesById = (idCategory:number)=>{
  return useQuery({
    queryKey: ['subCategories',idCategory],
    queryFn: () => listSubCategoryByIdCategory(idCategory),
    enabled: !!idCategory
  })
}