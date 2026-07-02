import styles from './ProductsPage.module.css';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductCardSkeleton from '../../components/ProductCard/ProductCardSkeleton';
import ErrorState from '../../components/ErrorState/ErrorState';
import EmptyState from '../../components/EmptyState/EmptyState';
import SearchInput from '../../components/SearchInput/SearchInput';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') ?? '';
  const [inputValue, setInputValue] = useState<string>(initialSearch);
  const [debouncedInputValue, setDebouncedInputValue] =
    useState<string>(initialSearch);
  const { pathname, search } = useLocation();
  const returnTo = pathname + search;

  const {
    data: products,
    isPending,
    isFetching,
    isError,
    refetch,
  } = useProducts(debouncedInputValue);

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

  return (
    <div className={styles.container}>
      <SearchInput
        setInputValue={setInputValue}
        inputValue={inputValue}
        isFetching={isFetching}
        clearSearch={clearSearch}
      />
      {debouncedInputValue.trim() && products?.products.length === 0 ? (
        <EmptyState
          title="No results found"
          desc="Try a different search term."
        />
      ) : (
        <div className={styles.grid}>
          {products?.products?.map((product) => (
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
