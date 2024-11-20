import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import NavBar from './components/NavBar';
import ListCart from './components/ListCart';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: '1168761308',
      name: 'Vintage Clock',
      category: 'Tech',
      price: 18.34,
      quantity: 2,
      img: 'https://cdn.bootstrapstudio.io/products/product-21_sm.jpg',
    },
    {
      id: '589605485',
      name: 'Reusable Cup',
      category: 'Cups',
      price: 35.39,
      quantity: 1,
      img: 'https://cdn.bootstrapstudio.io/products/product-18_sm.jpg',
    },
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
      <NavBar showSearch={false} />
      <ListCart />
    </>
  );
}

export default Cart;
