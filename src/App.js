import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import MenuPage from './MenuPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/MenuPage" element={<MenuPage />} />
      </Routes>
    </Router>
  );
}

export default App;
