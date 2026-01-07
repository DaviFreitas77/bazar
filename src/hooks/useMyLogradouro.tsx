

import { getMyLogradouro } from "@/api/logradouro.api"
import { useQuery } from "@tanstack/react-query"

export const useMyLogradouro = () =>{
  return useQuery({
    queryKey:["myLogradouro"],
    queryFn:()=>getMyLogradouro()
  })
}