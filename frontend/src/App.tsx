import React from 'react';
import { Layout, SideNav } from './components';
import { InvoicePage } from './Pages'

function App() {
  return (
    <Layout>
      <SideNav />
      <InvoicePage />
    </Layout>
  );
}

export default App;
