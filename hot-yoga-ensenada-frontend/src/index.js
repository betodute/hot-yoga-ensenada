import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SnackbarProvider, useSnackbar } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <SnackbarProvider
      preventDuplicate= 'true'
      dense= 'true'
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}>
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);

reportWebVitals();
