import React from 'react';
import './InvoicePage.css';
import { useRouteError } from 'react-router-dom';

export const ErrorInvoicePage: React.FC = (): JSX.Element => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="invoice-layout">
      <div className="invoice-main">
        Error page - <span>{error.statusText || error.message}</span>
      </div>
    </div>
  );
};
