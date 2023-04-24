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
import { SaveDraftButton } from '../ButtonsUI/SaveDraftButton';
import { SaveSend } from '../ButtonsUI/SaveSend';
import { EditButton } from '../ButtonsUI/EditButton';

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
      <div 
      ref={sidebarRef}
      className="mini-sidebar">
        <div
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
         <div className='footer-container'>
               <div className='discard'>
                <EditButton title={"Discard"} handleClick={(e: any) => { 
                  e.preventDefault
                  console.log('edit btn')}}/>
               </div>

               <div className='btn-footer-left'>
                <SaveDraftButton handleClick={() => console.log("save draft")}/>
                <SaveSend handleClick={() => console.log('handle click')} />
               </div>
         </div>
        </div>
      </div>
    </div>
  );
};
