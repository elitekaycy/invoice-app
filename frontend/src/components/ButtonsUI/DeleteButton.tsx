import React from 'react';
import './ButtonUI.css';
import { BtnProps } from './types';
import Spinner from '../Spinner/Spinner';

interface DeleteBtnExtended extends BtnProps {
  loading: boolean
}

export const DeleteButton: React.FC<DeleteBtnExtended> = ({
  handleClick,
  loading,
}: DeleteBtnExtended): JSX.Element => {
  return (
    <button className="btn-default delbtn" onClick={handleClick}>
      <h3 className="invoice-h3-small btn-center btn-white">{loading ? <Spinner /> : 'Delete'}</h3>
    </button>
  );
};
