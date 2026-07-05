import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { Theme } from '../types/theme';

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};
type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const lsTheme = localStorage.getItem('theme');

    if (lsTheme === 'light' || lsTheme === 'dark') {
      return lsTheme;
    }

    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    if (prefersDark) {
      return 'dark';
    }

    return 'light';
  });

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      if (currentTheme === 'light') {
        return 'dark';
      }

      return 'light';
    });
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
