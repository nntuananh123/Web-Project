import React from 'react';
import { useNavigate } from 'react-router-dom'; // sử dụng useNavigate từ react-router-dom để điều hướng

const Logout = () => {
  const navigate = useNavigate();  // Tạo đối tượng navigate để chuyển hướng

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('authToken'); // Lấy authToken từ localStorage
      if (!token) {
        console.error('No authToken found');
        return;
      }

      // Gửi yêu cầu POST đến /auth/logout
      const response = await fetch('http://localhost:8080/mycoffee/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }), // Gửi authToken trong body
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Xóa authToken sau khi logout
      localStorage.removeItem('authToken');

      // Chuyển hướng về trang chủ bằng cách sử dụng navigate
      navigate('/');  // Thay thế window.location.href bằng navigate('/')
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="container d-flex justify-content-between align-items-center">

        {/* Search hoặc Shopping Cart */}
        <div className="flex-grow-1 d-flex justify-content-center">
            <span className="navbar-text text-light fs-2 ">Order Tracking</span>
        </div>

        {/* Cart Icon */}
        <div className="position-absolute top-0 end-0 m-3">
        <button
          className="btn btn-primary shadow"
          type="button"
          onClick={handleLogout}  // Gọi hàm handleLogout khi bấm vào button
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Logout;
