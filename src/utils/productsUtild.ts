import type { Product } from "@/@types/product";

export const filterProductByCategory = (category: string, products: Product[]): Product[] => {
  return products.filter((p) => p.category.name === category);
};

export const filterColorsProducts = (color: string, products: Product[]): Product[] => {
  return products.filter((p) => p.color.includes(color));
};

export const filterSizesProducts = (size: string, products: Product[]): Product[] => {
  return products.filter((p) => p.sizes.includes(size));
};

export const filterCategory = (category: string, products: Product[]): Product[] => {
  return products.filter((p) => p.category.name === category);
};

export const filterSubCategory = (subCategory: number, products: Product[]): Product[]=> {
  console.log(subCategory);
  console.log(products)
  return products.filter((p) => p.idSubcategory === subCategory);
};
