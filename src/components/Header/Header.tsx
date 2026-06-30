import styles from './Header.module.css';
import { MoonIcon, SunIcon } from '@phosphor-icons/react';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1>Product Catalog</h1>
        <button
          type="button"
          className={styles.themeBtn}
          aria-label="Toggle theme"
        >
          <MoonIcon size={25} />
        </button>
      </div>
    </header>
  );
};

export default Header;
