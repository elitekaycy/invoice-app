import moon from '../../assets/icon-moon.svg';
import { ThemeContextDefault } from '../../context/ThemeContext';
import sun from '../../assets/icon-sun.svg';
import './DarkModeUI.css';
import React, { useContext } from 'react';

export const DarkModeUI: React.FC = (): JSX.Element => {
  const themeContext = useContext(ThemeContextDefault);

  return (
    <img
      className="dark-mode-img"
      src={themeContext?.theme === 'light' ? moon : sun}
      onClick={() => themeContext?.onSwitchMode()}
      alt="light or dark mode"
    />
  );
};
