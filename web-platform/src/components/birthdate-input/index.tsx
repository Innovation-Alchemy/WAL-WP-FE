'use client';
import React, { useState } from 'react';
import InputField from '../input-field';

interface BirthdateInputProps {
  onDateChange: (date: string) => void;
}

const BirthdateInput: React.FC<BirthdateInputProps> = ({ onDateChange }) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const handleInputChange = (type: 'day' | 'month' | 'year', value: string) => {
    const sanitizedValue = value.replace(/[^0-9]/g, '');
    if (type === 'day' && sanitizedValue.length <= 2) {
      setDay(sanitizedValue);
    } else if (type === 'month' && sanitizedValue.length <= 2) {
      setMonth(sanitizedValue);
    } else if (type === 'year' && sanitizedValue.length <= 4) {
      setYear(sanitizedValue);
    }

    const updatedDate = `${sanitizedValue || day}/${month || 'MM'}/${
      year || 'YYYY'
    }`;
    onDateChange(updatedDate);
  };

  return (
    <div className="flex justify-between space-x-2 md:space-x-4">
      <InputField
        type="text"
        placeholder="DD"
        value={day}
        onChange={(e) => handleInputChange('day', e.target.value)}
      />
      <InputField
        type="text"
        placeholder="MM"
        value={month}
        onChange={(e) => handleInputChange('month', e.target.value)}
      />
      <InputField
        type="text"
        placeholder="YYYY"
        value={year}
        onChange={(e) => handleInputChange('year', e.target.value)}
      />
    </div>
  );
};

export default BirthdateInput;
