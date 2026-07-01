import { useQuery } from '@tanstack/react-query';
import { getProductDetails } from '../api/productsApi';

export const useProductDetails = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductDetails(id),
    enabled: !Number.isNaN(id),
  });
};
