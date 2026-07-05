import type { Product } from '../types/product';

type FilterProductsParams = {
  products: Product[];
  category: string;
  minPrice: string;
  maxPrice: string;
};

export const filterProducts = ({
  products,
  category,
  minPrice,
  maxPrice,
}: FilterProductsParams) => {
  const min = Number(minPrice);
  const max = Number(maxPrice);

  return products.filter((product) => {
    if (minPrice && product.price < min) return false;
    if (maxPrice && product.price > max) return false;
    if (category && product.category !== category) return false;

    return true;
  });
};
