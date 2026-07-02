import type { Product, ProductsResponse } from '../types/product';

export const getProducts = async (
  searchQuery: string = '',
): Promise<ProductsResponse> => {
  try {
    const query = searchQuery.trim();

    const url = !query
      ? 'https://dummyjson.com/products'
      : `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`;
    const data = await fetch(url);

    if (!data.ok) {
      throw new Error('Failed to fetch products.');
    }

    const response = await data.json();
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error('Something went wrong.');
  }
};

export const getProductDetails = async (id: number): Promise<Product> => {
  try {
    const data = await fetch(`https://dummyjson.com/products/${id}`);

    if (!data.ok) {
      throw new Error('Failed to fetch product details.');
    }

    const response = await data.json();
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error('Something went wrong.');
  }
};
