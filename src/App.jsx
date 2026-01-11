import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Layout from './components/Layout';
import Start from './pages/Start';
import Calculator from './pages/Calculator';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/calculator" element={<Calculator />} />
        </Routes>
      </Layout>
      <Analytics />
    </>
  );
}

export default App;