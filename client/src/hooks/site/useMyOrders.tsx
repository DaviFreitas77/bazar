import { myOrder } from "@/api/site/order.api";
import { useQuery } from "@tanstack/react-query";


export const useMyOrders = () => {
  return useQuery({
    queryKey: ["myOrders",],
    queryFn: () => {
      return myOrder();
    }, 
  });
};