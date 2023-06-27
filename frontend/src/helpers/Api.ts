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

export function SaveNsend(invoice: InvoiceGetFromClientType): Promise<any> {
  return fetch(`${host}/send`, {
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

//mark as paid function
export function MarkAsPaid(id: Number, email: string): Promise<any> {
  return fetch(`${host}/mark/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ email: email }),
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

// delete invoice
export function DeleteInvoice(id: Number): Promise<any> {
  return fetch(`${host}/invoice/delete/${id}`, {
    method: 'DELETE',
  })
    .then(() => {
      console.log('delete request succesful');
      return { deleted: true };
    })
    .catch((err) => {
      console.error(`Error fetching data: ${err}`);
      throw err;
    });
}

//edit an invoice and amend it
export function CreateEditInvoice(
  id: number,
  body: InvoiceGetFromClientType
): Promise<any> {
  return fetch(`${host}/edit/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error(`Error fetching data: ${error}`);
      throw error;
    });
}
