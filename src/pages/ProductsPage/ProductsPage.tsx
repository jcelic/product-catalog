import styles from './ProductsPage.module.css';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductCardSkeleton from '../../components/ProductCard/ProductCardSkeleton';

const ProductsPage = () => {
  const { data: products, isPending } = useProducts();

  if (isPending) {
    return (
      <div className={styles.container}>
        {Array.from({ length: 12 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
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
