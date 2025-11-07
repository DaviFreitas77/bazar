import type { Product } from "@/@types/product";


export const filterColorsProducts = (
  color: string,
  products:  Product[]
):  Product[] => {
  return products.filter((p) => p.color.includes(color));
};

export const filterSizesProducts = (
  size: string,
  products: Product[]
):  Product[] => {
  return products.filter((p) => p.sizes.includes(size));
};

export const searchProducts = (query: string):Product[] => {
  return getProducts().filter((product) =>
    product.productName.toLowerCase().includes(query.toLowerCase())
  );
};
