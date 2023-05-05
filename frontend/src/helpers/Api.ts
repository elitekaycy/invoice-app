import { InvoiceGetFromClientType } from '../components/SideBarModalUI/SidebarTypes';
import { host } from './Server';

// function to get all invoices
export function getInvoices(): Promise<any> {
  return fetch(`${host}/invoices`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      return response.json();
    })
    .catch((error) => {
      console.error(`Error fetching data: ${error}`);
      throw error;
    });
}

//function to get an individual invoice

export function EditInvoice(id: number): Promise<any> {
  return fetch(`${host}/invoice/${id}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error(`Error fetching data: ${error}`);
      throw error;
    });
}

// function to create invoices

export function CreateInvoice(invoice: InvoiceGetFromClientType): Promise<any> {
  return fetch(`${host}/create`, {
    method: 'POST',
    body: JSON.stringify(invoice),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      return response.json();
    })
    .catch((error) => {
      console.error(`Error fetching data: ${error}`);
      throw error;
    });
}
