import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './app/page';
import AdminPage from './app/admin/page';
import Layout from './containers/layout/Layout';
import PWARegistration from './components/ui/PWARegistration';
import ScrollToAnchor from './components/ui/ScrollToAnchor';
import InstallPrompt from './components/ui/InstallPrompt';

const App = () => {
  return (
    <Router>
      <PWARegistration />
      <ScrollToAnchor />
      <InstallPrompt />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route path="/admin" element={<AdminPage />} />
        {/* Add more routes here if needed */}
      </Routes>
    </Router>
  );
};

export default App;
