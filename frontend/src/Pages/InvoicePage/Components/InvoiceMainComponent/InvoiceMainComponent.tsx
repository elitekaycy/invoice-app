import { ThemeContextDefault } from '../../../../context/ThemeContext';
import './InvoiceMainComponent.css';
import React, { useContext } from 'react';
import next from '../../../../assets/icon-arrow-right.svg';
import {
  myProps,
  IStatus,
  IDType,
  TotalType,
  ClientNameType,
  PaymentType,
  InvoiceNextType,
} from './InvoiceMainTypes';

export const InvoiceMainComponent: React.FC<myProps> = (
  props: myProps
): JSX.Element => {
  const theme = useContext(ThemeContextDefault);
  const { id, status, clientName, total, paymentDue } = props;

  const StatusComp: React.FC<IStatus> = ({ state }: IStatus): JSX.Element => {
    return (
      <div
        className={`invoice-h3-small invoice-status ${
          state === 'paid'
            ? 'invoice-paid'
            : state === 'pending'
            ? 'invoice-pending'
            : theme?.theme === 'light'
            ? 'invoice-draft-light'
            : 'invoice-draft'
        }`}
      >
        <span
          className={`invoice-dot ${
            state === 'paid'
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

  const IdComp: React.FC<IDType> = ({ id }: IDType): JSX.Element => {
    return (
      <div className="invoice-id invoice-h3-small">
        <span className="invoice-hashtag">#</span>
        {id}
      </div>
    );
  };

  const PaymentComp: React.FC<PaymentType> = ({
    paymentDue,
  }: PaymentType): JSX.Element => {
    return (
      <div
        className={`invoice-due invoice-body-1 ${
          theme?.theme === 'light' ? 'invoice-due-light' : 'invoice-due-dark'
        }`}
      >
        Due {paymentDue}
      </div>
    );
  };

  const ClientNameComp: React.FC<ClientNameType> = ({
    clientName,
  }: ClientNameType): JSX.Element => {
    return (
      <div
        className={`invoice-body-1 ${
          theme?.theme === 'light' ? 'invoice-user-light' : 'invoice-user-dark'
        }`}
      >
        {clientName}
      </div>
    );
  };

  const TotalComp: React.FC<TotalType> = ({
    total,
  }: TotalType): JSX.Element => {
    return (
      <div
        className={`invoice-h3 ${
          theme?.theme === 'light' ? 'invoice-comp-light' : 'invoice-user-dark'
        }`}
      >
        $ {total}
      </div>
    );
  };

  const InvoiceNext: React.FC<InvoiceNextType> = ({ hidden }) => {
    return (
      <div style={{ display: hidden ? 'hidden' : 'block' }}>
        <img className="invoice-next" src={next} alt="next" />
      </div>
    );
  };

  return (
    <div>
      <div
        className={`invoice-page-comp ${
          theme?.theme === 'light' ? 'invoice-comp-light' : 'invoice-comp-dark'
        }`}
      >
        <IdComp id={id} />
        <PaymentComp paymentDue={paymentDue} />
        <ClientNameComp clientName={clientName} />
        <TotalComp total={total} />
        <StatusComp state={status} />
        <InvoiceNext hidden={false} />
      </div>

      <div
        className={`invoice-page-comp-small ${
          theme?.theme === 'light' ? 'invoice-comp-light' : 'invoice-comp-dark'
        }`}
      >
        <div className="invoice-id-client invoice-spacing">
          <IdComp id={id} />
          <ClientNameComp clientName={clientName} />
        </div>

        <div className="invoice-id-client">
          <div className="invoice-due-total">
            <PaymentComp paymentDue={paymentDue} />
            <TotalComp total={total} />
          </div>
          <StatusComp state={status} />
        </div>
      </div>
    </div>
  );
};
