import React, { useContext } from 'react';
import { ThemeContextDefault } from '../../../../../context/ThemeContext';
import { IStatus, IDType, ClientNameType } from '../InvoiceMainTypes';

export const StatusComp: React.FC<IStatus> = ({
  state,
}: IStatus): JSX.Element => {
  const theme = useContext(ThemeContextDefault);
  return (
    <div
      className={`invoice-h3-small invoice-status ${state === 'paid'
        ? 'invoice-paid'
        : state === 'pending'
          ? 'invoice-pending'
          : theme?.theme === 'light'
            ? 'invoice-draft-light'
            : 'invoice-draft'
        }`}
    >
      <span
        className={`invoice-dot ${state === 'paid'
          ? 'invoice-dot-paid'
          : state === 'pending'
            ? 'invoice-dot-pending'
            : theme?.theme === 'light'
              ? 'invoice-dot-draft-light'
              : 'invoice-dot-draft'
          }`}
      ></span>
      {String(state).charAt(0).toUpperCase() + String(state).slice(1)}
    </div>
  );
};


export const IdComp: React.FC<IDType> = ({ id }: IDType): JSX.Element => {
  const theme = useContext(ThemeContextDefault)
  return (
    <div className={`invoice-id invoice-h3-small ${theme?.theme === 'light' ? 'invoice-stable-light' : 'invoice-user-dark'}`}>
      <span className="invoice-hashtag">#</span>
      {id}
    </div>
  );
};

export const ClientNameComp: React.FC<ClientNameType> = ({
  clientName,
}: ClientNameType): JSX.Element => {
  const theme = useContext(ThemeContextDefault)
  return (
    <div
      className={`invoice-body-1 ${theme?.theme === 'light' ? 'invoice-user-light' : 'invoice-user-dark'
        }`}
    >
      {clientName}
    </div>
  );
};