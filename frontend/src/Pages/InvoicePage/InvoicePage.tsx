import React, { useContext, useEffect, useMemo, useState } from 'react';
import './InvoicePage.css';
import {
  EditButton,
  InvoiceButton,
  MarkButton,
  SaveDraftButton,
} from '../../components';
import { ThemeContextDefault } from '../../context/ThemeContext';
import data from '../../assets/data.json';
import emptyInvoice from '../../assets/illustration-empty.svg';
import { InvoiceDataType } from './InvoiceTypes';
import { InvoiceMainComponent } from './Components/InvoiceMainComponent/InvoiceMainComponent';
import { SideBarModal } from '../../components/SideBarModalUI/SideBarModal';
import { getInvoices } from '../../helpers/Api';
import Spinner from '../../components/Spinner/Spinner';
import { Filter } from '../../components/Filter/Filter';

export const InvoicePage: React.FC = (): JSX.Element => {
  const theme = useContext(ThemeContextDefault);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState<boolean>(false);
  const [filterKeywords, setFilterKeywords] = useState<String[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [invoices, setInvoices] = useState<InvoiceDataType[] | []>([]);

  const filterData = () => {
    if (filterKeywords.length <= 0 || invoices.length <= 0) {
      return invoices
    }

    const new_filtered_word = [...filterKeywords].join()
    return invoices.filter(invoice => new_filtered_word.toLowerCase().includes(invoice?.status.toLowerCase()))
  }


  const FetchData = () => {
    setLoading(true)
    getInvoices().then(data => {
      setInvoices(data?.data)
      setLoading(false)
    }).catch(err => {
      console.log("error is ", err)
      setLoading(false)
    })
  }

  const FetchCallBackData = useMemo(() => FetchData, [])

  useEffect(() => {
    FetchCallBackData()
  }, [getInvoices])

  return (
    <React.Fragment>
      <div className="invoice-layout">
        <div className="invoice-main">
          <div className="invoice-header">
            <div
              className={`${theme?.theme === 'light'
                ? 'invoice-main-text'
                : 'invoice-main-text-dark'
                }`}
            >
              <h2 className="invoice-title">Invoices</h2>
              <p className="invoice-subtitle"> {invoices.length} </p>
            </div>

            <div className="invoice-left">
              <Filter
                filteredKeywords={filterKeywords}
                setFilteredKeywords={setFilterKeywords}
              />
              <InvoiceButton
                handleClick={() => {
                  document.body.classList.add('no-scroll');
                  setIsInvoiceOpen(true);
                }}
              />
            </div>
          </div>
          <div>{loading ? <Spinner /> : null}</div>
          <div className="invoice-sub-main">
            {invoices?.length > 0 &&
              filterData().map((invoice) => {
                return (
                  <InvoiceMainComponent
                    key={invoice?.id}
                    id={invoice?.id}
                    paymentDue={invoice?.paymentdue}
                    clientName={invoice?.clientname}
                    total={invoice?.total}
                    status={invoice?.status}
                  />
                );
              })}
            {invoices.length <= 0 ? (
              <div className="invoice-empty">
                <img src={emptyInvoice} alt="invoice-page" />
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <SideBarModal
        data={null}
        isOpen={isInvoiceOpen}
        onClose={() => {
          document.body.classList.remove('no-scroll');
          setIsInvoiceOpen(false);
        }}
      />
    </React.Fragment>
  );
};
