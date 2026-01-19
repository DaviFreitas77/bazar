
import { getCategories } from "@/api/admin/colors";
import { useQuery } from "@tanstack/react-query";

export const useCategoriesAdmin = () => {
  return useQuery({
    queryKey: ["categoriesAdmin"],
    queryFn: getCategories,
  });
};

