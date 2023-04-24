import React, { useState } from 'react';
import './InvoicePage.css';
import { EditInvoiceMainComponent } from './Components/EditInvoiceMainComponent/EditInvoiceMainComponent';
import { Navigator } from '../InvoicePage/Components/EditInvoiceMainComponent/Navigator';
import { SideBarModal } from '../../components/SideBarModalUI/SideBarModal';
import { useParams } from 'react-router-dom';

export const EditInvoicePage: React.FC = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const { id } = useParams();

  return (
    <>
      <div className="invoice-layout">
        <div className="invoice-main">
          <Navigator />
          <EditInvoiceMainComponent
            id={String(id)}
            handleOpen={() => setOpen(true)}
          />
        </div>
      </div>
      <SideBarModal
        isOpen={open}
        edit={true}
        id={String(id)}
        onClose={() => {
          document.body.classList.remove('no-scroll');
          setOpen(false);
        }}
      />
    </>
  );
};
