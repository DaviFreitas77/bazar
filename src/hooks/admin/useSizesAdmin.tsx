
import { getSizes } from "@/api/admin/sizesAdmin";

import { useQuery } from "@tanstack/react-query";

export const useSizesAdmin = () => {
  return useQuery({
    queryKey: ["sizes"],
    queryFn: getSizes,
  });
};

