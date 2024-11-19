import React from 'react';
import { useNavigate } from 'react-router-dom';
import InputAndEnter from './components/InputAndEnter';
import { useState } from 'react';




function HomePage() {

  const navigate = useNavigate(); 

  const goToMenuPage = () => {
    navigate('/MenuPage'); 
  };

  const [phoneNumber, setPhoneNumber] = useState('');

  const handleInputChange = (event) => {
    setPhoneNumber(event.target.value);
  };


  return (
    
    <div style={{ padding: '100px' }}>
      <InputAndEnter 
        value={phoneNumber} 
        onChange={handleInputChange} 
        onSubmit={goToMenuPage} 
        placeholder="Type your phone number" 
      />
    </div>
  );
}

export default HomePage;
