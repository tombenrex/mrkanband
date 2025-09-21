import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/monaspace-radon';
import '@fontsource-variable/fira-code';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/mrkanband">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
