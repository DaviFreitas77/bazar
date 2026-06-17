import { apiGetCardSaved, apiGetCustomer } from "@/api/site/customer.api"
import { useQuery } from "@tanstack/react-query"

export const useCustomer = () => {
    return useQuery({
        queryKey: ["customer"],
        queryFn: () => apiGetCustomer(),

    })
}



export const useGetCardsSaved = () => {
    return useQuery({
        queryKey: ["cardsSaved"],
        queryFn: () => apiGetCardSaved()
    })
}
