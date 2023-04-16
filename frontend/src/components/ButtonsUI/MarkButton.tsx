import React from 'react';
import './ButtonUI.css';
import { BtnProps } from './types';

export const MarkButton: React.FC = ({ onClick }: BtnProps): JSX.Element => {
  return (
    <button className="btn-default mrkbtn" onClick={onClick}>
      <h3 className="invoice-h3-small btn-center">Mark as Paid</h3>
    </button>
  );
};
