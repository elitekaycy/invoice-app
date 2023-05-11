export interface Bill {
  streetAddress: string;
  city: string;
  postCode: string;
  country: string;
}

export interface ItemType {
  id?: number;
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
  id?: number;
  total: number;
}

export interface sendItem {
  id: number;
  name: string;
  quantity: number;
  price: string;
  invoice_id: 1;
}

export interface InvoiceSendToClientType {
  id: number;
  clientname: string;
  clientemail: string;
  status: string;
  paymentdue: string;
  paymentterms: string;
  description: string;
  created_at: Date;
  total: string;
  clientAddress: {
    id: number;
    street: string;
    city: string;
    client: boolean;
    postcode: string;
    country: string;
    invoice_id: number;
  };
  senderAddress: {
    id: number;
    street: string;
    city: string;
    client: boolean;
    postcode: string;
    country: string;
    invoice_id: number;
  };
  items: sendItem[];
}
