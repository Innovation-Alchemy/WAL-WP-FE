'use client';
import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, fullWidth }) => {
  return (
    <button
      onClick={onClick}
      className={`p-3 md:p-4 bg-secondary text-primary font-bold rounded-md hover:text-secondary hover:bg-red-400 transition-all duration-300 ease-in-out ${
        fullWidth ? 'w-full' : ''
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
