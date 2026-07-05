import styles from './EmptyState.module.css';
import { EmptyIcon } from '@phosphor-icons/react';

type EmptyStateProps = {
  title: string;
  desc: string;
};

const EmptyState = ({ title, desc }: EmptyStateProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <EmptyIcon size={48} aria-hidden="true" />
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default EmptyState;
