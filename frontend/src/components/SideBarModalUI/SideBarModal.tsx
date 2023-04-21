import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  MouseEventHandler,
  TouchEventHandler,
  EventHandler,
} from 'react';
import './SideBarModal.css';
import { ThemeContextDefault } from '../../context/ThemeContext';
import { Navigator } from '../../Pages/InvoicePage/Components/EditInvoiceMainComponent/Navigator';
import { TextFieldDefault } from '../FormsUI/TextFieldDefault';
import { FormHeader } from '../FormsUI/FormHeader';
import { SideBarHeader } from './SideBarHeader';
import { SideBarModalProps, FillFormType } from './SidebarTypes';
import { SideBarForm } from './SideBarForm';

export const SideBarModal: React.FC<SideBarModalProps> = ({
  isOpen,
  onClose,
}: SideBarModalProps): JSX.Element => {
  const theme = useContext(ThemeContextDefault);
  const sidebarRef = useRef<HTMLDivElement>(null);

  function handleClickOutside(
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as HTMLDivElement)
    ) {
      onClose();
    }
  }

  return (
    <div
      onMouseDown={(e) => handleClickOutside(e)}
      onTouchStart={(e) => handleClickOutside(e)}
      className={`sidebar-modal-container ${!isOpen ? 'sidebar-hidden' : ''}`}
    >
      <div className="mini-sidebar">
        <div
          ref={sidebarRef}
          className={`sidebar-modal ${isOpen ? 'open' : ''} ${
            theme?.theme === 'light'
              ? 'sidebar-modal-light'
              : 'sidebar-modal-dark'
          }`}
          style={{ display: isOpen ? 'block' : 'none' }}
        >
          <div className="sidebar-container">
            <div className="modal-navigator">
              <Navigator handleClick={() => onClose()} />
            </div>

            <SideBarHeader header={'New Invoice'} />
            <SideBarForm />
          </div>
        </div>
        <div
          className={`sidebar-footer ${
            theme?.theme === 'light'
              ? 'sidebar-footer-light'
              : 'sidebar-footer-dark'
          }`}
        >
          <button style={{ marginLeft: 400 }} type="submit">
            submit
          </button>
        </div>
      </div>
    </div>
  );
};
