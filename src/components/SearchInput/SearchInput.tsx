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
    <div className={styles.inputBox}>
      <div className={styles.wrapper}>
        <input
          type="text"
          placeholder="Search products..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <span className={styles.icon}>
          {isFetching ? (
            <Spinner />
          ) : inputValue.trim() ? (
            <XCircleIcon
              size={20}
              onClick={clearSearch}
              className={styles.clearIcon}
            />
          ) : (
            <MagnifyingGlassIcon size={20} />
          )}
        </span>
      </div>
    </div>
  );
};

export default SearchInput;
