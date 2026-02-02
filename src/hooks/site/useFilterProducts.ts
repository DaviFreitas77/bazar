import { apiFilterSubCategory } from "@/api/site/filter.api"
import { useQuery } from "@tanstack/react-query"


export const useFilterSubCategory = (name:string)=>{
  return useQuery({
    queryKey:["filterSubCategory",name],
    queryFn:()=>apiFilterSubCategory(name),
    enabled:!!name
  
  })
}