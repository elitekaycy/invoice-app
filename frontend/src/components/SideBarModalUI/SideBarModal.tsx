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

interface SideBarModalProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
}

export const SideBarModal: React.FC<SideBarModalProps> = ({
  isOpen,
  onClose,
}: SideBarModalProps): JSX.Element => {
  const theme = useContext(ThemeContextDefault);
  const [sidebarOpen, setSideBarOpen] = useState<boolean>(isOpen);
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

          <div className="side-container-header">
            <h3
              className={`invoice-h2 ${
                theme?.theme === 'light'
                  ? 'sidebar-text-light'
                  : 'sidebar-text-dark'
              }`}
            >
              New Invoice
            </h3>
          </div>
        </div>

        <div
          className={`sidebar-footer ${
            theme?.theme === 'light'
              ? 'sidebar-footer-light'
              : 'sidebar-footer-dark'
          }`}
        ></div>
      </div>
    </div>
  );
};
