import React, { useContext } from 'react';
import './EditInvoiceMainComponent.css';
import { ThemeContextDefault } from '../../../../context/ThemeContext';
import { StatusComp } from '../InvoiceMainComponent/InvoiceSubComponent/StatusComp';
import { EditButton, MarkButton } from '../../../../components';
import { DeleteButton } from '../../../../components/ButtonsUI/DeleteButton';

type EditInvoiceMainCompType = {
  handleOpen: () => void;
  id: string;
};

export const EditInvoiceMainComponent: React.FC<EditInvoiceMainCompType> = ({
  handleOpen,
  id,
}: EditInvoiceMainCompType): JSX.Element => {
  const theme = useContext(ThemeContextDefault);
  return (
    <>
      <div
        className={`edit-invoice-page-comp ${
          theme?.theme === 'light' ? 'edit-invoice-light' : 'edit-invoice-dark'
        }`}
      >
        <div className="edit-invoice-comp-1">
          <span
            className={`invoice-body-1 ${
              theme?.theme === 'light'
                ? 'edit-invoice-comp-light'
                : 'invoice-return-dark'
            }`}
          >
            Status
          </span>
          <StatusComp state="pending" />
        </div>

        <div className="edit-btn-flex">
          <EditButton title="Edit" handleClick={() => handleOpen()} />
          <DeleteButton handleClick={() => console.log('delete button')} />
          <MarkButton handleClick={() => console.log('mark button click')} />
        </div>
      </div>
      <div
        className={`fixed-btn-options ${
          theme?.theme === 'light' ? 'edit-invoice-light' : 'edit-invoice-dark'
        }`}
      >
        <EditButton title="Edit" handleClick={() => handleOpen()} />
        <DeleteButton handleClick={() => console.log('delete button')} />
        <MarkButton handleClick={() => console.log('mark button click')} />
      </div>
    </>
  );
};
