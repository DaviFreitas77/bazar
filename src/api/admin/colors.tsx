import { api } from "@/lib/api";



interface ColorsAdminProps {
  id: number;
  name: string;
}

export const getColors = async () => {
  const response = await api.get<ColorsAdminProps[]>("color/list");
  return response.data;
};



