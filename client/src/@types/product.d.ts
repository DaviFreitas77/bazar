
 export interface Card {
    id: number;
    name: string;
    sizes: string[];
    price: number;
    lastPrice?: number;
    image: string;
    colors:string[]
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
  idSubcategory:number
  }

  export interface Category {
    id: string;
    name: string;
    description: string;
  }
  

