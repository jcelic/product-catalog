import styles from './NotFound.module.css';
import { Link } from 'react-router-dom';
import { WarningCircleIcon } from '@phosphor-icons/react';

type NotFoundProps = {
  title: string;
  desc: string;
};

const NotFound = ({ title, desc }: NotFoundProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <WarningCircleIcon size={48} aria-hidden="true" />

        <h1>{title}</h1>

        <p>{desc}</p>

        <Link to="/products" className={styles.btn}>
          Back to products
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
