

import { getMyLogradouro } from "@/api/site/logradouro.api"
import { useQuery } from "@tanstack/react-query"

export const useMyLogradouro = () =>{
  return useQuery({
    queryKey:["myLogradouro"],
    queryFn:()=>getMyLogradouro()
  })
}