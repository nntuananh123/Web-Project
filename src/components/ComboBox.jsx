import React from 'react';

const ComboBox = ({ value, onChange }) => {
  return (
    <input
      type="tel"
      value={value}
      onChange={onChange}
      placeholder="Nhập số điện thoại"
      style={{ padding: '10px', fontSize: '16px' }}
    />
  );
};

export default ComboBox;
