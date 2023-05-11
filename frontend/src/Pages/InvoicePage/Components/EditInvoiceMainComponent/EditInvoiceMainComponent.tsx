import React, { useContext, useState } from 'react';
import './EditInvoiceMainComponent.css';
import { ThemeContextDefault } from '../../../../context/ThemeContext';
import { StatusComp } from '../InvoiceMainComponent/InvoiceSubComponent/StatusComp';
import { EditButton, MarkButton } from '../../../../components';
import { DeleteButton } from '../../../../components/ButtonsUI/DeleteButton';
import { InvoiceReturnDataType } from '../../InvoiceTypes';
import { MarkAsPaid } from '../../../../helpers/Api';
import { DeleteModal } from '../../../../components/Modal/DeleteModal';

type EditInvoiceMainCompType = {
  handleOpen: () => void;
  status: string | null,
  id: string;
  editInvoice: InvoiceReturnDataType | any
  handleEditInvoice: React.Dispatch<React.SetStateAction<InvoiceReturnDataType | null>>
};

export const EditInvoiceMainComponent: React.FC<EditInvoiceMainCompType> = ({
  status,
  handleOpen,
  id,
  handleEditInvoice,
  editInvoice
}: EditInvoiceMainCompType): JSX.Element => {
  const theme = useContext(ThemeContextDefault);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)


  const MarkasPaidFunct = () => {
    if (editInvoice.status !== 'paid') {
      MarkAsPaid(Number(id)).then(data => {
        if (data?.created) {
          handleEditInvoice({ ...editInvoice, status: "paid" })
        }
      }).catch(err => {
        console.error(err)
        alert("Error Occured " + err)
      })
    }
  }


  return (
    <>
      <div
        className={`edit-invoice-page-comp ${theme?.theme === 'light' ? 'edit-invoice-light' : 'edit-invoice-dark'
          }`}
      >
        <div className="edit-invoice-comp-1">
          <span
            className={`invoice-body-1 ${theme?.theme === 'light'
              ? 'edit-invoice-comp-light'
              : 'invoice-return-dark'
              }`}
          >
            Status
          </span>
          <StatusComp state={status !== null ? status : "pending"} />
        </div>

        <div className="edit-btn-flex">
          <EditButton title="Edit" handleClick={() => handleOpen()} />
          <DeleteButton loading={false} handleClick={() => setIsModalOpen(true)} />
          <MarkButton handleClick={() => MarkasPaidFunct()} />
        </div>
      </div>
      <div
        className={`fixed-btn-options ${theme?.theme === 'light' ? 'edit-invoice-light' : 'edit-invoice-dark'
          }`}
      >
        <EditButton title="Edit" handleClick={() => handleOpen()} />
        <DeleteButton loading={false} handleClick={() => setIsModalOpen(true)} />
        <MarkButton handleClick={() => MarkasPaidFunct()} />
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        id={Number(id)}
        setIsOpen={setIsModalOpen}
      />
    </>
  );
};
