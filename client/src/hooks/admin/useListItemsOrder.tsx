
import { apiListItemsOrder } from "@/api/admin/ordersAdminApi";
import { useQuery } from "@tanstack/react-query";

export const useListItemsOrder = ($idOrder: number) => {
  return useQuery({
    queryKey: ["itemsOrder", $idOrder],
    queryFn: () => apiListItemsOrder($idOrder),
    enabled: !!$idOrder
  });
};

