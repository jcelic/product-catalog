import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import ProductCard from './ProductCard';
import type { Product } from '../../types/product';

const mockProduct: Product = {
  id: 1,
  title: 'iPhone 9',
  description: 'An apple mobile which is nothing like apple',
  price: 549,
  rating: 4.69,
  stock: 94,
  category: 'smartphones',
  thumbnail: 'https://example.com/iphone.jpg',
  images: ['https://example.com/iphone.jpg'],
};

const renderProductCard = () => {
  render(
    <MemoryRouter>
      <ProductCard product={mockProduct} returnTo="/products" />
    </MemoryRouter>,
  );
};

describe('ProductCard', () => {
  it('renders product information', () => {
    renderProductCard();

    expect(
      screen.getByRole('heading', { name: 'iPhone 9' }),
    ).toBeInTheDocument();
    expect(screen.getByText('549 €')).toBeInTheDocument();
    expect(screen.getByAltText('iPhone 9')).toBeInTheDocument();
  });

  it('truncates long descriptions', () => {
    const longDescription = 'a'.repeat(120);

    render(
      <MemoryRouter>
        <ProductCard
          product={{
            ...mockProduct,
            description: longDescription,
          }}
          returnTo="/products"
        />
      </MemoryRouter>,
    );

    expect(screen.getByText(`${'a'.repeat(100)}...`)).toBeInTheDocument();
  });

  it('links to the correct product details page', () => {
    renderProductCard();

    const link = screen.getByRole('link', {
      name: /view details for iphone 9/i,
    });

    expect(link).toHaveAttribute('href', '/products/1');
  });

  it('saves scroll position when clicked', () => {
    Object.defineProperty(window, 'scrollY', {
      value: 250,
      writable: true,
    });

    renderProductCard();

    const link = screen.getByRole('link', {
      name: /view details for iphone 9/i,
    });

    fireEvent.click(link);

    expect(sessionStorage.getItem('productsScrollY')).toBe('250');
  });
});
