
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { Toaster } from './components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';
import { LanguageProvider } from './context/LanguageContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <Router>
        <App />
        <Toaster />
        <SonnerToaster position="top-right" />
      </Router>
    </LanguageProvider>
  </React.StrictMode>,
);
