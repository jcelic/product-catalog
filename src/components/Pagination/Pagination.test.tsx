import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Pagination from './Pagination';

const renderPagination = ({
  totalPages = 10,
  currentPage = 1,
  onPageChange = vi.fn(),
} = {}) => {
  render(
    <Pagination
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={onPageChange}
    />,
  );

  return { onPageChange };
};

describe('Pagination', () => {
  it('disables previous button on the first page', () => {
    renderPagination({ currentPage: 1 });

    expect(
      screen.getByRole('button', { name: /previous page/i }),
    ).toBeDisabled();
  });

  it('disables next button on the last page', () => {
    renderPagination({
      currentPage: 10,
      totalPages: 10,
    });

    expect(screen.getByRole('button', { name: /next page/i })).toBeDisabled();
  });

  it('calls onPageChange when next button is clicked', () => {
    const { onPageChange } = renderPagination({
      currentPage: 3,
      totalPages: 10,
    });

    fireEvent.click(screen.getByRole('button', { name: /next page/i }));

    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('calls onPageChange when previous button is clicked', () => {
    const { onPageChange } = renderPagination({
      currentPage: 3,
      totalPages: 10,
    });

    fireEvent.click(screen.getByRole('button', { name: /previous page/i }));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('shows ellipsis when there are many pages', () => {
    renderPagination({
      currentPage: 5,
      totalPages: 10,
    });

    expect(screen.getAllByText('...')).toHaveLength(2);
  });
});
