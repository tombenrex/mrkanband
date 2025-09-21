import React, { useState, useEffect } from 'react';
import { ThemeContext } from '@context';

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );
  const [themes, setThemes] = useState(['light', 'dark']);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    async function loadThemes() {
      try {
        const res = await fetch(import.meta.env.BASE_URL + 'themes.json');
        if (!res.ok) throw new Error('themes.json not found!');
        const themeList = await res.json();
        console.log('Loaded themes:', themeList);
        if (Array.isArray(themeList) && themeList.length > 0) {
          setThemes(themeList);
        }
      } catch (err) {
        console.error('Could not load themes.json:', err);
      }
    }
    loadThemes();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}
