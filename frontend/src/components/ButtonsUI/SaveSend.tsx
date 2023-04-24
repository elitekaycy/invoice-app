import React from 'react';
import './ButtonUI.css';
import { BtnProps } from './types';

export const SaveSend: React.FC<BtnProps> = ({
  handleClick,
}: BtnProps): JSX.Element => {
  return (
    <button className="btn-default mrkbtn" onClick={handleClick}>
      <h3 className="invoice-h3-small btn-center btn-white">Save & Send</h3>
    </button>
  );
};
