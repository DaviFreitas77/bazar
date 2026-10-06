import { fetchBanners } from "@/api/site/banner.api";
import { useQuery } from "@tanstack/react-query";

interface Banner {
 id: number;
 image: string;
}

export const UseBanner = () => {
 return useQuery<Banner[]>({
  queryKey: ["banners"],
  queryFn: fetchBanners,
 });
};
