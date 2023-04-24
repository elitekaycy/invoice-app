import React, { useContext } from 'react';
import { BtnProps } from './types';
import { ThemeContextDefault } from '../../context/ThemeContext';

interface EditType extends BtnProps {
  title: string,
}

export const EditButton: React.FC<EditType> = ({
  title, handleClick
}: EditType): JSX.Element => {
  const theme = useContext(ThemeContextDefault);

  return (
    <button
      onClick={handleClick}
      className={`btn-small ${
        theme?.theme === 'light' ? 'edit-btn-light' : 'edit-btn-dark'
      }`}
    >
      <h3 className={`btn-center invoice-h3-small`}>{title}</h3>
    </button>
  );
};
