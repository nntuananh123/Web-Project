import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HomePage from './HomePage';
import MenuPage from './MenuPage';
import Cart from './Cart';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/MenuPage" element={<MenuPage />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
