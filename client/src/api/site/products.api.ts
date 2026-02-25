import { api } from "@/lib/api";
import type { Product } from "@/@types/product";
import type { ApiProduct } from "../@types/product";



export const getProductsByCategory = async (name: string | null): Promise<Product[]> => {
  const { data } = await api.get<Product[]>(`prod/productsByCategory/${name}`);
  return data;
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



export const apiGetAllProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await api.get<Product[]>("prod/products");
    return data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};


 export const searchProducts = async (query: string | null): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>(`prod/search/${query}`);
    return response.data;
  } catch (error) {
    console.log(error)
    return [];
  }
};


