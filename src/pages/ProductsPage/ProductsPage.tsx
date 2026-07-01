import styles from './ProductsPage.module.css';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/ProductCard/ProductCard';

const ProductsPage = () => {
  const { data: products } = useProducts();

  return (
    <div className={styles.container}>
      {products?.products?.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductsPage;
