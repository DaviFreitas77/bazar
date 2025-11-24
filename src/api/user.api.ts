import { api } from "@/lib/api";


export const getZipCode = async (zipCode: string) => {
  const response = await api.post("checkout/checkZipCode", { zipCode });
  return response.data;
};

