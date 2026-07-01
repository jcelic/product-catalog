import styles from './ProductsPage.module.css';
import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';

const ProductsPage = () => {
  const { data: products } = useProducts();

  return (
    <div className={styles.container}>
      {products?.products?.map((product) => (
        <Link
          to={`/products/${product.id}`}
          key={product.id}
          className={styles.card}
        >
          <img src={product.thumbnail} alt={product.title} />

          <h3>{product.title}</h3>
          <p>
            {product.description.slice(0, 100)}
            {product.description.length > 100 ? '...' : ''}
          </p>
          <span>{product.price} €</span>
        </Link>
      ))}
    </div>
  );
};

export default ProductsPage;
