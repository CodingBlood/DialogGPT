import React from 'react';
import './Button.css';

const Button = ({ onClick }) => {
  return (
    <button className="round-button" onClick={onClick}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </button>
  );
};

export default Button;