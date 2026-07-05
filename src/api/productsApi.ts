import type { Category } from '../types/category';
import type { Product, ProductsResponse } from '../types/product';

export const getProducts = async (
  searchQuery: string = '',
): Promise<ProductsResponse> => {
  try {
    const query = searchQuery.trim();

    const url = !query
      ? 'https://dummyjson.com/products?limit=0'
      : `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=0`;
    const data = await fetch(url);

    if (!data.ok) {
      throw new Error('Failed to fetch products.');
    }

    const response = await data.json();
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message, { cause: error });
    }

    throw new Error('Something went wrong.', { cause: error });
  }
};

export const getProductDetails = async (id: number): Promise<Product> => {
  try {
    const data = await fetch(`https://dummyjson.com/products/${id}`);

    if (data.status === 404) {
      throw new Error('PRODUCT_NOT_FOUND');
    }

    if (!data.ok) {
      throw new Error('Failed to fetch product details.');
    }

    const response = await data.json();
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message, { cause: error });
    }

    throw new Error('Something went wrong.', { cause: error });
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const data = await fetch('https://dummyjson.com/products/categories');

    if (!data.ok) {
      throw new Error('Failed to fetch categories.');
    }

    const response = await data.json();
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message, { cause: error });
    }

    throw new Error('Something went wrong.', { cause: error });
  }
};
