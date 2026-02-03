

import { apiGetCategories } from "@/api/site/category.api"
import { useQuery } from "@tanstack/react-query"

export const useListCategories = () =>{
  return useQuery({
    queryKey:["categories"],
    queryFn:()=>apiGetCategories()
  })
}