import React, { useContext } from 'react';
import { BtnProps } from './types';
import { ThemeContextDefault } from '../../context/ThemeContext';
import Spinner from '../Spinner/Spinner';

interface SButton extends BtnProps {
  label: string
  loading: boolean
}

export const SaveDraftButton: React.FC<SButton> = ({
  handleClick,
  label,
  loading
}: SButton): JSX.Element => {
  const theme = useContext(ThemeContextDefault);

  return (
    <button
      onClick={handleClick}
      className={`btn-md ${theme?.theme === 'light' ? 'draft-btn-light' : 'draft-btn-dark'
        }`}
    >
      <h3 className={`btn-center invoice-h3-small`}>{loading ? <Spinner /> : label}</h3>
    </button>
  );
};
