import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PolicySearch from './pages/PolicySearch';
import SearchResult from './pages/SearchResult';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PolicySearch />} />
        <Route path="/search-result" element={<SearchResult />} />
      </Routes>
    </Router>
  );
}

export default App; 