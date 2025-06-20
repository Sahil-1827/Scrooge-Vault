import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Rendering the root component
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);