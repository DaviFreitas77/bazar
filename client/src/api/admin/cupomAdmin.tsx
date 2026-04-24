import { api } from "@/lib/api";

import type { CupomProps } from "@/api/@types/cupom";

interface CreateCupomPayload {
  nameCupom: string;
  discount: number;
  validity: string;
  limitUse: number;
}

export const apiCreateCupom = async (data: CreateCupomPayload) => {
  const response = await api.post("/cupom/create", data);
  return response.data;
};

export const apiListCupoms = async (): Promise<CupomProps[]> => {
  const response = await api.get("/cupom/list");
  return response.data;
};

export const apiDeleteCupom = async (id: number) => {
  const response = await api.delete(`/cupom/deleteCupom/${id}`);
  return response.data;
};
