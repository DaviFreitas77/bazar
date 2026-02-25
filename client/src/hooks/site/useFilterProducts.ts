import { apiFilterSubCategory } from "@/api/site/filter.api"
import { useQuery } from "@tanstack/react-query"


export const useFilterSubCategory = (name:string | null) =>{
  return useQuery({
    queryKey:["productsBySubCategory",name],
    queryFn:()=>apiFilterSubCategory(name),
    enabled:!!name
  
  })
}