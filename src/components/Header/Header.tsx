import { Link, useLocation } from 'react-router-dom';
import {
  HeartIcon,
  MoonIcon,
  SignOutIcon,
  SunIcon,
} from '@phosphor-icons/react';
import styles from './Header.module.css';

const Header = () => {
  const { pathname } = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1>
          <Link to="/products" className={styles.logo}>
            Product Catalog
          </Link>
        </h1>

        <nav className={styles.actions}>
          {pathname === '/favorites' ? (
            <Link
              className={styles.headerLink}
              to="/products"
              onClick={handleLogout}
            >
              <SignOutIcon size={20} weight="regular" />
              <span>Log out</span>
            </Link>
          ) : (
            <Link to="/favorites" className={styles.headerLink}>
              <HeartIcon size={20} weight="regular" />
              <span>Favorites</span>
            </Link>
          )}

          <button
            type="button"
            className={styles.themeBtn}
            aria-label="Toggle theme"
          >
            <MoonIcon size={25} />
            {/* <SunIcon size={25} /> */}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
