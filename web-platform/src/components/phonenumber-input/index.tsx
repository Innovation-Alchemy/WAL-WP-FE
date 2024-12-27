'use client';
import React from 'react';
import InputField from '@/components/input-field';

interface CountryOption {
  label: string;
  value: number;
  flag?: string;
  country: string;
}

interface PhoneNumberInputProps {
  countryCode: string;
  onCountryCodeChange: (code: string) => void;

  phoneNumber: string;
  onPhoneNumberChange: (phone: string) => void;

  countryOptions: CountryOption[];
  placeholder?: string;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  countryCode,
  onCountryCodeChange,
  phoneNumber,
  onPhoneNumberChange,
  countryOptions,
  placeholder = 'Enter your phone number',
}) => {
  return (
    <div className="flex items-center space-x-3">
      <select
        value={countryCode || '+961'}
        onChange={(e) => onCountryCodeChange(e.target.value)}
        className=" py-3 px-1 bg-primary text-secondary placeholder-black 
                   rounded-md focus:outline-none focus:ring-2 
                   focus:ring-red-300 text-sm md:text-base w-1/4"
      >
        {countryOptions.map((option) => (
          <option key={option.value} value={`${option.label}`}>
            {option.flag ? `${option.flag} ` : ''} ({option.label})
          </option>
        ))}
      </select>

      <div className="flex-grow">
        <InputField
          type="tel"
          placeholder={placeholder}
          value={phoneNumber}
          onChange={(e) => onPhoneNumberChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PhoneNumberInput;
