import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // This imports your main App.js file

// Find the "root" div inside your public/index.html
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Render the entire React application inside that div
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);