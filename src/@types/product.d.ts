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
    category: number;
  }

  export interface ProductCheckout {
    id: number;
    name: string;
    sizeName:string;
    colorName:string;
    price: number;
    image: string;
    quantity:number;
  }
  export interface Category {
    id: string;
    name: string;
    description: string;
  }
  

