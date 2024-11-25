import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import InputAndEnter from './components/InputAndEnter';
import { useState } from 'react';


function HomePage() {

  const navigate = useNavigate(); 

  const goToMenuPage = () => {
    navigate('/Menu'); 
  };

  const [phoneNumber, setPhoneNumber] = useState('');

  const handleInputChange = (event) => {
    setPhoneNumber(event.target.value);
  };


  return (
    <div>
    <Helmet>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css?h=ae25e30cd2ef0f4f5b70ebf4c668048b" />
    </Helmet>
    <div style={{ padding: '100px' }}>
      <InputAndEnter 
        value={phoneNumber} 
        onChange={handleInputChange} 
        onSubmit={goToMenuPage} 
        placeholder="Type your phone number" 
      />
    </div>
    </div>
  );
}

export default HomePage;
