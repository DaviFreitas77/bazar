import { getColors } from "@/api/admin/colors";

import { useQuery } from "@tanstack/react-query";

export const useColors = () => {
  return useQuery({
    queryKey: ["colors"],
    queryFn: getColors,
  });
};

