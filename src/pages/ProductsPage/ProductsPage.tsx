import styles from './ProductsPage.module.css';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductCardSkeleton from '../../components/ProductCard/ProductCardSkeleton';
import ErrorState from '../../components/ErrorState/ErrorState';
import EmptyState from '../../components/EmptyState/EmptyState';
import SearchInput from '../../components/SearchInput/SearchInput';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import ProductsFilter from '../../components/ProductsFilter/ProductsFilter';
import Pagination from '../../components/Pagination/Pagination';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname, search } = useLocation();
  const skipSearchUrlSync = useRef(false);

  const urlSearch = searchParams.get('search') ?? '';
  const category = searchParams.get('category') ?? '';
  const minPrice = searchParams.get('minPrice') ?? '';
  const maxPrice = searchParams.get('maxPrice') ?? '';

  const [inputValue, setInputValue] = useState(urlSearch);
  const [debouncedInputValue, setDebouncedInputValue] = useState(urlSearch);

  const [draftCategory, setDraftCategory] = useState(category);
  const [draftMinPrice, setDraftMinPrice] = useState(minPrice);
  const [draftMaxPrice, setDraftMaxPrice] = useState(maxPrice);

  const [currentPage, setCurrentPage] = useState(1);

  const returnTo = pathname + search;

  const {
    data: products,
    isPending,
    isFetching,
    isError,
    refetch,
  } = useProducts(debouncedInputValue);

  const baseList = products?.products?.filter((product) => {
    if (minPrice && product.price < +minPrice) return false;
    if (maxPrice && product.price > +maxPrice) return false;
    if (category && product.category !== category) return false;

    return true;
  });

  const itemsPerPage = 21;
  const totalPages = Math.ceil((baseList?.length ?? 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const renderList = baseList?.slice(startIndex, endIndex);

  const isSearchDebouncing = inputValue.trim() !== debouncedInputValue.trim();
  const showLoading =
    isPending ||
    isSearchDebouncing ||
    (Boolean(debouncedInputValue.trim()) && isFetching);

  const showSearchEmpty =
    Boolean(inputValue.trim()) &&
    Boolean(debouncedInputValue.trim()) &&
    products?.products.length === 0;

  const showFilterEmpty = renderList?.length === 0;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 300);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const urlSearch = searchParams.get('search') ?? '';
    const urlCategory = searchParams.get('category') ?? '';
    const urlMinPrice = searchParams.get('minPrice') ?? '';
    const urlMaxPrice = searchParams.get('maxPrice') ?? '';

    setInputValue(urlSearch);
    setDraftCategory(urlCategory);
    setDraftMinPrice(urlMinPrice);
    setDraftMaxPrice(urlMaxPrice);

    if (debouncedInputValue !== urlSearch) {
      skipSearchUrlSync.current = true;
      setDebouncedInputValue(urlSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  /* eslint-enable react-hooks/set-state-in-effect */

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (skipSearchUrlSync.current) {
      skipSearchUrlSync.current = false;
      return;
    }

    const currentSearchParam = searchParams.get('search') ?? '';
    const nextSearchParam = debouncedInputValue.trim();

    if (currentSearchParam === nextSearchParam) {
      return;
    }

    const params = new URLSearchParams(searchParams);

    if (nextSearchParam) {
      params.set('search', nextSearchParam);
    } else {
      params.delete('search');
    }

    params.delete('page');
    setCurrentPage(1);
    setSearchParams(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputValue, searchParams]);
  /* eslint-enable react-hooks/set-state-in-effect */

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const pageParam = params.get('page');

    if (!pageParam) {
      setCurrentPage(1);
      return;
    }

    const pageNumber = Number(pageParam);

    if (Number.isNaN(pageNumber) || pageNumber <= 0 || pageNumber === 1) {
      setCurrentPage(1);
      params.delete('page');
      setSearchParams(params);
      return;
    }

    if (totalPages > 0 && pageNumber > totalPages) {
      setCurrentPage(totalPages);
      params.set('page', String(totalPages));
      setSearchParams(params);
      return;
    }

    if (totalPages > 0) {
      setCurrentPage(pageNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, totalPages]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (showLoading || !renderList?.length) return;

    const savedScrollY = sessionStorage.getItem('productsScrollY');

    if (!savedScrollY) return;

    window.scrollTo({
      top: Number(savedScrollY),
      behavior: 'instant',
    });

    sessionStorage.removeItem('productsScrollY');
  }, [showLoading, renderList]);

  const clearSearch = () => {
    setInputValue('');
    setDebouncedInputValue('');
    setCurrentPage(1);

    const params = new URLSearchParams(searchParams);
    params.delete('search');
    params.delete('page');
    setSearchParams(params);
  };

  const resetFilters = () => {
    setDraftCategory('');
    setDraftMinPrice('');
    setDraftMaxPrice('');
    setCurrentPage(1);

    const params = new URLSearchParams(searchParams);
    params.delete('category');
    params.delete('minPrice');
    params.delete('maxPrice');
    params.delete('page');
    setSearchParams(params);
  };

  const applyFilters = () => {
    setCurrentPage(1);

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

  const onPageChange = (page: number) => {
    if (page === currentPage) {
      return;
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const params = new URLSearchParams(searchParams);

    if (page > 1) {
      params.set('page', String(page));
    } else {
      params.delete('page');
    }

    setSearchParams(params);
  };

  if (isError) {
    return <ErrorState onRetry={refetch} />;
  }

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

      {showLoading ? (
        <div
          className={styles.grid}
          role="status"
          aria-label="Loading products"
        >
          {Array.from({ length: 12 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : showSearchEmpty ? (
        <EmptyState
          title="No results found"
          desc="Try a different search term."
        />
      ) : showFilterEmpty ? (
        <EmptyState
          title="No products match your filters"
          desc="Try adjusting or clearing your filters."
        />
      ) : (
        <>
          <div className={styles.grid} aria-label="Product list">
            {renderList?.map((product) => (
              <ProductCard
                product={product}
                key={product.id}
                returnTo={returnTo}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProductsPage;
