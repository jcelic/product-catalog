export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
  rating: number;
  category: string;
  stock: number;
};

export type ProductsResponse = {
  products: Product[];
};
