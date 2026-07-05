import { Link, useLocation } from 'react-router-dom';
import {
  HeartIcon,
  MoonIcon,
  SignOutIcon,
  SunIcon,
} from '@phosphor-icons/react';
import styles from './Header.module.css';
import { useTheme } from '../../hooks/useTheme';

const Header = () => {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();

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

        <nav className={styles.actions} aria-label="Primary navigation">
          {pathname === '/favorites' ? (
            <Link
              className={styles.headerLink}
              to="/products"
              onClick={handleLogout}
            >
              <SignOutIcon size={20} weight="regular" aria-hidden="true" />
              <span>Log out</span>
            </Link>
          ) : (
            <Link to="/favorites" className={styles.headerLink}>
              <HeartIcon size={20} weight="regular" aria-hidden="true" />
              <span>Favorites</span>
            </Link>
          )}

          <button
            type="button"
            className={styles.themeBtn}
            onClick={toggleTheme}
            aria-label={
              theme === 'light'
                ? 'Switch to dark theme'
                : 'Switch to light theme'
            }
          >
            {theme === 'light' ? (
              <MoonIcon size={25} aria-hidden="true" />
            ) : (
              <SunIcon size={25} aria-hidden="true" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
