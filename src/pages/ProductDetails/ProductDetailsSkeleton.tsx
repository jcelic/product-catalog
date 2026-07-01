import styles from './ProductDetailsSkeleton.module.css';
import { CaretLeftIcon } from '@phosphor-icons/react';

const ProductDetailsSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.backButton}>
          <CaretLeftIcon size={18} />
          <span>Back to products</span>
        </div>

        <article className={styles.card}>
          <section className={styles.gallery}>
            <div className={styles.mainImg} />

            <div className={styles.thumbnails}>
              <div className={styles.thumbnail} />
              <div className={styles.thumbnail} />
              <div className={styles.thumbnail} />
            </div>
          </section>

          <section className={styles.info}>
            <div className={styles.category} />

            <div className={styles.title} />

            <div className={styles.description}>
              <div />
              <div />
              <div />
              <div />
            </div>

            <div className={styles.details}>
              <div>
                <div className={styles.label} />
                <div className={styles.value} />
              </div>

              <div>
                <div className={styles.label} />
                <div className={styles.value} />
              </div>

              <div>
                <div className={styles.label} />
                <div className={styles.value} />
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
