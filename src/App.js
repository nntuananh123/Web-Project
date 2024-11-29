import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './Login';
import MenuPage from './MenuPage';
import Cart from './Cart';
import Staff from './Staff';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Menu" element={<MenuPage />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Staff" element={<Staff />} />
      </Routes>
    </Router>
  );
}

export default App;
