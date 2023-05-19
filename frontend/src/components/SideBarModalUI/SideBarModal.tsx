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
import { CreateEditInvoice, CreateInvoice, SaveNsend } from '../../helpers/Api';
import { useNavigate } from 'react-router-dom';
import { EditInvoiceContextDefault } from '../../context/EditInvoiceContext';
import { on } from 'events';


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
  const [editInvoice, setEditInvoice] = useContext(EditInvoiceContextDefault)
  const [loading, setLoading] = useState<boolean>(false)
  const [saveDraftLoading, setSaveDraftLoading] = useState<boolean>(false)
  const [saveNsendLoading, setSaveNsendLoading] = useState<boolean>(false)

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

  const errorChecker = () => {
    setFieldError({ field: false, item: false })
    const handleError = checkInput(info, error, setError)
    setFieldError({ field: handleError, item: info?.items.length === 0 })

    return handleError && info?.items.length > 0
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
                  }}
                />
              </div>

              <div className="btn-footer-left">
                <SaveDraftButton
                  label={'Save as Draft'}
                  loading={loading}
                  handleClick={() => {

                    // save
                    if (errorChecker()) {
                      setLoading(true)
                      const total = getItemTotal(info.items)
                      const saveDraftInfo = { ...info, total, status: "Draft", paymentDue: info?.invoiceDate }


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
                <SaveSend title={'Save & Send'} loading={saveNsendLoading} handleClick={() => {
                  if (errorChecker()) {
                    setSaveNsendLoading(true)
                    const total = getItemTotal(info.items)
                    const saveDraftInfo = { ...info, total, status: "pending", paymentDue: info?.invoiceDate }


                    SaveNsend(saveDraftInfo).then(data => {
                      setSaveNsendLoading(false)
                      onClose()
                      navigate(`/invoice/${data?.data}`)

                    }).catch(err => {
                      console.error(err)
                      setSaveNsendLoading(false)
                      alert(err)
                    })

                    setSaveNsendLoading(false)

                  }
                }} />
              </div>
            </div>
          ) : (
            <div className="footer-container">
              <div className="discard"></div>

              <div className="btn-footer-left">
                <EditButton
                  title='cancel'
                  handleClick={() => onClose()}
                />

                <SaveSend
                  title={"Save"}
                  loading={saveDraftLoading}
                  handleClick={() => {
                    //save draft code
                    if (errorChecker()) {
                      setSaveDraftLoading(true)

                      const total = getItemTotal(info.items)

                      const new_edit_invoice = { ...info, status: data?.status, paymentDue: info?.invoiceDate, total }

                      CreateEditInvoice(Number(id), new_edit_invoice).then(data => {
                        setSaveDraftLoading(false)
                        onClose()
                        navigate(0)
                      }).catch(err => {
                        console.error(err)
                        alert("save edit error " + err)
                        setSaveDraftLoading(false)
                      })

                      setSaveDraftLoading(false)
                    }
                    setSaveDraftLoading(true)

                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
