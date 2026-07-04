import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import styles from './Pagination.module.css';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const getPaginationItems = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, '...', totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      '...',
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const items = getPaginationItems(currentPage, totalPages);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        type="button"
        className={styles.navButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
      >
        <CaretLeftIcon />
      </button>

      <div className={styles.pages}>
        {items.map((item, index) =>
          typeof item === 'number' ? (
            <button
              type="button"
              key={item}
              className={`${styles.pageButton} ${
                currentPage === item ? styles.active : ''
              }`}
              onClick={() => onPageChange(item)}
              aria-label={`Go to page ${item}`}
              aria-current={currentPage === item ? 'page' : undefined}
            >
              {item}
            </button>
          ) : (
            <span key={`dots-${index}`} aria-hidden="true">
              ...
            </span>
          ),
        )}
      </div>

      <button
        type="button"
        className={styles.navButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
      >
        <CaretRightIcon />
      </button>
    </nav>
  );
};

export default Pagination;
