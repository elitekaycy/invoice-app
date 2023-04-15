import React, { useContext } from 'react';
import { ThemeContextDefault } from '../../context/ThemeContext';
import './Layout.css';

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }: Props): JSX.Element => {
  const theme = useContext(ThemeContextDefault);

  return (
    <div
      className={`layout ${
        theme?.theme === 'light' ? 'light-mode' : 'dark-mode'
      }`}
    >
      {children}
    </div>
  );
};
