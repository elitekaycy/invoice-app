import React, { useContext } from 'react';
import './EditInvoiceMainComponent.css';
import previous from '../../../../assets/icon-arrow-left.svg';
import { ThemeContextDefault } from '../../../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

interface NavigatorProps {
  handleClick?: (e: any) => void | null;
}

export const Navigator: React.FC<NavigatorProps> = ({
  handleClick,
}: NavigatorProps): JSX.Element => {
  const theme = useContext(ThemeContextDefault);
  const navigate = useNavigate();

  return (
    <div
      onClick={handleClick ? (e) => handleClick(e) : () => navigate(-1)}
      className="navigator"
    >
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
