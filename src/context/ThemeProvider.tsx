import { useEffect, useState, type ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';
import type { Theme } from '../types/theme';

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const lsTheme = localStorage.getItem('theme');

    if (lsTheme === 'light' || lsTheme === 'dark') {
      return lsTheme;
    }

    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    return prefersDark ? 'dark' : 'light';
  });

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
