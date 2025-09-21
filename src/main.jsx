import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/monaspace-radon';
import '@fontsource-variable/fira-code';
import './styles/index.css';
import { ThemeProvider } from '@context';
const basename = import.meta.env.MODE === 'production' ? '/mrkanband' : '/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
