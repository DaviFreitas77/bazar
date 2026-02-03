import { getProductsByCategory } from "@/api/site/products.api";
import { useQuery } from "@tanstack/react-query";

export const useProductsByCategory = (name: string | null) => {
  return useQuery({
    queryKey: ["productsByCategory", name],
    queryFn: () => {
      if (name === null) throw new Error("Category name is null");
      return getProductsByCategory(name);
    },
    enabled: !!name,
  });
};