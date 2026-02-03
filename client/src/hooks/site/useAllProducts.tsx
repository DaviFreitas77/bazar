import { apiGetAllProducts } from "@/api/site/products.api";
import { useQuery } from "@tanstack/react-query";

export const useAllProducts = () => {
  return useQuery({
    queryKey: ["allProducts"],
    queryFn: apiGetAllProducts,
  });
};

