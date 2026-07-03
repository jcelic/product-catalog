import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/productsApi';

export const useProducts = (searchQuery: string = '') => {
  return useQuery({
    queryKey: ['products', searchQuery],
    queryFn: () => getProducts(searchQuery),
    placeholderData: keepPreviousData,
  });
};
