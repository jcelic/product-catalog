import styles from './EmptyState.module.css';
import { EmptyIcon } from '@phosphor-icons/react';

const EmptyState = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <EmptyIcon size={48} />
        <h1>No products found</h1>
        <p>There are currently no products to display.</p>
      </div>
    </div>
  );
};

export default EmptyState;
