import { api } from "@/lib/api";



interface ColorsAdminProps {
  id: number;
  name: string;
  hexadecimal:string
}

export const getColors = async () => {
  const response = await api.get<ColorsAdminProps[]>("color/list");
  return response.data;
};



