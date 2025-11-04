import productsData from "../data/products.json";


export const getProducts = (): ProductProps.Product[] => {
  return productsData.products as  ProductProps.Product[];
};

export const getProductsByCategory = (category: string):  ProductProps.Product[] => {
  return getProducts().filter((product) => product.category === category);
};

export const getProductById = (id: number):  ProductProps.Product[] => {
  return getProducts().filter((product) => product.id === id);
};

export const filterColorsProducts = (
  color: string,
  products:  ProductProps.Product[]
):  ProductProps.Product[] => {
  return products.filter((p) => p.color.includes(color));
};

export const filterSizesProducts = (
  size: string,
  products:  ProductProps.Product[]
):  ProductProps.Product[] => {
  return products.filter((p) => p.sizes.includes(size));
};

export const searchProducts = (query: string):  ProductProps.Product[] => {
  return getProducts().filter((product) =>
    product.productName.toLowerCase().includes(query.toLowerCase())
  );
};
