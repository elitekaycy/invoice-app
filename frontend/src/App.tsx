import React, { useEffect } from 'react';
import { Layout, SideNav } from './components';
import { InvoiceRoute } from './Pages';

function App() {

  useEffect(() => {
    document.title = "invoice app"
  })

  return (
    <Layout>
      <SideNav />
      <InvoiceRoute />
    </Layout>
  );
}

export default App;
