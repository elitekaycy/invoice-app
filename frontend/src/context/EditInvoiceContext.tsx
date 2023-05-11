import React, { createContext, useState } from 'react';
import { FillFormType } from '../components/SideBarModalUI/SidebarTypes';
import { AddressConstant } from '../components/SideBarModalUI/Sidebarhelper';
import { InvoiceReturnDataType } from '../Pages/InvoicePage/InvoiceTypes';

interface Props {
    children: React.ReactNode;
}


export const EditInvoiceContextDefault = createContext<[invoice: InvoiceReturnDataType, setInvoice: React.Dispatch<React.SetStateAction<InvoiceReturnDataType>>] | any>(null);

export const EditInvoiceContext: React.FC<Props> = ({
    children,
}: Props): JSX.Element => {
    const [invoice, setInvoice] = useState<InvoiceReturnDataType | null>(null);

    return (
        <EditInvoiceContextDefault.Provider value={[invoice, setInvoice]}>
            {children}
        </EditInvoiceContextDefault.Provider>
    );
};
