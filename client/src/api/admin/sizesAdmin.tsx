import { api } from "@/lib/api";



interface SizesAdminProps{
  id: number;
  name: string;
}
export const getSizes = async () => {
  const response = await api.get<SizesAdminProps[]>("size/list");
  return response.data;
};