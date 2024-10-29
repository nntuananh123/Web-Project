import React, { useState } from 'react';

const EnterButton = ({ onClick }) => {
  const [isActive, setIsActive] = useState(false);

  const buttonStyle = {
    appearance: 'button',
    backgroundColor: '#1899D6',
    border: 'solid transparent',
    borderRadius: '16px',
    borderWidth: '0 0 4px',
    boxSizing: 'border-box',
    color: '#FFFFFF',
    cursor: 'pointer',
    display: 'inline-block',
    fontSize: '15px',
    fontWeight: 700,
    letterSpacing: '.8px',
    lineHeight: '20px',
    margin: 0,
    outline: 'none',
    overflow: 'visible',
    padding: isActive ? '13px 19px 10px' : '13px 19px',
    textAlign: 'center',
    textTransform: 'uppercase',
    touchAction: 'manipulation',
    transform: 'translateZ(0)',
    transition: 'filter .2s',
    userSelect: 'none',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    position: 'relative'
  };

  const afterStyle = {
    backgroundClip: 'padding-box',
    backgroundColor: '#1CB0F6',
    border: 'solid transparent',
    borderRadius: '16px',
    borderWidth: isActive ? '0 0 0px' : '0 0 4px',
    content: '""',
    position: 'absolute',
    bottom: '-4px',
    left: 0,
    right: 0,
    top: 0,
    zIndex: -1
  };

  const handleMouseDown = () => setIsActive(true);
  const handleMouseUp = () => setIsActive(false);

  return (
    <button
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={buttonStyle}
    >
      Enter
      <span style={afterStyle}></span>
    </button>
  );
};

export default EnterButton;
