import { WarningCircleIcon } from '@phosphor-icons/react';
import styles from './ErrorState.module.css';

type ErrorStateProps = {
  onRetry: () => void;
};

const ErrorState = ({ onRetry }: ErrorStateProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <WarningCircleIcon size={48} />
        <h1>Something went wrong</h1>
        <p>Please refresh the page or try again.</p>
        <button type="button" className={styles.button} onClick={onRetry}>
          Try again
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
