import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import NavBar from './components/NavBar';
import ListCart from './components/ListCart';

const Cart = () => {
  const [cartCount, setCartCount] = useState(
    JSON.parse(localStorage.getItem('orderDetails'))?.length || 0
  );

  const updateCartCount = () => {
    const orderDetails = JSON.parse(localStorage.getItem("orderDetails")) || [];
    const newCount = orderDetails.length;
  
    setCartCount((prevCount) => {
      if (prevCount !== newCount) {
        return newCount;
      }
      return prevCount; // Nếu không thay đổi, tránh re-render không cần thiết
    });
  };



  return (
    <>
      <Helmet>
        <link 
          rel="stylesheet" 
          href="assets/bootstrap/css/bootstrap.min.css?h=ae25e30cd2ef0f4f5b70ebf4c668048b" 
        />
        <link 
          rel="stylesheet" 
          href="assets/bootstrap/js/bootstrap.min.js" 
        />
      </Helmet>
      <NavBar showSearch={false} cartCount={cartCount} />
      <ListCart updateCartCount={updateCartCount} />
    </>
  );
};

export default Cart;
