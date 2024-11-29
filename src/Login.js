import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import LoginForm from './components/LoginForm';


function Login() {


  return (
    <div>
      <Helmet>
        <link
          rel="stylesheet"
          href="assets/bootstrap/css/bootstrap.min.css?h=ae25e30cd2ef0f4f5b70ebf4c668048b"
        />
      </Helmet>
      <LoginForm />
    </div>
  );
}

export default Login;
