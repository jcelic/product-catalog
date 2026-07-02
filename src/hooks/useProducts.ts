import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/productsApi';

export const useProducts = (searchValue: string = '') => {
  return useQuery({
    queryKey: ['products', searchValue],
    queryFn: () => getProducts(searchValue),
    placeholderData: keepPreviousData,
  });
};
