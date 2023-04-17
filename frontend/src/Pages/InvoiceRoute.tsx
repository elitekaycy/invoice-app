import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { InvoicePage, EditInvoicePage } from './index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <InvoicePage />,
  },
  {
    path: 'invoice/:id',
    element: <EditInvoicePage />,
  },
]);

export const InvoiceRoute: React.FC = (): JSX.Element => {
  return <RouterProvider router={router} />;
};
