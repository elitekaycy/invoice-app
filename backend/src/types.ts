
export interface Bill {
  streetAddress: string;
  city: string;
  postCode: string;
  country: string;
}

export interface ItemType {
  itemName: string;
  itemQuantity: string;
  itemPrice: number;
}


export interface InvoiceGetFromClientType {
    senderAddress: Bill;
    clientAddress: Bill;
    clientName: string;
    status: string;
    clientEmail: string;
    paymentDue: string;
    paymentTerms: number;
    projectDescription: string;
    items: ItemType[];
    total: number;
}

