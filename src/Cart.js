import React from 'react';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import NavBar from './components/NavBar';
import ListCart from './components/ListCart';

const Cart = () => {
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
