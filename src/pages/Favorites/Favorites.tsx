import { HeartIcon } from '@phosphor-icons/react';
import styles from './Favorites.module.css';

const Favorites = () => {
  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <h1>Your favorites</h1>
        <p>Products you save will appear here.</p>
      </section>

      <section className={styles.emptyState}>
        <div className={styles.icon}>
          <HeartIcon size={32} aria-hidden="true" />
        </div>
        <h2>No favorite products yet</h2>
        <p>Browse the catalog and add products you want to revisit later.</p>
      </section>
    </div>
  );
};

export default Favorites;
