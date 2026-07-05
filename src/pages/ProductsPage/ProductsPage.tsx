import styles from './ProductsPage.module.css';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductCardSkeleton from '../../components/ProductCard/ProductCardSkeleton';
import ErrorState from '../../components/ErrorState/ErrorState';
import EmptyState from '../../components/EmptyState/EmptyState';
import SearchInput from '../../components/SearchInput/SearchInput';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductsFilter from '../../components/ProductsFilter/ProductsFilter';
import Pagination from '../../components/Pagination/Pagination';
import { useProductQueryParams } from '../../hooks/useProductQueryParams';

const ProductsPage = () => {
  // Read current URL state
  const { pathname, search: urlSearch } = useLocation();
  const skipSearchUrlSync = useRef(false);

  const {
    applyFilters,
    resetFilters,
    clearSearch,
    setPageParam,
    setSearchParam,
    search,
    category,
    minPrice,
    maxPrice,
    page,
  } = useProductQueryParams();

  // Local search state
  const [inputValue, setInputValue] = useState(search);
  const [debouncedInputValue, setDebouncedInputValue] = useState(search);

  // Filter draft state
  const [draftCategory, setDraftCategory] = useState(category);
  const [draftMinPrice, setDraftMinPrice] = useState(minPrice);
  const [draftMaxPrice, setDraftMaxPrice] = useState(maxPrice);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const returnTo = pathname + urlSearch;

  const {
    data: products,
    isPending,
    isFetching,
    isError,
    refetch,
  } = useProducts(debouncedInputValue);

  // Filter products based on selected criteria
  const baseList = products?.products?.filter((product) => {
    if (minPrice && product.price < +minPrice) return false;
    if (maxPrice && product.price > +maxPrice) return false;
    if (category && product.category !== category) return false;

    return true;
  });

  // Client-side pagination
  const itemsPerPage = 21;
  const totalPages = Math.ceil((baseList?.length ?? 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const renderList = baseList?.slice(startIndex, endIndex);

  // UI state flags
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

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 300);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  // Sync component state from URL changes
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setInputValue(search);
    setDraftCategory(category);
    setDraftMinPrice(minPrice);
    setDraftMaxPrice(maxPrice);

    if (debouncedInputValue !== search) {
      skipSearchUrlSync.current = true;
      setDebouncedInputValue(search);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, minPrice, maxPrice]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Sync debounced search with URL
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (skipSearchUrlSync.current) {
      skipSearchUrlSync.current = false;
      return;
    }

    const nextSearchParam = debouncedInputValue.trim();

    if (search === nextSearchParam) {
      return;
    }

    setCurrentPage(1);
    setSearchParam(nextSearchParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputValue, search]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Sync current page with URL
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!page) {
      setCurrentPage(1);
      return;
    }

    const pageNumber = Number(page);

    if (Number.isNaN(pageNumber) || pageNumber <= 0 || pageNumber === 1) {
      setCurrentPage(1);
      setPageParam(1);
      return;
    }

    if (totalPages > 0 && pageNumber > totalPages) {
      setCurrentPage(totalPages);
      setPageParam(totalPages);
      return;
    }

    if (totalPages > 0) {
      setCurrentPage(pageNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, totalPages]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Restore scroll position after returning from product details
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

  // Clear search query
  const handleClearSearch = () => {
    setInputValue('');
    setDebouncedInputValue('');
    setCurrentPage(1);

    clearSearch();
  };

  // Reset all filters
  const handleResetFilters = () => {
    setDraftCategory('');
    setDraftMinPrice('');
    setDraftMaxPrice('');
    setCurrentPage(1);

    resetFilters();
  };

  // Apply selected filters
  const handleApplyFilters = () => {
    setCurrentPage(1);
    applyFilters({ draftCategory, draftMinPrice, draftMaxPrice });
  };

  // Handle pagination changes
  const onPageChange = (page: number) => {
    if (page === currentPage) {
      return;
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setPageParam(page);
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
          clearSearch={handleClearSearch}
        />

        <ProductsFilter
          setDraftCategory={setDraftCategory}
          draftCategory={draftCategory}
          setDraftMaxPrice={setDraftMaxPrice}
          draftMaxPrice={draftMaxPrice}
          setDraftMinPrice={setDraftMinPrice}
          draftMinPrice={draftMinPrice}
          applyFilters={handleApplyFilters}
          resetFilters={handleResetFilters}
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
