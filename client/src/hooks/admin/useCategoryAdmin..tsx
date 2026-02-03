

import { getCategories } from "@/api/admin/categoryAdmin";
import { useQuery } from "@tanstack/react-query";

export const useCategoriesAdmin = () => {
  return useQuery({
    queryKey: ["categoriesAdmin"],
    queryFn: getCategories,
  });
};

