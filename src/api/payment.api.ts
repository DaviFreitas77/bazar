
import { api } from "@/lib/api";

export const apiCreatePayment = async (amount: number) => {
  const response = await api.post("/createPayment", { amount });
  return response.data;
};

