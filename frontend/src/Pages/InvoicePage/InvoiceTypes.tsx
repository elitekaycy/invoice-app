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
  paymentDue: string;
  clientName: string;
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
