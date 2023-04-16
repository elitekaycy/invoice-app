import React from 'react';
import './InvoicePage.css';
import {
  EditButton,
  InvoiceButton,
  MarkButton,
  SaveDraftButton,
} from '../../components';

export const InvoicePage: React.FC = (): JSX.Element => {
  return (
    <div className="invoice-layout">
      <div className="invoice-main">
        <div>Invoice page</div>
        {/* <InvoiceButton /> */}
        <MarkButton />
        <EditButton />
        <SaveDraftButton />
      </div>
    </div>
  );
};
