import React from 'react';

const Button = ({ children, variant = 'primary', onClick, className = '' }) => {
  const baseStyles = 'px-6 py-3 rounded-full font-semibold transition-all duration-300 ease-in-out';
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;