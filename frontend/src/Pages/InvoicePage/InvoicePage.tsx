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
import { SideBarModal } from '../../components/SideBarModalUI/SideBarModal';

export const InvoicePage: React.FC = (): JSX.Element => {
  const theme = useContext(ThemeContextDefault);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState<boolean>(false);

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
    <React.Fragment>
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
              <InvoiceButton
                handleClick={() => {
                  document.body.classList.add('no-scroll')
                  setIsInvoiceOpen(true);
                  console.log('handle click clicked ', isInvoiceOpen);
                }}
              />
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
      <SideBarModal
        isOpen={isInvoiceOpen}
        onClose={() => {
          document.body.classList.remove('no-scroll')
          setIsInvoiceOpen(false)
        }}
      />
    </React.Fragment>
  );
};
