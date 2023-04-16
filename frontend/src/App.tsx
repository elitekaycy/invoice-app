import React from 'react';
import { Layout, SideNav } from './components';
import { InvoiceRoute } from './Pages';

function App() {
  return (
    <Layout>
      <SideNav />
      <InvoiceRoute />
    </Layout>
  );
}

export default App;
