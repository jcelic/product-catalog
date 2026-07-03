import { SlidersHorizontalIcon } from '@phosphor-icons/react';
import styles from './ProductsFilter.module.css';
import { useCategories } from '../../hooks/useCategories';
import { useEffect, useRef, useState } from 'react';

type ProductsFilterProps = {
  setDraftCategory: (category: string) => void;
  draftCategory: string;
  setDraftMaxPrice: (price: string) => void;
  draftMaxPrice: string;
  setDraftMinPrice: (price: string) => void;
  draftMinPrice: string;
  applyFilters: () => void;
  resetFilters: () => void;
};

const ProductsFilter = ({
  setDraftCategory,
  draftCategory,
  setDraftMaxPrice,
  draftMaxPrice,
  setDraftMinPrice,
  draftMinPrice,
  applyFilters,
  resetFilters,
}: ProductsFilterProps) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const { data: categories } = useCategories();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.filterWrapper} ref={dropdownRef}>
      <button
        type="button"
        className={styles.filterBtn}
        aria-label="Open filters"
        onClick={() => setOpenDropdown((prev) => !prev)}
      >
        <SlidersHorizontalIcon size={22} weight="regular" />
      </button>

      {openDropdown && (
        <div className={styles.dropdown}>
          <h3>Filters</h3>

          <div className={styles.section}>
            <label>Category</label>

            <select
              onChange={(e) => setDraftCategory(e.target.value)}
              value={draftCategory}
            >
              <option value="">All categories</option>
              {categories?.map((category) => (
                <option value={category.slug} key={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.section}>
            <label>Price range</label>

            <div className={styles.priceInputs}>
              <input
                type="number"
                min="0"
                placeholder="Min"
                value={draftMinPrice}
                onChange={(e) => setDraftMinPrice(e.target.value)}
              />
              <span>—</span>
              <input
                type="number"
                min="0"
                placeholder="Max"
                value={draftMaxPrice}
                onChange={(e) => setDraftMaxPrice(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={resetFilters}>
              Reset
            </button>
            <button
              type="button"
              onClick={() => {
                applyFilters();
                setOpenDropdown(false);
              }}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsFilter;
