import React, { useState } from 'react';

const InputAndEnter = ({ onSubmit }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    const buttonStyle = {
        fontSize: '17px',
        padding: '0.5em 2em',
        border: 'transparent',
        boxShadow: '0 12px 16px 0 rgba(0, 0, 0, 0.24)',
        background: isHovered
        ? 'linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)'
        : '#2E2E2E',
        borderRadius: '0 10px 10px 0',
        transition: '0.3s',
        cursor: 'pointer',
        transform: isActive ? 'translate(0em, 0.2em)' : 'translate(0, 0)',
    };

    return (
        <div style={styles.inputGroup}>
        <input
            placeholder="Type here"
            type="text"
            style={styles.inputField}
        />
        <button
            style={buttonStyle}
            onClick={onSubmit}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <span style={styles.buttonText}>ADD</span>
        </button>
        </div>
    );
    };

    const styles = {
    inputGroup: {
        display: 'flex',
        flexDirection: 'row',
        margin: '0 auto',
        justifyContent: 'center',
        maxWidth: '160px',
    },
    inputField: {
        backgroundColor: '#2E2E2E',
        borderRadius: '10px 0 0 10px',
        border: 'none',
        width: '300px',
        paddingLeft: '8px',
        color: 'white',
        fontSize: '14px',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    },
    buttonText: {
        fontWeight: 800,
        letterSpacing: '2px',
        background: 'linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        transition: '0.3s',
    },
};

export default InputAndEnter;
