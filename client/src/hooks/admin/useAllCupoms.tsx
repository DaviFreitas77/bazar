import { apiListCupoms } from "@/api/admin/cupomAdmin";
import { useQuery } from "@tanstack/react-query";

export const useAllCupoms = () => {
  return useQuery({
    queryKey: ["allCupoms"],
    queryFn: apiListCupoms,
  });
};
