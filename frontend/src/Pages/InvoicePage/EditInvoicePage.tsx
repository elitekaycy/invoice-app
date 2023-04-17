import React from 'react';
import './InvoicePage.css';
import { EditInvoiceMainComponent } from './Components/EditInvoiceMainComponent/EditInvoiceMainComponent';
import { Navigator } from '../InvoicePage/Components/EditInvoiceMainComponent/Navigator';

export const EditInvoicePage: React.FC = (): JSX.Element => {
  return (
    <div className="invoice-layout">
      <div className="invoice-main">
        <Navigator />
        <EditInvoiceMainComponent />
      </div>
    </div>
  );
};
