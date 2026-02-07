import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MockDB } from './services/db';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Initialize DB before render to prevent empty state on first load
MockDB.init();

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);