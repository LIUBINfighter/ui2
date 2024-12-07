import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PolicySearch from './pages/PolicySearch';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PolicySearch />} />
      </Routes>
    </Router>
  );
}

export default App; 