import { useSearchParams } from 'react-router-dom';

export type ApplyFiltersParams = {
  draftCategory: string;
  draftMinPrice: string;
  draftMaxPrice: string;
};

export const useProductQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const page = searchParams.get('page') || '';

  const resetFilters = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('category');
    params.delete('minPrice');
    params.delete('maxPrice');
    params.delete('page');

    setSearchParams(params);
  };

  const clearSearch = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('search');
    params.delete('page');
    setSearchParams(params);
  };

  const applyFilters = ({
    draftCategory,
    draftMinPrice,
    draftMaxPrice,
  }: ApplyFiltersParams) => {
    const params = new URLSearchParams(searchParams);

    if (draftCategory) {
      params.set('category', draftCategory);
    } else {
      params.delete('category');
    }

    if (draftMinPrice) {
      params.set('minPrice', draftMinPrice);
    } else {
      params.delete('minPrice');
    }

    if (draftMaxPrice) {
      params.set('maxPrice', draftMaxPrice);
    } else {
      params.delete('maxPrice');
    }

    params.delete('page');

    setSearchParams(params);
  };

  const setPageParam = (page: number) => {
    const params = new URLSearchParams(searchParams);

    if (page > 1) {
      params.set('page', String(page));
    } else {
      params.delete('page');
    }

    setSearchParams(params);
  };

  const setSearchParam = (nextSearchParam: string) => {
    const params = new URLSearchParams(searchParams);

    if (nextSearchParam) {
      params.set('search', nextSearchParam);
    } else {
      params.delete('search');
    }

    params.delete('page');

    setSearchParams(params);
  };

  return {
    category,
    search,
    minPrice,
    maxPrice,
    page,
    resetFilters,
    clearSearch,
    applyFilters,
    setPageParam,
    setSearchParam,
  };
};
