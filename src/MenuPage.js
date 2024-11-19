import React from 'react';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavBar from './components/NavBar';
import Category from './components/Category';
import ListProducts from './components/ListProducts';


function MenuPage() {

return (
  <>
    <Helmet>
      <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css?h=ae25e30cd2ef0f4f5b70ebf4c668048b" />
    </Helmet>
    <NavBar showSearch={true} />
    <Category />
    <ListProducts />
  </>
);
}

export default MenuPage;
