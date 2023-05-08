import React, { useContext } from 'react'
import './EditInvoiceMainComponent.css'
import { InvoiceReturnDataType } from '../../InvoiceTypes'
import { ThemeContextDefault } from '../../../../context/ThemeContext'
import { IdComp } from '../InvoiceMainComponent/InvoiceSubComponent/StatusComp'


export interface EditDetailCompTypes {
    data: InvoiceReturnDataType | null
}

export const EditInvoiceDatailComponent: React.FC<EditDetailCompTypes> = ({
    data
}): JSX.Element => {

    const theme = useContext(ThemeContextDefault)

    return (
        <div className={`invoice-detail ${theme?.theme === 'light' ? 'edit-invoice-light' : 'edit-invoice-dark'}`}>
            <div>
                <IdComp id={String(data?.id) || "0"} />
            </div>
        </div>
    )
}