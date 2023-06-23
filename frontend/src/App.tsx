import React, { useEffect } from 'react';
import { Layout, SideNav } from './components';
import { InvoiceRoute } from './Pages';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function App() {

  useEffect(() => {
    document.title = "invoice app"
  })

  return (
    <>
      <Layout>
        <SideNav />
        <InvoiceRoute />
      </Layout>
      <ToastContainer />
    </>
  );
}

export default App;
