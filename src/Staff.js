import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import ListCheck from './components/ListCheck';

const Staff = () => {
  return (
    <>
      <Helmet>
        <link 
          rel="stylesheet" 
          href="assets/bootstrap/css/bootstrap.min.css?h=ae25e30cd2ef0f4f5b70ebf4c668048b" 
        />
      </Helmet>
      <ListCheck />
    </>
  );
}

export default Staff;
