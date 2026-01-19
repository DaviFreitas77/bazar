import { apiGetProductById } from "@/api/site/products.api";
import { useQuery } from "@tanstack/react-query";

export const useProductById = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => {
      return apiGetProductById(id);
    },
    enabled: !!id,
    
  });
};