import React from 'react';
import './ButtonUI.css';
import { BtnProps } from './types';
import Spinner from '../Spinner/Spinner';

interface SaveNsendTypes extends BtnProps {
  title: string,
  loading: boolean
}

export const SaveSend: React.FC<SaveNsendTypes> = ({
  handleClick,
  title,
  loading
}: SaveNsendTypes): JSX.Element => {
  return (
    <button className="btn-default mrkbtn" onClick={handleClick}>
      {loading ? <Spinner /> : (
        <h3 className="invoice-h3-small btn-center btn-white">{title}</h3>
      )}
    </button>
  );
};
