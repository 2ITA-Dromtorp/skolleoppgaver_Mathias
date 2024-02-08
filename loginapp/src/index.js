import React from 'react';
import { createRoot } from 'react-dom'; // Import createRoot from react-dom

import App from './App';

const root = document.getElementById('root');

const rootElement = createRoot(root); // Use createRoot to render your app
rootElement.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
