
import { getMyLogradouro } from "@/api/user.api"
import { useQuery } from "@tanstack/react-query"

export const useMyLogradouro = () =>{
  return useQuery({
    queryKey:["myLogradouro"],
    queryFn:()=>getMyLogradouro()
  })
}