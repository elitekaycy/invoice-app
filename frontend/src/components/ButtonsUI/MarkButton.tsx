import React from 'react';
import './ButtonUI.css';
import { BtnProps } from './types';
import Spinner from '../Spinner/Spinner';

interface BtnLoading extends BtnProps {
  loading: boolean
}

export const MarkButton: React.FC<BtnLoading> = ({
  handleClick,
  loading
}: BtnLoading): JSX.Element => {
  return (
    <button className="btn-default mrkbtn" onClick={handleClick}>
      {loading ? <Spinner /> :
        <h3 className="invoice-h3-small btn-center btn-white">Mark as Paid</h3>
      }
    </button>
  );
};
