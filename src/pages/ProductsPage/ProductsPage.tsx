import styles from './ProductsPage.module.css';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductCardSkeleton from '../../components/ProductCard/ProductCardSkeleton';
import ErrorState from '../../components/ErrorState/ErrorState';
import EmptyState from '../../components/EmptyState/EmptyState';

const ProductsPage = () => {
  const { data: products, isPending, isError, refetch } = useProducts();

  if (isError) {
    return <ErrorState onRetry={refetch} />;
  }

  if (isPending) {
    return (
      <div className={styles.container}>
        {Array.from({ length: 12 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (products.products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className={styles.container}>
      {products?.products?.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductsPage;
