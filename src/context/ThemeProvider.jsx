import React, { useState, useEffect } from 'react';
import { ThemeContext } from '@context';

function extractThemesFromCss(cssText) {
  const regex = /\[data-theme=([^\]]+)\]/g;
  const themes = new Set();
  let match;
  while ((match = regex.exec(cssText)) !== null) {
    themes.add(match[1].replace(/['"]/g, ''));
  }
  return [...themes];
}

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
        const res = await fetch('/node_modules/daisyui/themes.css');
        const cssText = await res.text();
        const foundThemes = extractThemesFromCss(cssText);
        if (foundThemes.length > 0) {
          setThemes(foundThemes);
        }
      } catch (err) {
        console.error('Kunde inte läsa DaisyUI themes.css:', err);
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
