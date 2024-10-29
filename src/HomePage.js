import React from 'react';
import { useNavigate } from 'react-router-dom';
import ComboBox from './components/ComboBox';
import EnterButton from './components/EnterButton';
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
    <div style={{ padding: '20px' }}>
      <h1>Nhập Số Điện Thoại</h1>
      {/* <ComboBox value={phoneNumber} onChange={handleInputChange} />
      <EnterButton onClick={goToMenuPage} /> */}
      {<InputAndEnter value={phoneNumber} onChange={handleInputChange} onClick={goToMenuPage} 
      placeholder="Type your phone number" />}
    </div>
  );






  // return (
  //   <div>
  //     <h1>Trang chính</h1>
  //     <button onClick={goToMenuPage}>Đi đến trang khác</button>
  //   </div>
  // );
}

export default HomePage;
