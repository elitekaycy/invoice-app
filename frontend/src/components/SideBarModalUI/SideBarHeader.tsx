import React, { useContext } from 'react';
import './SideBarModal.css';
import { ThemeContextDefault } from '../../context/ThemeContext';

interface SideBarHeaderProps {
  header: string;
}

export const SideBarHeader: React.FC<SideBarHeaderProps> = ({
  header,
}: SideBarHeaderProps): JSX.Element => {
  const theme = useContext(ThemeContextDefault);
  return (
    <div className="side-container-header">
      <h3
        className={`invoice-h2 ${
          theme?.theme === 'light' ? 'sidebar-text-light' : 'sidebar-text-dark'
        }`}
      >
        {header}
      </h3>
    </div>
  );
};
