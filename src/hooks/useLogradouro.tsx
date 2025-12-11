import { getLogradouro } from "@/api/user.api"
import { useQuery } from "@tanstack/react-query"

export const useLogradouro = () =>{
  return useQuery({
    queryKey:["logradouro"],
    queryFn:getLogradouro
  })
}