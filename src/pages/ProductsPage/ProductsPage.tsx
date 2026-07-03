import styles from './ProductsPage.module.css';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductCardSkeleton from '../../components/ProductCard/ProductCardSkeleton';
import ErrorState from '../../components/ErrorState/ErrorState';
import EmptyState from '../../components/EmptyState/EmptyState';
import SearchInput from '../../components/SearchInput/SearchInput';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import ProductsFilter from '../../components/ProductsFilter/ProductsFilter';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') ?? '';
  const [inputValue, setInputValue] = useState<string>(initialSearch);
  const [debouncedInputValue, setDebouncedInputValue] =
    useState<string>(initialSearch);
  const { pathname, search } = useLocation();
  const returnTo = pathname + search;
  const initialMinPrice = searchParams.get('minPrice') ?? '';
  const initialMaxPrice = searchParams.get('maxPrice') ?? '';
  const initialFilter = searchParams.get('category') ?? '';
  const [draftCategory, setDraftCategory] = useState<string>(initialFilter);
  const [draftMinPrice, setDraftMinPrice] = useState<string>(initialMinPrice);
  const [draftMaxPrice, setDraftMaxPrice] = useState<string>(initialMaxPrice);

  const [minPrice, setMinPrice] = useState<string>(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState<string>(initialMaxPrice);

  const [category, setCategory] = useState<string>(initialFilter);

  const {
    data: products,
    isPending,
    isFetching,
    isError,
    refetch,
  } = useProducts(debouncedInputValue);

  const renderList = products?.products?.filter((product) => {
    if (minPrice && product.price < +minPrice) return false;
    if (maxPrice && product.price > +maxPrice) return false;
    if (category && product.category !== category) return false;
    return true;
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 300);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (debouncedInputValue.trim()) {
      params.set('search', debouncedInputValue.trim());
    } else {
      params.delete('search');
    }

    setSearchParams(params);
  }, [debouncedInputValue, searchParams, setSearchParams]);

  useEffect(() => {
    if (
      !searchParams.get('search') &&
      !searchParams.get('category') &&
      !searchParams.get('minPrice') &&
      !searchParams.get('maxPrice')
    ) {
      setCategory('');
      setDraftCategory('');
      setMinPrice('');
      setMaxPrice('');
      setDraftMinPrice('');
      setDraftMaxPrice('');
      setDebouncedInputValue('');
      setInputValue('');
    }
  }, [search]);

  const resetFilters = () => {
    setCategory('');
    setDraftCategory('');
    setMinPrice('');
    setMaxPrice('');
    setDraftMinPrice('');
    setDraftMaxPrice('');

    const params = new URLSearchParams(searchParams);
    params.delete('category');
    params.delete('minPrice');
    params.delete('maxPrice');
    setSearchParams(params);
  };

  if (isError) {
    return <ErrorState onRetry={refetch} />;
  }

  if (isPending && !inputValue) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 12 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!inputValue.trim() && products?.products.length === 0) {
    return (
      <EmptyState
        title="No products found"
        desc="There are currently no products to display."
      />
    );
  }

  const clearSearch = () => {
    setInputValue('');
    setDebouncedInputValue('');
  };

  const applyFilters = () => {
    setCategory(draftCategory);
    setMinPrice(draftMinPrice);
    setMaxPrice(draftMaxPrice);

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

    setSearchParams(params);
  };

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <SearchInput
          setInputValue={setInputValue}
          inputValue={inputValue}
          isFetching={isFetching}
          clearSearch={clearSearch}
        />
        <ProductsFilter
          setDraftCategory={setDraftCategory}
          draftCategory={draftCategory}
          setDraftMaxPrice={setDraftMaxPrice}
          draftMaxPrice={draftMaxPrice}
          setDraftMinPrice={setDraftMinPrice}
          draftMinPrice={draftMinPrice}
          applyFilters={applyFilters}
          resetFilters={resetFilters}
        />
      </div>
      {debouncedInputValue.trim() && products?.products.length === 0 ? (
        <EmptyState
          title="No results found"
          desc="Try a different search term."
        />
      ) : renderList?.length === 0 ? (
        <EmptyState
          title="No products match your filters"
          desc="Try adjusting or clearing your filters."
        />
      ) : (
        <div className={styles.grid}>
          {renderList?.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              returnTo={returnTo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
