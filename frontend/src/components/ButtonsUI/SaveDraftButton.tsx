import React, { useContext } from 'react';
import { BtnProps } from './types';
import { ThemeContextDefault } from '../../context/ThemeContext';


export const SaveDraftButton: React.FC<BtnProps> = ({
  handleClick,
}: BtnProps): JSX.Element => {
  const theme = useContext(ThemeContextDefault);

  return (
    <button
      onClick={handleClick}
      className={`btn-md ${
        theme?.theme === 'light' ? 'draft-btn-light' : 'draft-btn-dark'
      }`}
    >
      <h3 className={`btn-center invoice-h3-small`}>Save as Draft</h3>
    </button>
  );
};
