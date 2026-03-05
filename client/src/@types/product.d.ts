
// export interface Card {
//   id: number;
//   name: string;
//   sizes: {
//     id: number;
//     name: string
//   };
//   price: number;
//   lastPrice?: number;
//   image: string;
//   colors: {
//     id: number,
//     hexadecimal: string,
//     name: string
//   }
// }

export interface Product {
  id: number;
  name: string;
  description?: string;
  price:number;
  lastPrice: number;
  discount?: string;
  color: {
    id: number,
    hexadecimal: string,
    name: string
  }[]
  sizes: {
    id: number;
    name: string
  }[];
  image: string[];
  category?: {
    id: number;
    name: string;
  };
  idSubcategory?: number
}

export interface Category {
  id: string;
  name: string;
  description: string;
}


