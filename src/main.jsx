import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

//import './index.css'
import Kanband from './Kanband.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Kanband />
  </StrictMode>
);
