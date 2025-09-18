// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { BoardProvider } from './context/BoardContext.jsx';
import '@fontsource/monaspace-radon';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <BoardProvider>
        <App />
      </BoardProvider>
    </BrowserRouter>
  </React.StrictMode>
);
