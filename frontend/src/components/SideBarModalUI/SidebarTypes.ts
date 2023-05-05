import React from 'react';

export interface ConstraintType {
  children: React.ReactNode;
  wrap: boolean;
}

export interface SideBarModalProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
}

export interface Bill {
  streetAddress: string;
  city: string;
  postCode: string;
  country: string;
}

export interface BillError {
  streetAddress: boolean;
  city: boolean;
  postCode: boolean;
  country: boolean;
}

export interface ItemType {
  itemName: string;
  itemQuantity: string;
  itemPrice: number;
}

export interface FillFormType {
  senderAddress: Bill;
  clientAddress: Bill;
  clientName: string;
  clientEmail: string;
  invoiceDate: string;
  paymentTerms: number | null;
  projectDescription: string;
  items: ItemType[] | [];
}

export interface FillFormTypeError {
  senderAddress: BillError;
  clientAddress: BillError;
  clientName: boolean;
  clientEmail: boolean;
  invoiceDate: boolean;
  paymentTerms: boolean;
  projectDescription: boolean;
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
