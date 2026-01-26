export interface ApiProduct {
  id: number;
  name: string;
  price: string;
  lastPrice: string;
  categoryName:string;
  category: number;

  sizes: {
    id: number;
    name: string;
  }[];

  color: {
    id: number;
    name: string;
  }[];

  description: string;

  image: {
    id: number;
    image: string;
  }[];
}