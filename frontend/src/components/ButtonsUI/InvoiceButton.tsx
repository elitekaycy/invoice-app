import React from 'react';
import './ButtonUI.css';
import plusIcon from '../../assets/icon-plus.svg';
import { BtnProps } from './types';

export const InvoiceButton: React.FC = ({ onClick }: BtnProps): JSX.Element => {
  return (
    <button className="invoice-btn-shape" onClick={onClick}>
      <span className="btn-icon">
        <img className="btn-img" src={plusIcon} alt="btn-icon" />
      </span>
      <span className="invoice-h3-small btn-text"></span>
    </button>
  );
};
