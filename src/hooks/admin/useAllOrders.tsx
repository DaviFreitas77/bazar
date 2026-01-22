import { apiAllOrders } from "@/api/admin/ordersAdminApi";
import { useQuery } from "@tanstack/react-query";

export const useAllOrders = () => {
  return useQuery({
    queryKey: ["allOrders"],
    queryFn: apiAllOrders,
  });
};
