import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeContext } from './context/ThemeContext';
import '@fontsource/spartan';
import { ErrorContext } from './context/ErrorContext';
import { InfoContext } from './context/InfoContext';
import { EditInvoiceContext } from './context/EditInvoiceContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeContext>
      <ErrorContext>
        <InfoContext>
          <EditInvoiceContext>
            <App />
          </EditInvoiceContext>
        </InfoContext>
      </ErrorContext>
    </ThemeContext>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
