import './SideNav.css';
import logo from '../../assets/logo.svg';
import avatar from '../../assets/image-avatar.jpg';
import React from 'react';
import { DarkModeUI } from '../DarkModeUI/DarkModeUI';
import { useContext } from 'react';
import { ThemeContextDefault } from '../../context/ThemeContext';

export const SideNav = (): JSX.Element => {
  const theme = useContext(ThemeContextDefault);

  return (
    <div
      className={`sidebar x
         ${theme?.theme === 'light' ? 'sidebar-light' : 'sidebar-dark'}
        `}
    >
      <div className="logo-container">
        <img className="logo" src={logo} alt="invoice page logo" />
        <div className="logo-mirage"></div>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-darkmode-container">
          <DarkModeUI />
        </div>
        <div className="sidebar-avatar">
          <img className="avatar" alt="invoice avatar" src={avatar} />
        </div>
      </div>
    </div>
  );
};
