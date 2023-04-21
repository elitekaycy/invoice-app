
export interface SideBarModalProps {
    isOpen: boolean;
    onClose: () => void;
    id?: string;
  }

export interface Bill {
    streetAddress: string
    city: string
    postCode: string
    country: string
}

export interface BillError {
    streetAddress: boolean
    city: boolean
    postCode: boolean
    country: boolean
}

export interface Item {
    itemName: string,
    itemQuantity: string,
    itemPrice: number,
}

export interface FillFormType {
    senderAddress : Bill,
    clientAddress: Bill,
    clientName: string, 
    clientEmail: string,
    invoiceDate: string, 
    paymentTerms: number | null, 
    projectDescription: string,
    items: Item[] | []
}

export interface FillFormTypeError {
    senderAddress: BillError,
    clientAddress: BillError,
    clientName: boolean, 
    clientEmail: boolean,
    invoiceDate: boolean, 
    paymentTerms: boolean, 
    projectDescription: boolean,
}