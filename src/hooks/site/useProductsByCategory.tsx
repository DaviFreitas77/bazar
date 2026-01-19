import { getProductsByCategory } from "@/api/site/products.api";
import { useQuery } from "@tanstack/react-query";

export const useProductsByCategory = (id: number | null) => {
  return useQuery({
    queryKey: ["productsByCategory", id],
    queryFn: () => {
      if (id === null) throw new Error("Category id is null");
      return getProductsByCategory(id);
    },
    enabled: !!id,
  });
};