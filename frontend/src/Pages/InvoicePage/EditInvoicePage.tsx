import React, { useEffect, useState, useContext, useMemo } from 'react';
import './InvoicePage.css';
import { EditInvoiceMainComponent } from './Components/EditInvoiceMainComponent/EditInvoiceMainComponent';
import { Navigator } from '../InvoicePage/Components/EditInvoiceMainComponent/Navigator';
import { SideBarModal } from '../../components/SideBarModalUI/SideBarModal';
import { useNavigate, useParams } from 'react-router-dom';
import { EditInvoice } from '../../helpers/Api';
import { InvoiceReturnDataType } from './InvoiceTypes';
import { InfoContextDefault } from '../../context/InfoContext';
import { AddressConstant, ErrorConstant } from '../../components/SideBarModalUI/Sidebarhelper';
import { ErrorContextDefault } from '../../context/ErrorContext';
import { DiscardError } from '../../components/SideBarModalUI/SaveLogic';
import { EditInvoiceDatailComponent } from './Components/EditInvoiceMainComponent/EditInvoiceDetailComponent';
import { EditInvoiceContextDefault } from '../../context/EditInvoiceContext';

export const EditInvoicePage: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const [error, setError] = useContext(ErrorContextDefault)
  const [info, setInfo] = useContext(InfoContextDefault)
  const [open, setOpen] = useState<boolean>(false);
  const [EditInvoiceData, setEditInvoiceData] = useContext(EditInvoiceContextDefault)
  const { id } = useParams();

  const FetchInvoice = async () => {
    EditInvoice(Number(id)).then(data => {
      setEditInvoiceData(data?.invoice)
    }).catch(err => console.log(err))
  }

  const FetchInvoiceCallBack = useMemo(() => FetchInvoice, [])
  useEffect(() => {
    FetchInvoiceCallBack()
  }, [])

  return (
    <>
      <div className="invoice-layout">
        <div className="invoice-main">
          <div className='invoice-edit-main'>
            <Navigator
              handleClick={() => {
                const defaultError = DiscardError(error)
                setError(defaultError)
                setInfo({ ...AddressConstant })
                navigate(-1)
              }}
            />
            <EditInvoiceMainComponent
              id={String(id)}
              status={EditInvoiceData ? EditInvoiceData?.status : null}
              handleOpen={() => setOpen(true)}
              editInvoice={EditInvoiceData || null}
              handleEditInvoice={setEditInvoiceData}
            />

            <EditInvoiceDatailComponent data={EditInvoiceData || null} />
          </div>
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
          setError(DiscardError(error))
        }}
      />
    </>
  );
};
