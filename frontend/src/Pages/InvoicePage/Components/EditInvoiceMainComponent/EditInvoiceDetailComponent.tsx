import React, { useContext } from 'react'
import './EditInvoiceMainComponent.css'
import { InvoiceReturnDataType } from '../../InvoiceTypes'
import { ThemeContextDefault } from '../../../../context/ThemeContext'
import { ClientNameComp, IdComp } from '../InvoiceMainComponent/InvoiceSubComponent/StatusComp'


export interface EditDetailCompTypes {
    data: InvoiceReturnDataType | null
}

export const EditInvoiceDatailComponent: React.FC<EditDetailCompTypes> = ({
    data
}): JSX.Element => {

    const theme = useContext(ThemeContextDefault)

    function capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    return (
        <div className={`invoice-detail ${theme?.theme === 'light' ? 'edit-invoice-light' : 'edit-invoice-dark'}`}>
            <div className='inner-detail'>
                <div className='invoice-detail-first'>
                    <div className='invoice-sub-detail'>
                        <span className='invoice-h2'>
                            <span className='invoice-text-header-light'>#</span>
                            <span className={`${theme?.theme === 'light' ? 'invoice-text-light' : 'invoice-text-header-dark'}`}>{String(data?.id)}</span>
                        </span>
                        <div className={`invoice-body-1 ${theme?.theme === 'light' ? 'invoice-text-header-light' : 'invoice-text-header-dark'}`}>{capitalizeFirstLetter(data?.description || 'Loading...')}</div>
                    </div>

                    <div className='invoice-sub-detail invoice-detail-side'>
                        <div className={`invoice-body-1 ${theme?.theme === 'light' ? 'invoice-text-header-light' : 'invoice-text-header-dark'}`}>{capitalizeFirstLetter(data?.senderAddress?.street || 'Loading...')}</div>
                        <div className={`invoice-body-1 ${theme?.theme === 'light' ? 'invoice-text-header-light' : 'invoice-text-header-dark'}`}>{capitalizeFirstLetter(data?.senderAddress?.country || 'Loading...')}</div>
                        <div className={`invoice-body-1 ${theme?.theme === 'light' ? 'invoice-text-header-light' : 'invoice-text-header-dark'}`}>{capitalizeFirstLetter(data?.senderAddress?.postcode || 'Loading...')}</div>
                        <div className={`invoice-body-1 ${theme?.theme === 'light' ? 'invoice-text-header-light' : 'invoice-text-header-dark'}`}>{capitalizeFirstLetter(data?.senderAddress?.city || 'Loading...')}</div>
                    </div>
                </div>
                <div className='invoice-detail-second'>
                    <div className='invoice-detail-second-row'>
                        <div className='invoice-child-one'>
                            <div className='invoice-child-container'>
                                <div className={`invoice-body-1 ${theme?.theme === 'light' ? 'invoice-text-header-light' : 'invoice-text-header-dark'}`}>Invoice Date</div>
                                <div className={`invoice-h3 ${theme?.theme === 'light' ? 'invoice-text-light' : 'invoice-text-dark'}`}>{(new Date(String(data?.created_at))).toDateString().slice(0, 10)}</div>
                            </div>

                            <div className='invoice-child-container'>
                                <div className={`invoice-body-1 ${theme?.theme === 'light' ? 'invoice-text-header-light' : 'invoice-text-header-dark'}`}>Payment Due</div>
                                <div className={`invoice-h3 ${theme?.theme === 'light' ? 'invoice-text-light' : 'invoice-text-dark'}`}>{(new Date(String(data?.paymentdue))).toDateString().slice(0, 10)}</div>
                            </div>
                        </div>

                        <div className='invoice-child-container'>
                            <div className='invoice-child-container'>
                                <div className={`invoice-body-1 ${theme?.theme === 'light' ? 'invoice-text-header-light' : 'invoice-text-header-dark'}`}>Bill To</div>
                                <div className={`invoice-h3 ${theme?.theme === 'light' ? 'invoice-text-light' : 'invoice-text-dark'}`}>{data?.clientname}</div>
                            </div>


                            <div className='invoice-sub-detail invoice-detail-side-reverse'>
                                <div className={`invoice-body-1 ${theme?.theme === 'light' ? 'invoice-text-header-light' : 'invoice-text-header-dark'}`}>{capitalizeFirstLetter(data?.clientAddress?.street || 'Loading...')}</div>
                                <div className={`invoice-body-1 ${theme?.theme === 'light' ? 'invoice-text-header-light' : 'invoice-text-header-dark'}`}>{capitalizeFirstLetter(data?.clientAddress?.country || 'Loading...')}</div>
                                <div className={`invoice-body-1 ${theme?.theme === 'light' ? 'invoice-text-header-light' : 'invoice-text-header-dark'}`}>{capitalizeFirstLetter(data?.clientAddress?.postcode || 'Loading...')}</div>
                                <div className={`invoice-body-1 ${theme?.theme === 'light' ? 'invoice-text-header-light' : 'invoice-text-header-dark'}`}>{capitalizeFirstLetter(data?.clientAddress?.city || 'Loading...')}</div>
                            </div>

                        </div>

                    </div>
                    <div className='invoice-child-container'>
                        <div className='invoice-child-container'>
                            <div className={`invoice-body-1 ${theme?.theme === 'light' ? 'invoice-text-header-light' : 'invoice-text-header-dark'}`}>Sent To</div>
                            <div className={`invoice-h3 ${theme?.theme === 'light' ? 'invoice-text-light' : 'invoice-text-dark'}`}>{data?.clientemail}</div>
                        </div>
                    </div>
                </div>

                <div className={`items-container ${theme?.theme === 'light' ? 'items-container-light' : 'items-container-dark'}`}>
                    <div className='items-child-container'>
                        <div className='item-display'>
                            <table className='items-table'>
                                <tbody>
                                    <tr className='item-table-row '>
                                        <td className={`invoice-body-1 ${theme?.theme === 'light' ? 'invoice-text-header-light' : 'invoice-text-header-dark'}`}>Item Name</td>
                                        <td className={`invoice-body-1 ${theme?.theme === 'light' ? 'invoice-text-header-light' : 'invoice-text-header-dark'} item-center`}>QTY.</td>
                                        <td className={`invoice-body-1 ${theme?.theme === 'light' ? 'invoice-text-header-light' : 'invoice-text-header-dark'} item-end`}>Price</td>
                                        <td className={`invoice-body-1 ${theme?.theme === 'light' ? 'invoice-text-header-light' : 'invoice-text-header-dark'} item-end`}>Total</td>
                                    </tr>
                                    {data?.items && data?.items.map(item => {
                                        return (
                                            <tr key={item.id} className={`items-child item-table-row`}>
                                                <td className={`invoice-h3-small ${theme?.theme === 'light' ? 'invoice-text-light' : 'invoice-text-dark'}`}>{item?.name}</td>
                                                <td className={`invoice-h3-small item-center ${theme?.theme === 'light' ? 'invoice-text-light-default' : 'invoice-text-dark'}`}>{item?.quantity}</td>
                                                <td className={`invoice-h3-small item-end ${theme?.theme === 'light' ? 'invoice-text-light-default' : 'invoice-text-dark'}`}>{item?.price}</td>
                                                <td className={`invoice-h3-small item-end ${theme?.theme === 'light' ? 'invoice-text-light' : 'invoice-text-dark'}`}>{Number(item?.quantity) * Number(item.price)}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className='item-banner'>
                            {data?.items && data?.items.map(item => {
                                return (
                                    <div key={item.id} className='item-banner-1'>
                                        <div className='item-banner-sub'>
                                            <div className={`invoice-h3-small ${theme?.theme === 'light' ? 'invoice-text-light' : 'invoice-text-dark'}`}>{item?.name}</div>
                                            <div className={`invoice-h3-small item-center ${theme?.theme === 'light' ? 'invoice-text-light-default' : 'invoice-text-dark'}`}>{item?.quantity} x {item?.price}</div>
                                        </div>
                                        <div className={`invoice-h3-small ${theme?.theme === 'light' ? 'invoice-text-light' : 'invoice-text-dark'}`}>
                                            {Number(item?.quantity) * Number(item?.price)}
                                        </div>
                                    </div>
                                )
                            })}

                        </div>


                    </div>
                    <div className={`items-footer ${theme?.theme === 'light' ? 'items-footer-light' : 'items-footer-dark'}`}>
                        <div className='items-footer-container'>
                            <div className={`invoice-body-1 ${theme?.theme === 'light' ? 'invoice-text-header-light' : 'invoice-text-header-dark'}`}>Amount Due</div>
                            <div className={`invoice-h3 invoice-text-dark`}>{data?.total}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}