import { api } from "@/lib/api";

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
  console.log(data)
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
