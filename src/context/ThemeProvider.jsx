import React, { useState, useEffect } from 'react';
import { ThemeContext } from '@context';

function getDaisyUIThemes() {
  return window.__themes && Array.isArray(window.__themes)
    ? window.__themes
    : ['light', 'dark'];
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );

  const [themes, setThemes] = useState(getDaisyUIThemes());

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (window.__themes && Array.isArray(window.__themes)) {
      setThemes(window.__themes);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}
