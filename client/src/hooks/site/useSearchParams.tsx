import { searchProducts } from "@/api/site/products.api";
import { useQuery } from "@tanstack/react-query";

export const hookSearchParams = (query: string | null) => {
  return useQuery({
    queryKey: ["productsSearched", query],
    queryFn: () => searchProducts(query),
    enabled: !!query,
  });
};
