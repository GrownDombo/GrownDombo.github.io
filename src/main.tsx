import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { installGoogleAnalytics } from './analytics/google';
import './styles.css';

installGoogleAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
