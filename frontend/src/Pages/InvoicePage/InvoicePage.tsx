import React, { useContext, useState } from 'react';
import './InvoicePage.css';
import {
  EditButton,
  InvoiceButton,
  MarkButton,
  SaveDraftButton,
} from '../../components';
import { ThemeContextDefault } from '../../context/ThemeContext';
import data from '../../assets/data.json';
import emptyInvoice from '../../assets/illustration-empty.svg';
import { InvoiceDataType } from './InvoiceTypes';
import { InvoiceMainComponent } from './Components/InvoiceMainComponent/InvoiceMainComponent';

export const InvoicePage: React.FC = (): JSX.Element => {
  const theme = useContext(ThemeContextDefault);
  const [invoices, setInvoices] = useState<InvoiceDataType[] | []>(
    data.map((file) => ({
      id: file?.id,
      paymentDue: file?.paymentDue,
      clientName: file?.clientName,
      total: file?.total,
      status: file?.status,
    }))
  );

  return (
    <div className="invoice-layout">
      <div className="invoice-main">
        <div className="invoice-header">
          <div
            className={`${
              theme?.theme === 'light'
                ? 'invoice-main-text'
                : 'invoice-main-text-dark'
            }`}
          >
            <h2 className="invoice-title">Invoices</h2>
            <p className="invoice-subtitle"> 7 </p>
          </div>

          <div className="invoice-left">
            <InvoiceButton />
          </div>
        </div>

        <div className="invoice-sub-main">
          {invoices &&
            invoices.map((invoice) => {
              return (
                <InvoiceMainComponent
                  key={invoice?.id}
                  id={invoice?.id}
                  paymentDue={invoice?.paymentDue}
                  clientName={invoice?.clientName}
                  total={invoice?.total}
                  status={invoice?.status}
                />
              );
            })}
          {invoices.length <= 0 ? (
            <div className="invoice-empty">
              <img src={emptyInvoice} alt="invoice-page" />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};
