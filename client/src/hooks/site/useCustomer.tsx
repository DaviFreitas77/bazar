import { apiGetCustomer } from "@/api/site/customer.api"
import { useQuery } from "@tanstack/react-query"

export const useCustomer = () =>{
  return useQuery({
    queryKey:["customer"],
    queryFn:()=>apiGetCustomer(),
  

  })
}