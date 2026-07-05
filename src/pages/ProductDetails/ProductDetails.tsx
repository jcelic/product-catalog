import styles from './ProductDetails.module.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useProductDetails } from '../../hooks/useProductDetails';
import { useState } from 'react';
import { CaretLeftIcon } from '@phosphor-icons/react';
import ProductDetailsSkeleton from './ProductDetailsSkeleton';
import ErrorState from '../../components/ErrorState/ErrorState';
import NotFound from '../../components/NotFound/NotFound';

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const returnTo = location.state?.returnTo;

  const productId = Number(id);

  const {
    data: productDetails,
    isPending,
    isError,
    error,
    refetch,
  } = useProductDetails(productId);
  const [mainImg, setMainImg] = useState<string>();

  if (!id || Number.isNaN(productId) || productId <= 0) {
    return (
      <NotFound title="Invalid product" desc="The product ID is not valid." />
    );
  }

  if (isError && error?.message === 'PRODUCT_NOT_FOUND') {
    return (
      <NotFound
        title="Product not found"
        desc="The product you're looking for doesn't exist."
      />
    );
  }

  if (isError) {
    return <ErrorState onRetry={refetch} />;
  }

  if (isPending) {
    return <ProductDetailsSkeleton />;
  }

  const currentImage =
    mainImg ?? productDetails?.images[0] ?? productDetails?.thumbnail;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link
          to={returnTo ? returnTo : '/products'}
          className={styles.backButton}
        >
          <CaretLeftIcon size={18} />
          <span>Back to products</span>
        </Link>

        <article className={styles.card}>
          <section className={styles.gallery}>
            <img
              src={currentImage}
              alt={productDetails?.title}
              className={styles.mainImg}
            />

            {productDetails && productDetails.images.length > 1 && (
              <div className={styles.thumbnails}>
                {productDetails.images.map((image) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setMainImg(image)}
                    aria-label={`Show ${productDetails.title} image`}
                    className={image === currentImage ? styles.active : ''}
                  >
                    <img src={image} alt={productDetails.title} />
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className={styles.info}>
            <span className={styles.category}>{productDetails?.category}</span>

            <h1>{productDetails?.title}</h1>

            <p className={styles.description}>{productDetails?.description}</p>

            <div className={styles.details}>
              <div>
                <span>Price</span>
                <strong>{productDetails?.price} €</strong>
              </div>

              <div>
                <span>Rating</span>
                <strong>{productDetails?.rating}</strong>
              </div>

              <div>
                <span>Stock</span>
                <strong>{productDetails?.stock}</strong>
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};

export default ProductDetails;
