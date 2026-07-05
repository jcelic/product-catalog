import styles from './ProductCardSkeleton.module.css';

const ProductCardSkeleton = () => {
  return (
    <div className={styles.card} aria-hidden="true">
      <div className={styles.image} />

      <div className={styles.title} />

      <div className={styles.description}>
        <div />
        <div />
        <div />
      </div>

      <div className={styles.price} />
    </div>
  );
};

export default ProductCardSkeleton;
