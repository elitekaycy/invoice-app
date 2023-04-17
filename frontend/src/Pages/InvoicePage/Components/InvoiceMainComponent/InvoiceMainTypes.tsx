export interface myProps {
  id: string;
  paymentDue: string;
  clientName: string;
  total: number;
  status: string;
}

export type IStatus = { state: string };
export type IDType = { id: string };
export type PaymentType = { paymentDue: string };
export type ClientNameType = { clientName: string };
export type TotalType = { total: number };
export type InvoiceNextType = { hidden?: boolean };
