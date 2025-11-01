declare namespace ProductProps {
  
  interface Card {
    idProduct: number;
    nameProduct: string;
    tamanhos: string[];
    currentPrice: string;
    originalPrice?: string;
    imageUrl: string;
  }

  interface Product {
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
    image: string[];
    category: string;
  }

  interface Category {
    id: string;
    name: string;
    description: string;
  }
}
