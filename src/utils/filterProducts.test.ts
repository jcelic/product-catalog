import { describe, expect, it } from 'vitest';
import { filterProducts } from './filterProducts';
import type { Product } from '../types/product';

const products: Product[] = [
  {
    id: 1,
    title: 'iPhone 9',
    description: 'Phone',
    price: 549,
    rating: 4.69,
    stock: 94,
    category: 'smartphones',
    thumbnail: 'https://example.com/iphone.jpg',
    images: ['https://example.com/iphone.jpg'],
  },
  {
    id: 2,
    title: 'MacBook Pro',
    description: 'Laptop',
    price: 1749,
    rating: 4.57,
    stock: 83,
    category: 'laptops',
    thumbnail: 'https://example.com/macbook.jpg',
    images: ['https://example.com/macbook.jpg'],
  },
  {
    id: 3,
    title: 'Samsung Universe',
    description: 'Phone',
    price: 1249,
    rating: 4.09,
    stock: 36,
    category: 'smartphones',
    thumbnail: 'https://example.com/samsung.jpg',
    images: ['https://example.com/samsung.jpg'],
  },
];

describe('filterProducts', () => {
  it('returns all products when no filters are applied', () => {
    const result = filterProducts({
      products,
      category: '',
      minPrice: '',
      maxPrice: '',
    });

    expect(result).toHaveLength(3);
  });

  it('filters products by category', () => {
    const result = filterProducts({
      products,
      category: 'smartphones',
      minPrice: '',
      maxPrice: '',
    });

    expect(result).toHaveLength(2);
    expect(result.every((product) => product.category === 'smartphones')).toBe(
      true,
    );
  });

  it('filters products by minimum price', () => {
    const result = filterProducts({
      products,
      category: '',
      minPrice: '1000',
      maxPrice: '',
    });

    expect(result.map((product) => product.title)).toEqual([
      'MacBook Pro',
      'Samsung Universe',
    ]);
  });

  it('filters products by maximum price', () => {
    const result = filterProducts({
      products,
      category: '',
      minPrice: '',
      maxPrice: '1000',
    });

    expect(result.map((product) => product.title)).toEqual(['iPhone 9']);
  });

  it('filters products by category and price range', () => {
    const result = filterProducts({
      products,
      category: 'smartphones',
      minPrice: '1000',
      maxPrice: '1500',
    });

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Samsung Universe');
  });
});
