import { api } from "@/lib/api";

export const fetchBanners = async () => {
  try {
    const response = await api.get("/banner/fetch");
    const banners = response.data.banners;
    console.log("Banners fetched:", banners);
    return banners;
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
}