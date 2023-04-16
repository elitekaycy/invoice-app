import React from 'react';
import './InvoicePage.css';
import { InvoiceButton, MarkButton } from '../../components';

export const InvoicePage: React.FC = (): JSX.Element => {
  return (
    <div className="invoice-layout">
      <div className="invoice-main">
        <div>hello</div>
        {/* <InvoiceButton /> */}
        <MarkButton />
      </div>
    </div>
  );
};
