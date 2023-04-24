import React, { useContext } from 'react';
import { BtnProps } from './types';
import { ThemeContextDefault } from '../../context/ThemeContext';
import './ButtonUI.css';
import plus from '../../assets/icon-plus.svg';

export const AddNewItem: React.FC<BtnProps> = ({
  handleClick,
}: BtnProps): JSX.Element => {
  const theme = useContext(ThemeContextDefault);

  return (
    <button
      onClick={handleClick}
      className={`btn-add ${
        theme?.theme === 'light' ? 'add-btn-light' : 'add-btn-dark'
      }`}
    >
      <span>
        <img className="btn-plus" src={plus} alt="addnewitem" />
      </span>
      <h3 className={`btn-center invoice-h3-small`}>Add New item</h3>
    </button>
  );
};
