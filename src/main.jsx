import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/global.css';
import App from './App.jsx';
import ApiDocs from './ApiDocs.jsx';
import SliceDocs from './SliceDocs.jsx';
import TrustCenter from './TrustCenter.jsx';
import Terms from './Terms.jsx';
import NotFound from './NotFound.jsx';
import Privacy from './Privacy.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/api" element={<ApiDocs />} />
        <Route path="/slice" element={<SliceDocs />} />
        <Route path="/trust-center" element={<TrustCenter />} />
        <Route path="/termsofservice" element={<Terms />} />
        <Route path="/privacypolicy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
