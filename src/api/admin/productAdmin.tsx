import { api } from "@/lib/api";
import { toast } from "sonner";
import type { ApiProduct } from "../@types/product";

interface CretedProductProps {
  name: string;
  description: string;
  price: number;
  idCategory: number;
  lastPrice: number;
  images: string[];
  sizes: number[];
  colors: number[];
}
export const createdProduct = async (data: CretedProductProps) => {
  const response = await api.post("/prod/registerProduct", {
    name: data.name,
    description: data.description,
    price: data.price,
    idCategory: data.idCategory,
    lastPrice: data.lastPrice,
    images: data.images,
    sizes: data.sizes,
    colors: data.colors,
  });
  return response.data;
};

export const deleteProduct = async (id: number) => {
  const response = await api.delete(`/prod/delProduct/${id}`);

  return response.data;
};

export const apiGetProductById = async (id: number): Promise<ApiProduct> => {
  try {
    const { data } = await api.get<ApiProduct>(`prod/product/${id}`);
    return data;
  } catch (error) {
    console.error("Erro ao buscar produtos por categoria:", error);
    throw error;
  }
};
