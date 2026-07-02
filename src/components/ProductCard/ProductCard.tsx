import type { Product } from '../../types/product';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';

type ProductCardProps = {
  product: Product;
  returnTo: string;
};

const ProductCard = ({ product, returnTo }: ProductCardProps) => {
  return (
    <Link
      to={`/products/${product.id}`}
      className={styles.card}
      state={{ returnTo }}
    >
      <img src={product.thumbnail} alt={product.title} />

      <h3>{product.title}</h3>
      <p>
        {product.description.slice(0, 100)}
        {product.description.length > 100 ? '...' : ''}
      </p>
      <span>{product.price} €</span>
    </Link>
  );
};

export default ProductCard;
