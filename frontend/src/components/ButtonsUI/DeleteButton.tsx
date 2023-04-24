import React from 'react';
import './ButtonUI.css';
import { BtnProps } from './types';

export const DeleteButton: React.FC<BtnProps> = ({
  handleClick,
}: BtnProps): JSX.Element => {
  return (
    <button className="btn-default delbtn" onClick={handleClick}>
      <h3 className="invoice-h3-small btn-center btn-white">Delete</h3>
    </button>
  );
};
