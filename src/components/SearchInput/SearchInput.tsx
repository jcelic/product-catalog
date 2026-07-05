import Spinner from '../Spinner/Spinner';
import styles from './SearchInput.module.css';
import { MagnifyingGlassIcon, XCircleIcon } from '@phosphor-icons/react';

type SearchInputProps = {
  setInputValue: (value: string) => void;
  inputValue: string;
  isFetching: boolean;
  clearSearch: () => void;
};

const SearchInput = ({
  setInputValue,
  inputValue,
  isFetching,
  clearSearch,
}: SearchInputProps) => {
  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        placeholder="Search products..."
        value={inputValue}
        aria-label="Search products"
        onChange={(e) => {
          const value = e.target.value;

          if (!value.trim()) {
            clearSearch();
            return;
          }

          setInputValue(value);
        }}
      />
      <span className={styles.icon}>
        {isFetching ? (
          <Spinner />
        ) : inputValue.trim() ? (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={clearSearch}
            aria-label="Clear search"
          >
            <XCircleIcon size={23} aria-hidden="true" />
          </button>
        ) : (
          <MagnifyingGlassIcon size={20} aria-hidden="true" />
        )}
      </span>
    </div>
  );
};

export default SearchInput;
