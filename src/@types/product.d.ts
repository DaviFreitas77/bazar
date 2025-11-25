import type { PrinterCheck } from "lucide-react";



 export interface Card {
    id: number;
    name: string;
    sizes: string[];
    price: number;
    lastPrice?: number;
    image: string;
  }

 export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    lastPrice: number;
    discount: string;
    rating: number;
    reviews: number;
    color: string[];
    sizes: string[];
    material: string;
    image: string[];
      category: {
    id: number;
    name: string;
  };
  }

  export interface Category {
    id: string;
    name: string;
    description: string;
  }
  

