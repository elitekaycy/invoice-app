export interface AddressType {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface ItemType {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface InvoiceDataType {
  id: string;
  paymentdue: string;
  clientname: string;
  description: string,
  created_at: Date,
  clientemail: string,
  paymentterms: string,
  total: number;
  status: string;
}

export interface FileType {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: AddressType;
  clientAddress: AddressType;
  items: [ItemType];
  total: number;
}


// returns from api

export interface InvoiceReturnAddress {
  id?: number,
  street: string,
  city: string,
  client?: boolean,
  postcode: string,
  country: string,
  invoice_id?: number
}

export interface InvoiceReturnItem {
  id?: number,
  name: string,
  quantity: number,
  price: string,
  invoice_id?: number
}


export interface InvoiceReturnDataType {
  id?: number,
  clientname: string,
  clientemail: string,
  status: string,
  paymentdue: string,
  paymentterms: string,
  description: string,
  created_at?: Date,
  total: number,
  clientAddress: InvoiceReturnAddress
  senderAddress: InvoiceReturnAddress
  items: InvoiceReturnItem[]
}