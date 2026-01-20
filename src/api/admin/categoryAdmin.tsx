import { api } from "@/lib/api";



interface CategoryAdminProps {
  id: number;
  name: string;
}

export const getCategories = async () => {
  const response = await api.get<CategoryAdminProps[]>("category/list");
  return response.data;
};