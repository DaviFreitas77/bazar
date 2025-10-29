
export interface Product {
  id: number;
  productName: string;
  description: string;
  currentPrice: string;
  originalPrice: string;
  discount: string;
  rating: number;
  reviews: number;
  color: string[];
  sizes: string[];
  material: string;
  image: string;
  category: string;
}


export interface Category {
  id: string;
  name: string;
  description: string;
}