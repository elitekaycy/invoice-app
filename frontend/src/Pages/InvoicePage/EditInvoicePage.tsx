import React, { useEffect, useState } from 'react';
import './InvoicePage.css';
import { EditInvoiceMainComponent } from './Components/EditInvoiceMainComponent/EditInvoiceMainComponent';
import { Navigator } from '../InvoicePage/Components/EditInvoiceMainComponent/Navigator';
import { SideBarModal } from '../../components/SideBarModalUI/SideBarModal';
import { useParams } from 'react-router-dom';
import { EditInvoice } from '../../helpers/Api';
import { InvoiceReturnDataType } from './InvoiceTypes';

export const EditInvoicePage: React.FC = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [EditInvoiceData, setEditInvoiceData] = useState<InvoiceReturnDataType | null>(null)
  const { id } = useParams();

  useEffect(() => {
    EditInvoice(Number(id)).then(data => {
      console.log("edit data ", data)
      setEditInvoiceData(data?.invoice)
    }).catch(err => console.log(err))

  }, [])

  return (
    <>
      <div className="invoice-layout">
        <div className="invoice-main">
          <Navigator />
          <EditInvoiceMainComponent
            id={String(id)}
            status={EditInvoiceData ? EditInvoiceData?.status : null}
            handleOpen={() => setOpen(true)}
          />
        </div>
      </div>
      <SideBarModal
        isOpen={open}
        edit={true}
        data={EditInvoiceData}
        id={String(id)}
        onClose={() => {
          document.body.classList.remove('no-scroll');
          setOpen(false);
        }}
      />
    </>
  );
};
