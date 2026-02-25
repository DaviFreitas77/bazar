import { getProductsByCategory } from "@/api/site/products.api";
import { useQuery } from "@tanstack/react-query";

export const useProductsByCategory = (name: string | null) => {
  return useQuery({
    queryKey: ["productsByCategory", name],
    queryFn: () => getProductsByCategory(name),
    enabled: !!name,
  });
};