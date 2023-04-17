import React, { useContext } from 'react';
import './EditInvoiceMainComponent.css';
import previous from '../../../../assets/icon-arrow-left.svg';
import { ThemeContextDefault } from '../../../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

export const Navigator: React.FC = (): JSX.Element => {
  const theme = useContext(ThemeContextDefault);
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(-1)} className="navigator">
      <span className="previous">
        <img src={previous} alt="go back" />
      </span>
      <span
        className={`invoice-h3-small invoice-return ${
          theme?.theme === 'light'
            ? 'invoice-return-light'
            : 'invoice-return-dark'
        }`}
      >
        Go back
      </span>
    </div>
  );
};
