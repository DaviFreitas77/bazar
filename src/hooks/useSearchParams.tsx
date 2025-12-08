import { searchProducts } from "@/api/products.api";
import { useQuery } from "@tanstack/react-query";

export const hookSearchParams = (query: string | null) => {
  return useQuery({
    queryKey: ["productsSearched", query],
    queryFn: () => {
      return searchProducts(query || "");
    },
    enabled: !!query,
  });
};
