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
import { SideBarHeader } from './SideBarHeader';
import { SideBarModalProps, FillFormType } from './SidebarTypes';
import { SideBarForm } from './SideBarForm';
import { SaveDraftButton } from '../ButtonsUI/SaveDraftButton';
import { SaveSend } from '../ButtonsUI/SaveSend';
import { EditButton } from '../ButtonsUI/EditButton';
import { InvoiceReturnDataType } from '../../Pages/InvoicePage/InvoiceTypes';
import { InfoContextDefault } from '../../context/InfoContext';
import { ErrorContextDefault } from '../../context/ErrorContext';
import { AddressConstant, ErrorConstant } from './Sidebarhelper';
import { DiscardInput, DiscardError, checkInput, getItemTotal } from './SaveLogic';
import { CreateInvoice } from '../../helpers/Api';
import { useNavigate } from 'react-router-dom';


interface SideBarModalType extends SideBarModalProps {
  id?: string;
  edit?: boolean;
  data: InvoiceReturnDataType | null
}

type fieldErrorType = {
  field: boolean,
  item: boolean
}

export const SideBarModal: React.FC<SideBarModalType> = ({
  isOpen,
  data,
  edit,
  id,
  onClose,
}: SideBarModalType): JSX.Element => {
  const theme = useContext(ThemeContextDefault);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate()

  const [info, setInfo] = useContext(InfoContextDefault)
  const [fieldError, setFieldError] = useState<fieldErrorType>({ field: true, item: false })
  const [error, setError] = useContext(ErrorContextDefault)
  const [loading, setLoading] = useState<boolean>(false)

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
      <div ref={sidebarRef} className="mini-sidebar">
        <div
          className={`sidebar-modal ${isOpen ? 'open' : ''} ${theme?.theme === 'light'
            ? 'sidebar-modal-light'
            : 'sidebar-modal-dark'
            }`}
          style={{ display: isOpen ? 'block' : 'none' }}
        >
          <div className="sidebar-container">
            <div className="modal-navigator">
              <Navigator handleClick={() => onClose()} />
            </div>

            <SideBarHeader header={edit ? `Edit #${id}` : 'New Invoice'} />
            <SideBarForm
              data={data}
              fieldError={fieldError}
            />
          </div>
        </div>
        <div
          className={`sidebar-footer ${theme?.theme === 'light'
            ? 'sidebar-footer-light'
            : 'sidebar-footer-dark'
            }`}
        >
          {!edit ? (
            <div className="footer-container">
              <div className="discard">
                <EditButton
                  title={'Discard'}
                  handleClick={() => {
                    setFieldError({ field: true, item: false })
                    const defaultInput = DiscardInput(info)
                    const defaultError = DiscardError(error)

                    setInfo(defaultInput)
                    setError(defaultError)
                    console.log('edit button clicked', info, error)
                  }}
                />
              </div>

              <div className="btn-footer-left">
                <SaveDraftButton
                  label={loading ? 'loading' : 'Save as Draft'}
                  handleClick={() => {
                    setFieldError({ field: false, item: false })
                    const handleError = checkInput(info, error, setError)
                    setFieldError({ field: handleError, item: info?.items.length === 0 })

                    // save
                    if (handleError && info?.items.length > 0) {
                      setLoading(true)
                      const total = getItemTotal(info.items)
                      const saveDraftInfo = { ...info, total, status: "Draft", paymentDue: info?.invoiceDate }

                      console.log("save draft button ", saveDraftInfo)

                      // save as draft - status is draft
                      // total = total of all the items and price
                      // testing comment
                      CreateInvoice(saveDraftInfo).then(data => {
                        console.log("return data is ", data)
                        setLoading(false)
                        onClose()
                        navigate(`/invoice/${data?.data}`)

                      }).catch(err => {
                        console.error(err)
                        alert(err)
                      })

                      setLoading(false)

                    }

                  }}
                />
                <SaveSend handleClick={() => console.log('handle click')} />
              </div>
            </div>
          ) : (
            <div className="footer-container">
              <div className="discard"></div>

              <div className="btn-footer-left">
                <SaveDraftButton
                  label={"Save"}
                  handleClick={() => console.log('save draft')}
                />
                <SaveSend handleClick={() => console.log('handle click')} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
