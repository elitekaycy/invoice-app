import React, { useContext } from 'react';
import { BtnProps } from './types';
import { ThemeContextDefault } from '../../context/ThemeContext';

export const EditButton: React.FC = ({ onClick }: BtnProps): JSX.Element => {
  const theme = useContext(ThemeContextDefault);

  return (
    <button
      onClick={onClick}
      className={`btn-small ${
        theme?.theme === 'light' ? 'edit-btn-light' : 'edit-btn-dark'
      }`}
    >
      <h3 className={`btn-center invoice-h3-small`}>Edit</h3>
    </button>
  );
};
