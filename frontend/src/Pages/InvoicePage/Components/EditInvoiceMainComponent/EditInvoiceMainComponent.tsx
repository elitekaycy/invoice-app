import React, { useContext } from 'react';
import './EditInvoiceMainComponent.css';
import { ThemeContextDefault } from '../../../../context/ThemeContext';

export const EditInvoiceMainComponent: React.FC = (): JSX.Element => {
  const theme = useContext(ThemeContextDefault);
  return (
    <div
      className={`edit-invoice-page-comp ${
        theme?.theme === 'light' ? 'edit-invoice-light' : 'edit-invoice-dark'
      }`}
    >
      hello
    </div>
  );
};
