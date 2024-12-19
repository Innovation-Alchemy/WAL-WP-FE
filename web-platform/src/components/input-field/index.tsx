'use client';
import React, { useState } from 'react';
import Image from 'next/image';

interface InputFieldProps {
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      <input
        type={type === 'password' && showPassword ? 'text' : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-primary text-secondary placeholder-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 text-sm md:text-base"
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-secondary focus:outline-none"
        >
          <Image
            src={'/images/eye.png'}
            alt={showPassword ? 'Hide password' : 'Show password'}
            width={18}
            height={18}
          />{' '}
        </button>
      )}
    </div>
  );
};

export default InputField;
